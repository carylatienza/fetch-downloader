import { NextResponse } from 'next/server';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export async function GET() {
  const dependencies = {
    ytdlp: false,
    ffmpeg: false,
    puppeteer: false,
  };

  try {
    await execFileAsync('yt-dlp', ['--version']);
    dependencies.ytdlp = true;
  } catch {}

  try {
    await execFileAsync('ffmpeg', ['-version']);
    dependencies.ffmpeg = true;
  } catch {}

  // Puppeteer is installed via npm package
  try {
    require('puppeteer');
    dependencies.puppeteer = true;
  } catch {}

  return NextResponse.json({
    status: 'ok',
    uptime: process.uptime(),
    version: '1.0.0',
    dependencies,
  });
}
