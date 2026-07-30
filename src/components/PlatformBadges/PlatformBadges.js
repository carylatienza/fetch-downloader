'use client';

import { Sparkles } from 'lucide-react';
import { YouTubeLogo, InstagramLogo, FacebookLogo, XLogo } from '@/components/BrandLogos/BrandLogos';
import styles from './PlatformBadges.module.css';

const PLATFORMS = [
  {
    name: 'YouTube',
    sampleUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    LogoComponent: YouTubeLogo,
    glowClass: styles.ytGlow,
    detail: '4K MP4 · Shorts · Audio',
  },
  {
    name: 'Instagram',
    sampleUrl: 'https://www.instagram.com/p/DKj8jg5yCli/?img_index=1',
    LogoComponent: InstagramLogo,
    glowClass: styles.igGlow,
    detail: 'Carousel ZIP · Reels · HD',
  },
  {
    name: 'Facebook',
    sampleUrl: 'https://www.facebook.com/share/p/1GZgoTsh1H/',
    LogoComponent: FacebookLogo,
    glowClass: styles.fbGlow,
    detail: 'HD Video · Photo Galleries',
  },
  {
    name: 'X (Twitter)',
    sampleUrl: 'https://x.com/amypeck2011/status/751356773530013696?s=20',
    LogoComponent: XLogo,
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
        {PLATFORMS.map(({ name, sampleUrl, LogoComponent, glowClass, detail }) => (
          <button
            key={name}
            type="button"
            suppressHydrationWarning
            onClick={() => onSelectSample && onSelectSample(sampleUrl)}
            className={`${styles.badge} ${glowClass}`}
            title={`Click to test sample ${name} link (${detail})`}
          >
            <div className={styles.iconWrap}>
              <LogoComponent size={20} />
            </div>
            <span className={styles.badgeName}>{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
