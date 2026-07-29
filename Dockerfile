FROM node:20-slim

# Install system dependencies (Python 3, ffmpeg, Chromium)
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    chromium \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install yt-dlp
RUN pip3 install --break-system-packages yt-dlp

# Set Puppeteer to use installed Chromium binary
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --production

# Copy application source
COPY . .

# Build Next.js application
RUN npm run build

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["npm", "start"]
