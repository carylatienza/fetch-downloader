FROM node:20-slim

# Install system dependencies (Python 3, ffmpeg, chromium, ca-certificates, curl)
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    ffmpeg \
    chromium \
    ca-certificates \
    curl \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install / update latest yt-dlp binary system-wide
RUN curl -fL https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

# Set Puppeteer to use installed Chromium binary
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application source
COPY . .

# Build Next.js application
RUN npm run build

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["npm", "start"]
