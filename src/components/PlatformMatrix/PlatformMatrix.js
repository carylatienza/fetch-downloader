import { Check } from 'lucide-react';
import { YouTubeLogo, InstagramLogo, FacebookLogo, XLogo } from '@/components/BrandLogos/BrandLogos';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import styles from './PlatformMatrix.module.css';

const PLATFORM_DATA = [
  {
    id: 'youtube',
    name: 'YouTube',
    LogoComponent: YouTubeLogo,
    spotlightColor: 'rgba(255, 0, 0, 0.35)',
    description: 'Extract 4K Ultra HD videos, Shorts, and high-bitrate audio.',
    features: [
      { name: '4K & 1080p 60fps MP4', supported: true },
      { name: 'YouTube Shorts extraction', supported: true },
      { name: 'Audio-only MP3 export', supported: true },
      { name: 'High-res thumbnail preview', supported: true },
    ],
  },
  {
    id: 'instagram',
    name: 'Instagram',
    LogoComponent: InstagramLogo,
    spotlightColor: 'rgba(228, 64, 95, 0.35)',
    description: 'Download multi-photo carousels as ZIP and full HD Reels.',
    features: [
      { name: 'Multi-photo Carousel ZIP', supported: true },
      { name: 'Full HD Reel & Video MP4', supported: true },
      { name: 'Single Photo HD Export', supported: true },
      { name: 'Interactive Image Slider', supported: true },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    LogoComponent: FacebookLogo,
    spotlightColor: 'rgba(24, 119, 242, 0.35)',
    description: 'Save public video posts, photo collections, and profile media.',
    features: [
      { name: 'HD & SD Video MP4 Streams', supported: true },
      { name: 'Multi-photo Post Bundles', supported: true },
      { name: 'Direct CDN Proxy Preview', supported: true },
      { name: 'Profile & Page Photos', supported: true },
    ],
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    LogoComponent: XLogo,
    spotlightColor: 'rgba(255, 255, 255, 0.25)',
    description: 'Download 1080p tweet videos, multi-image tweets, and GIFs.',
    features: [
      { name: '1080p Tweet Video MP4', supported: true },
      { name: 'Multi-image Tweet ZIP', supported: true },
      { name: 'Animated GIF Extraction', supported: true },
      { name: 'Clean Source Media URLs', supported: true },
    ],
  },
];

export default function PlatformMatrix() {
  return (
    <section className={styles.section}>
      <div className="eyebrow-container reveal">
        <div className="eyebrow-line" />
        <span className="eyebrow-label">Supported Media Capabilities</span>
        <div className="eyebrow-line" />
      </div>

      <h2 className={`${styles.heading} reveal`}>Full capability matrix.</h2>
      <p className={`${styles.subheading} reveal`}>
        Fetch extracts maximum quality directly from platform CDNs across all four major networks.
      </p>

      <div className={styles.grid}>
        {PLATFORM_DATA.map(({ id, name, LogoComponent, spotlightColor, description, features }) => (
          <SpotlightCard key={id} spotlightColor={spotlightColor} className={`${styles.card} glass-panel reveal`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrap}>
                <LogoComponent size={36} />
              </div>
              <div>
                <h3 className={styles.cardTitle}>{name}</h3>
                <p className={styles.cardDesc}>{description}</p>
              </div>
            </div>

            <div className={styles.featureList}>
              {features.map((feat) => (
                <div key={feat.name} className={styles.featureItem}>
                  <div className={styles.checkBadge}>
                    <Check size={11} className={styles.checkIcon} />
                  </div>
                  <span>{feat.name}</span>
                </div>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
