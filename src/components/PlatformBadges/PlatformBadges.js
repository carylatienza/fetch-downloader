import { Youtube, Facebook, Instagram, Twitter } from 'lucide-react';
import styles from './PlatformBadges.module.css';

const PLATFORMS = [
  {
    name: 'YouTube',
    icon: Youtube,
    color: '#FF0000',
    glowClass: styles.ytGlow,
    detail: '4K MP4 · Shorts · Audio',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    color: '#1877F2',
    glowClass: styles.fbGlow,
    detail: 'HD Video · Photo Galleries',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    color: '#E4405F',
    glowClass: styles.igGlow,
    detail: 'Carousel ZIP · Reels · HD',
  },
  {
    name: 'X / Twitter',
    icon: Twitter,
    color: '#1DA1F2',
    glowClass: styles.xGlow,
    detail: '1080p Video · Multi-Photo',
  },
];

export default function PlatformBadges() {
  return (
    <div className={styles.container}>
      <span className={styles.label}>Supported platforms & features:</span>
      <div className={styles.badgeRow}>
        {PLATFORMS.map(({ name, icon: Icon, color, glowClass, detail }) => (
          <div key={name} className={`${styles.badge} ${glowClass}`} title={`${name}: ${detail}`}>
            <Icon size={14} style={{ color }} />
            <span className={styles.badgeName}>{name}</span>
            <span className={styles.badgeDetail}>{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
