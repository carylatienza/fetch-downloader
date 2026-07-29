'use client';

import { useState } from 'react';
import { Download, Film, Image as ImageIcon, Check, RefreshCw, Clock, HardDrive } from 'lucide-react';
import styles from './PreviewCard.module.css';

function formatDuration(seconds) {
  if (!seconds) return null;
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function formatFileSize(bytes) {
  if (!bytes) return null;
  const mb = bytes / (1024 * 1024);
  if (mb >= 1024) {
    return `~${(mb / 1024).toFixed(1)} GB`;
  }
  return `~${Math.round(mb)} MB`;
}

export default function PreviewCard({ data, onReset }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  const {
    downloadId,
    title,
    thumbnail,
    platform,
    mediaType,
    quality,
    duration,
    fileSize,
    format,
  } = data;

  const handleDownload = () => {
    setIsDownloading(true);

    // Create an invisible anchor to trigger browser download via /api/download?id=...
    const downloadUrl = `/api/download?id=${encodeURIComponent(downloadId)}`;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      setIsDownloading(false);
      setDownloadCompleted(true);
    }, 1500);
  };

  return (
    <div className={styles.card}>
      <div className={styles.thumbnailWrapper}>
        {thumbnail ? (
          <img src={thumbnail} alt={title} className={styles.thumbnail} />
        ) : (
          <div className={styles.thumbnailFallback}>
            {mediaType === 'video' ? <Film size={48} /> : <ImageIcon size={48} />}
          </div>
        )}

        <div className={styles.badgeGroup}>
          <span className={styles.badge}>
            {mediaType === 'video' ? <Film size={12} /> : <ImageIcon size={12} />}
            <span>{mediaType === 'video' ? 'Video' : 'Image'}</span>
          </span>

          {platform && (
            <span className={`${styles.badge} ${styles.platformBadge}`}>
              {platform.toUpperCase()}
            </span>
          )}
        </div>

        {duration && (
          <div className={styles.durationOverlay}>
            <Clock size={12} />
            <span>{formatDuration(duration)}</span>
          </div>
        )}
      </div>

      <div className={styles.details}>
        <h3 className={styles.title} title={title}>{title}</h3>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <strong>Quality:</strong> {quality || 'Best'}
          </span>
          <span className={styles.metaDot}>•</span>
          <span className={styles.metaItem}>
            <strong>Format:</strong> {(format || 'mp4').toUpperCase()}
          </span>
          {formatFileSize(fileSize) && (
            <>
              <span className={styles.metaDot}>•</span>
              <span className={styles.metaItem}>
                <HardDrive size={12} />
                {formatFileSize(fileSize)}
              </span>
            </>
          )}
        </div>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="btn-primary"
          style={{ width: '100%', height: '48px', marginTop: '16px', fontSize: '15px' }}
        >
          {isDownloading ? (
            <>
              <RefreshCw className={styles.spin} size={18} />
              <span>Downloading...</span>
            </>
          ) : downloadCompleted ? (
            <>
              <Check size={18} />
              <span>Downloaded! Download Again</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span>Download Now</span>
            </>
          )}
        </button>

        <button onClick={onReset} className={styles.resetBtn}>
          ← Download another URL
        </button>
      </div>
    </div>
  );
}
