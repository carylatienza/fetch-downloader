import { Youtube, Facebook, Instagram, Twitter, Video, Image, Film, Archive, Check } from 'lucide-react';
import styles from './PlatformMatrix.module.css';

const PLATFORM_DATA = [
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: '#FF0000',
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
    icon: Instagram,
    color: '#E4405F',
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
    icon: Facebook,
    color: '#1877F2',
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
    icon: Twitter,
    color: '#1DA1F2',
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
        {PLATFORM_DATA.map(({ id, name, icon: Icon, color, description, features }) => (
          <div key={id} className={`${styles.card} glass-panel reveal`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrap} style={{ background: `${color}15`, borderColor: `${color}30` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <h3 className={styles.cardTitle}>{name}</h3>
                <p className={styles.cardDesc}>{description}</p>
              </div>
            </div>

            <div className={styles.featureList}>
              {features.map((feat) => (
                <div key={feat.name} className={styles.featureItem}>
                  <Check size={14} className={styles.checkIcon} />
                  <span>{feat.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
