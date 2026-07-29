'use client';

import { useState } from 'react';
import { Download, Film, Image as ImageIcon, Check, RefreshCw, Clock, HardDrive, ChevronLeft, ChevronRight, Archive } from 'lucide-react';
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

function getProxiedImageSrc(url) {
  if (!url) return '';
  if (url.startsWith('/api/download') || url.startsWith('data:')) return url;
  return `/api/download?imageUrl=${encodeURIComponent(url)}&preview=true`;
}

export default function PreviewCard({ data, onReset }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const {
    downloadId,
    sourceUrl,
    title,
    thumbnail,
    platform,
    mediaType,
    quality,
    duration,
    fileSize,
    format,
    images = [],
  } = data;

  const isGallery = Array.isArray(images) && images.length > 1;
  const rawImage = isGallery ? images[activePhotoIndex]?.url : (thumbnail || sourceUrl);
  const currentImage = getProxiedImageSrc(rawImage);

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setImageError(false);
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setImageError(false);
    setActivePhotoIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleDownload = (singleUrl = null) => {
    setIsDownloading(true);

    const isSingle = Boolean(singleUrl);
    const params = new URLSearchParams({
      id: downloadId || '',
      url: singleUrl || sourceUrl || '',
      title: isSingle ? `${title}_photo_${activePhotoIndex + 1}` : (title || 'media_file'),
      mediaType: isGallery && !isSingle ? 'gallery' : (mediaType || 'image'),
      format: isGallery && !isSingle ? 'zip' : (format || 'jpg'),
    });

    if (singleUrl) {
      params.set('imageUrl', singleUrl);
    }

    const downloadUrl = `/api/download?${params.toString()}`;
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
        {currentImage && !imageError ? (
          <img
            src={currentImage}
            alt={title}
            className={styles.thumbnail}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.thumbnailFallback}>
            {mediaType === 'video' ? <Film size={48} /> : <ImageIcon size={48} />}
          </div>
        )}

        {isGallery && (
          <>
            <button onClick={handlePrevPhoto} className={`${styles.navBtn} ${styles.prevBtn}`} aria-label="Previous photo">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNextPhoto} className={`${styles.navBtn} ${styles.nextBtn}`} aria-label="Next photo">
              <ChevronRight size={20} />
            </button>
            <div className={styles.galleryCounter}>
              <span>Photo {activePhotoIndex + 1} of {images.length}</span>
            </div>
          </>
        )}

        <div className={styles.badgeGroup}>
          <span className={styles.badge}>
            {mediaType === 'video' ? (
              <Film size={12} />
            ) : (
              <ImageIcon size={12} />
            )}
            <span>{isGallery ? `Gallery (${images.length})` : mediaType === 'video' ? 'Video' : 'Image'}</span>
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
            <strong>Quality:</strong> {quality || 'Original'}
          </span>
          <span className={styles.metaDot}>•</span>
          <span className={styles.metaItem}>
            <strong>Format:</strong> {isGallery ? 'ZIP / JPG' : (format || 'JPG').toUpperCase()}
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

        {isGallery ? (
          <div className={styles.galleryActions}>
            <button
              onClick={() => handleDownload()}
              disabled={isDownloading}
              className="btn-primary"
              style={{ width: '100%', height: '48px', marginTop: '16px', fontSize: '15px' }}
            >
              {isDownloading ? (
                <>
                  <RefreshCw className={styles.spin} size={18} />
                  <span>Packaging ZIP...</span>
                </>
              ) : downloadCompleted ? (
                <>
                  <Check size={18} />
                  <span>ZIP Downloaded! Download Again</span>
                </>
              ) : (
                <>
                  <Archive size={18} />
                  <span>Download All {images.length} Photos (.zip)</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleDownload(images[activePhotoIndex]?.url)}
              disabled={isDownloading}
              className={styles.secondaryBtn}
            >
              <Download size={14} />
              <span>Download Photo #{activePhotoIndex + 1} Only</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleDownload()}
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
        )}

        <button onClick={onReset} className={styles.resetBtn}>
          ← Download another URL
        </button>
      </div>
    </div>
  );
}
