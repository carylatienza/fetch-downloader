import { Youtube, Facebook, Instagram, Twitter } from 'lucide-react';
import styles from './PlatformBadges.module.css';

const PLATFORMS = [
  { name: 'YouTube', icon: Youtube, color: '#FF0000' },
  { name: 'Facebook', icon: Facebook, color: '#1877F2' },
  { name: 'Instagram', icon: Instagram, color: '#E4405F' },
  { name: 'X / Twitter', icon: Twitter, color: '#1DA1F2' },
];

export default function PlatformBadges() {
  return (
    <div className={styles.container}>
      <span className={styles.label}>Supported platforms:</span>
      <div className={styles.badgeRow}>
        {PLATFORMS.map(({ name, icon: Icon, color }) => (
          <div key={name} className={styles.badge}>
            <Icon size={14} style={{ color }} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
