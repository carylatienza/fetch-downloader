'use client';

import { useState } from 'react';
import { Download, Film, Image as ImageIcon, Check, RefreshCw, Clock, HardDrive, ChevronLeft, ChevronRight, Archive, ArrowLeft } from 'lucide-react';
import { YouTubeLogo, InstagramLogo, FacebookLogo, XLogo } from '@/components/BrandLogos/BrandLogos';
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

function PlatformLogoBadge({ platform }) {
  const p = (platform || '').toLowerCase();
  if (p.includes('youtube')) return <YouTubeLogo size={16} />;
  if (p.includes('instagram')) return <InstagramLogo size={16} />;
  if (p.includes('facebook')) return <FacebookLogo size={16} />;
  if (p.includes('twitter') || p.includes('x')) return <XLogo size={16} />;
  return null;
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

  const [downloadError, setDownloadError] = useState(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadCompleted(false);
    setDownloadError(null);

    try {
      const targetMediaUrl = isGallery
        ? (images[activePhotoIndex]?.url || rawImage)
        : (mediaType === 'video' ? (sourceUrl || rawImage) : (thumbnail || sourceUrl));
      const downloadUrl = `/api/download?id=${encodeURIComponent(downloadId || '')}&url=${encodeURIComponent(sourceUrl || '')}&mediaUrl=${encodeURIComponent(targetMediaUrl || '')}&mediaType=${encodeURIComponent(mediaType || 'image')}&title=${encodeURIComponent(title || 'media_file')}&format=${encodeURIComponent(format || 'jpg')}`;
      
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        let errMsg = 'Download failed. The media file may be unavailable.';
        try {
          const errData = await response.json();
          if (errData?.error?.message) {
            errMsg = errData.error.message;
          }
        } catch {}
        throw new Error(errMsg);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const contentType = response.headers.get('content-type') || '';
      let ext = format || (mediaType === 'video' ? 'mp4' : 'jpg');
      if (contentType.includes('image/jpeg')) ext = 'jpg';
      else if (contentType.includes('image/png')) ext = 'png';
      else if (contentType.includes('video/mp4')) ext = 'mp4';
      else if (contentType.includes('application/zip')) ext = 'zip';

      const downloadFilename = `${(title || 'media_file').replace(/[^a-zA-Z0-9_-]/g, '_')}.${ext}`;

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = downloadFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);

      setDownloadCompleted(true);
    } catch (err) {
      console.error('Download error:', err);
      setDownloadError(err.message || 'Failed to download media file');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    setDownloadCompleted(false);
    setDownloadError(null);

    try {
      const downloadUrl = `/api/download?id=${encodeURIComponent(downloadId || '')}&url=${encodeURIComponent(sourceUrl || '')}&zip=true&title=${encodeURIComponent(title || 'media_file')}`;
      
      const response = await fetch(downloadUrl);

      if (!response.ok) {
        let errMsg = 'ZIP download failed. Media files may be unavailable.';
        try {
          const errData = await response.json();
          if (errData?.error?.message) {
            errMsg = errData.error.message;
          }
        } catch {}
        throw new Error(errMsg);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const downloadFilename = `${(title || 'gallery').replace(/[^a-zA-Z0-9_-]/g, '_')}.zip`;

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = downloadFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);

      setDownloadCompleted(true);
    } catch (err) {
      console.error('ZIP Download error:', err);
      setDownloadError(err.message || 'Failed to download ZIP archive');
    } finally {
      setIsDownloading(false);
    }
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
              <PlatformLogoBadge platform={platform} />
              <span>{platform.toUpperCase()}</span>
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
        <h2 className={styles.title}>{title || 'Untitled Media'}</h2>

        <div className={styles.metaRow}>
          {quality && (
            <span className={styles.metaItem}>
              <strong>Quality:</strong> {quality}
            </span>
          )}
          {quality && (format || fileSize) && <span className={styles.metaDot}>·</span>}
          {format && (
            <span className={styles.metaItem}>
              <strong>Format:</strong> {format.toUpperCase()}
            </span>
          )}
          {fileSize && <span className={styles.metaDot}>·</span>}
          {fileSize && (
            <span className={styles.metaItem}>
              <HardDrive size={12} />
              <span>{formatFileSize(fileSize)}</span>
            </span>
          )}
        </div>

        {isGallery ? (
          <div className={styles.galleryActions}>
            <button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {isDownloading ? (
                <>
                  <RefreshCw size={18} className={styles.spin} />
                  <span>Preparing ZIP...</span>
                </>
              ) : downloadCompleted ? (
                <>
                  <Check size={18} />
                  <span>ZIP Downloaded!</span>
                </>
              ) : (
                <>
                  <Archive size={18} />
                  <span>Download All Photos (.zip)</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={styles.secondaryBtn}
            >
              <Download size={15} />
              <span>Download Photo #{activePhotoIndex + 1} Only</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {isDownloading ? (
              <>
                <RefreshCw size={18} className={styles.spin} />
                <span>Preparing Download...</span>
              </>
            ) : downloadCompleted ? (
              <>
                <Check size={18} />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download size={18} />
                <span>Download Now</span>
              </>
            )}
          </button>
        )}

        {downloadError && (
          <div style={{ color: '#ff4d4d', fontSize: '0.85rem', marginTop: '0.75rem', textAlign: 'center', background: 'rgba(255, 77, 77, 0.1)', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 77, 77, 0.2)' }}>
            ⚠️ {downloadError}
          </div>
        )}

        <button onClick={onReset} className={styles.resetBtn}>
          <ArrowLeft size={14} />
          <span>Download another URL</span>
        </button>
      </div>
    </div>
  );
}
