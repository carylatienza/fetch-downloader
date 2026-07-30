import { execFile, execFileSync, spawn } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execFileAsync = promisify(execFile);

/**
 * Get FFmpeg binary path from @ffmpeg-installer/ffmpeg package if available
 */
function getFfmpegPath() {
  try {
    const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
    return ffmpegInstaller.path || null;
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
    PATH: `${ffmpegDir};${process.env.PATH || ''}`,
  });
}

/**
 * Determine command and args synchronously to avoid spawn ENOENT errors
 */
function getCommandArgs(extraArgs) {
  const ffmpegPath = getFfmpegPath();
  const ffmpegFlags = ffmpegPath ? ['--ffmpeg-location', ffmpegPath] : [];
  const fullArgs = [...ffmpegFlags, ...extraArgs];

  try {
    execFileSync('yt-dlp', ['--version'], { stdio: 'ignore', env: getProcessEnv() });
    return { command: 'yt-dlp', args: fullArgs };
  } catch {
    return { command: 'python', args: ['-m', 'yt_dlp', ...fullArgs] };
  }
}

/**
 * Execute yt-dlp to extract metadata in JSON format
 * @param {string} url 
 * @returns {Promise<object>}
 */
export async function getMetadataWithYtDlp(url) {
  const commonArgs = [
    '--dump-json',
    '--no-warnings',
    '--no-playlist',
    '--no-check-certificates',
    '--extractor-args', 'youtube:player_client=android,web',
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
 * Spawn yt-dlp process to stream highest resolution 4K/1080p video directly to stdout
 * @param {string} url 
 * @returns {import('stream').Readable}
 */
export function getStreamWithYtDlp(url) {
  const commonArgs = [
    '-o', '-',
    '-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best',
    '--postprocessor-args', 'ffmpeg:-movflags frag_keyframe+empty_moov',
    '--no-warnings',
    '--no-playlist',
    '--no-check-certificates',
    '--extractor-args', 'youtube:player_client=android,web',
    url
  ];

  try {
    const cmdInfo = getCommandArgs(commonArgs);
    const proc = spawn(cmdInfo.command, cmdInfo.args, { env: getProcessEnv() });

    proc.stderr?.on('data', (data) => {
      const msg = data.toString();
      if (!msg.includes('Downloading') && !msg.includes('ETA')) {
        console.warn(`[yt-dlp stderr]: ${msg.trim()}`);
      }
    });

    proc.on('error', (err) => {
      console.warn('yt-dlp spawn error:', err);
    });

    return proc.stdout;
  } catch (error) {
    console.warn('getStreamWithYtDlp failed:', error);
    return null;
  }
}
