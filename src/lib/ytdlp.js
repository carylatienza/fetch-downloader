import { execFile, execFileSync, spawn } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import os from 'os';
import crypto from 'crypto';
import { Readable, PassThrough } from 'stream';

const execFileAsync = promisify(execFile);

/**
 * Get FFmpeg binary path from @ffmpeg-installer/ffmpeg package if available
 */
function getFfmpegPath() {
  try {
    const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
    if (ffmpegInstaller && ffmpegInstaller.path && fs.existsSync(ffmpegInstaller.path)) {
      return ffmpegInstaller.path;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Get execution environment with FFmpeg directory included in PATH
 */
function getProcessEnv() {
  const ffmpegPath = getFfmpegPath();
  if (!ffmpegPath) return process.env;
  const ffmpegDir = path.dirname(ffmpegPath);
  return Object.assign({}, process.env, {
    PATH: `${ffmpegDir}${path.delimiter}${process.env.PATH || ''}`,
  });
}

/**
 * Get proxy flags if configured in environment
 */
function getProxyFlags() {
  const proxy = process.env.YTDLP_PROXY || process.env.HTTP_PROXY || process.env.HTTPS_PROXY;
  return proxy ? ['--proxy', proxy] : [];
}

/**
 * Get yt-dlp player_client extractor-args if YTDLP_PLAYER_CLIENT is configured.
 * Escape hatch for when a platform starts bot-blocking the default client.
 */
function getPlayerClientFlags() {
  const client = process.env.YTDLP_PLAYER_CLIENT;
  return client ? ['--extractor-args', `youtube:player_client=${client}`] : [];
}

/**
 * Determine command and args synchronously to avoid spawn ENOENT errors
 */
function getCommandArgs(extraArgs) {
  const ffmpegPath = getFfmpegPath();
  const ffmpegFlags = ffmpegPath ? ['--ffmpeg-location', ffmpegPath] : [];
  const fullArgs = [...getProxyFlags(), ...getPlayerClientFlags(), ...ffmpegFlags, ...extraArgs];

  try {
    execFileSync('yt-dlp', ['--version'], { stdio: 'ignore', env: getProcessEnv() });
    return { command: 'yt-dlp', args: fullArgs };
  } catch {
    return { command: 'python', args: ['-m', 'yt_dlp', ...fullArgs] };
  }
}

/**
 * Execute yt-dlp locally to extract raw --dump-json metadata
 * @param {string} url
 * @returns {Promise<object>}
 */
export async function getMetadataLocal(url) {
  const commonArgs = [
    '--dump-json',
    '--no-warnings',
    '--no-playlist',
    '--no-check-certificates',
    url
  ];

  try {
    const cmdInfo = getCommandArgs(commonArgs);
    const { stdout } = await execFileAsync(cmdInfo.command, cmdInfo.args, {
      maxBuffer: 10 * 1024 * 1024,
      env: getProcessEnv(),
    });
    return JSON.parse(stdout);
  } catch (error) {
    console.error('yt-dlp metadata extraction failed:', error);
    throw new Error('Could not extract media info using yt-dlp');
  }
}

/**
 * Extract metadata in raw yt-dlp JSON format, delegating to a dedicated
 * microservice when DOWNLOADER_SERVICE_URL is configured (e.g. serverless
 * deployments without a yt-dlp/ffmpeg runtime available).
 * @param {string} url
 * @returns {Promise<object>}
 */
export async function getMetadataWithYtDlp(url) {
  const serviceUrl = process.env.DOWNLOADER_SERVICE_URL;

  // Remote microservice delegation for serverless environments (e.g. Vercel)
  if (serviceUrl) {
    try {
      const res = await fetch(`${serviceUrl.replace(/\/$/, '')}/api/ytdlp-metadata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Remote microservice metadata extraction failed, falling back to local CLI:', err);
    }
  }

  return getMetadataLocal(url);
}

/**
 * Estimate the real download size for the bestvideo+bestaudio combo yt-dlp
 * will actually merge, instead of trusting yt-dlp's top-level info.filesize
 * (which reflects whatever single representative format it picked for the
 * JSON dump, not the higher-res DASH pair selected for streaming).
 * @param {object} info - raw yt-dlp metadata
 * @returns {number|null}
 */
export function estimateFileSize(info) {
  if (!Array.isArray(info?.formats) || info.formats.length === 0) {
    return info?.filesize || info?.filesize_approx || null;
  }

  const size = (fmt) => fmt.filesize || fmt.filesize_approx || 0;

  const bestVideo = info.formats
    .filter((f) => f.vcodec && f.vcodec !== 'none')
    .reduce((best, f) => ((f.height || 0) > (best?.height || 0) ? f : best), null);

  const bestAudio = info.formats
    .filter((f) => f.acodec && f.acodec !== 'none' && (!f.vcodec || f.vcodec === 'none'))
    .reduce((best, f) => ((f.abr || 0) > (best?.abr || 0) ? f : best), null);

  const total = size(bestVideo) + size(bestAudio);
  return total > 0 ? total : (info.filesize || info.filesize_approx || null);
}

/**
 * Spawn yt-dlp process or proxy remote container stream to output 4K/1080p video directly
 * @param {string} url
 * @param {AbortSignal} [signal] - aborts the upstream fetch/process if the client disconnects
 * @returns {import('stream').Readable|null}
 */
export function getStreamWithYtDlp(url, signal) {
  const serviceUrl = process.env.DOWNLOADER_SERVICE_URL;

  // Remote microservice delegation for streaming
  if (serviceUrl) {
    try {
      const targetEndpoint = `${serviceUrl.replace(/\/$/, '')}/api/download?url=${encodeURIComponent(url)}&directStream=true`;
      const controller = new AbortController();
      signal?.addEventListener('abort', () => controller.abort(), { once: true });

      // Return a Node readable stream from the remote HTTP fetch stream
      const passThrough = new PassThrough();
      passThrough.on('close', () => controller.abort());

      fetch(targetEndpoint, { signal: controller.signal })
        .then((res) => {
          if (!res.ok || !res.body) {
            throw new Error(`Remote stream endpoint responded with status ${res.status}`);
          }
          const readable = Readable.fromWeb(res.body);
          readable.pipe(passThrough);
        })
        .catch((err) => {
          console.warn('Remote stream fetch error:', err);
          passThrough.destroy(err);
        });

      return passThrough;
    } catch (err) {
      console.warn('Remote microservice streaming failed, falling back to local spawn:', err);
    }
  }

  // Download to a real temp file rather than piping straight to stdout.
  // Merging bestvideo+bestaudio DASH streams into a non-seekable pipe is
  // fragile, and "bestaudio" alone often picks Opus/WebM audio, which
  // ffmpeg can't stream-copy into an MP4 container (merge fails and the
  // audio track silently disappears). Preferring m4a/AAC audio keeps the
  // merge a plain stream-copy that always succeeds.
  // Note: yt-dlp appends its own extension to -o, so the base must not
  // already end in .mp4 or the final file ends up double-extensioned.
  const tempBase = path.join(os.tmpdir(), `ytdlp-${crypto.randomUUID()}`);
  const tempFile = `${tempBase}.mp4`;
  const commonArgs = [
    '-o', tempBase,
    '-f', 'bestvideo+bestaudio[ext=m4a]/bestvideo+bestaudio/best',
    '--merge-output-format', 'mp4',
    '--no-warnings',
    '--no-playlist',
    '--no-check-certificates',
    url
  ];

  const cleanup = () => fs.unlink(tempFile, () => {});

  try {
    const cmdInfo = getCommandArgs(commonArgs);
    // stdout is unused now that output goes to tempFile; if left piped but
    // unread, yt-dlp's progress output fills the OS pipe buffer and stalls
    // the process.
    // stdout is unused now that output goes to tempFile; if left piped but
    // unread, yt-dlp's progress output fills the OS pipe buffer and stalls
    // the process.
    const proc = spawn(cmdInfo.command, cmdInfo.args, {
      env: getProcessEnv(),
      stdio: ['ignore', 'ignore', 'pipe'],
    });
    const passThrough = new PassThrough();

    signal?.addEventListener('abort', () => proc.kill(), { once: true });

    proc.stderr?.on('data', (data) => {
      const msg = data.toString();
      if (!msg.includes('Downloading') && !msg.includes('ETA')) {
        console.warn(`[yt-dlp stderr]: ${msg.trim()}`);
      }
    });

    proc.on('error', (err) => {
      console.warn('yt-dlp spawn error:', err);
      passThrough.destroy(err);
      cleanup();
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        passThrough.destroy(new Error(`yt-dlp exited with code ${code}`));
        cleanup();
        return;
      }
      const fileStream = fs.createReadStream(tempFile);
      fileStream.on('error', (err) => passThrough.destroy(err));
      fileStream.on('close', cleanup);
      fileStream.pipe(passThrough);
    });

    return passThrough;
  } catch (error) {
    console.warn('getStreamWithYtDlp failed:', error);
    cleanup();
    return null;
  }
}


