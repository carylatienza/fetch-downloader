'use client';

import { Youtube, Facebook, Instagram, Sparkles } from 'lucide-react';
import styles from './PlatformBadges.module.css';

function XIcon({ size = 14, className, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const PLATFORMS = [
  {
    name: 'YouTube',
    sampleUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    icon: Youtube,
    color: '#FF0000',
    glowClass: styles.ytGlow,
    detail: '4K MP4 · Shorts · Audio',
  },
  {
    name: 'Instagram',
    sampleUrl: 'https://www.instagram.com/p/C-sample123/',
    icon: Instagram,
    color: '#E4405F',
    glowClass: styles.igGlow,
    detail: 'Carousel ZIP · Reels · HD',
  },
  {
    name: 'Facebook',
    sampleUrl: 'https://www.facebook.com/prince.ashrin.yxie.mendoza.2024',
    icon: Facebook,
    color: '#1877F2',
    glowClass: styles.fbGlow,
    detail: 'HD Video · Photo Galleries',
  },
  {
    name: 'X (Twitter)',
    sampleUrl: 'https://x.com/sample/status/123456789',
    icon: XIcon,
    color: '#F4F4F5',
    glowClass: styles.xGlow,
    detail: '1080p Video · Multi-Photo',
  },
];

export default function PlatformBadges({ onSelectSample }) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>
        <Sparkles size={13} className={styles.sparkle} />
        <span>Supported platforms (click to try a sample URL):</span>
      </span>
      <div className={styles.badgeRow}>
        {PLATFORMS.map(({ name, sampleUrl, icon: Icon, color, glowClass, detail }) => (
          <button
            key={name}
            type="button"
            onClick={() => onSelectSample && onSelectSample(sampleUrl)}
            className={`${styles.badge} ${glowClass}`}
            title={`Click to test sample ${name} link (${detail})`}
          >
            <div className={styles.iconWrap}>
              <Icon size={14} style={{ color }} />
            </div>
            <span className={styles.badgeName}>{name}</span>
            <span className={styles.badgeDetail}>{detail}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
