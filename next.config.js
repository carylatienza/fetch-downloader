/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // @ffmpeg-installer/ffmpeg resolves its platform-specific binary via a
  // dynamic require (based on process.platform/arch) that webpack can't
  // statically bundle - it must be required natively at runtime instead,
  // or getFfmpegPath() silently fails and yt-dlp never finds ffmpeg.
  serverExternalPackages: ['@ffmpeg-installer/ffmpeg'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
