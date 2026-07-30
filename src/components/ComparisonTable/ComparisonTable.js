import { Check, X } from 'lucide-react';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import styles from './ComparisonTable.module.css';

const COMPARISON_ROWS = [
  {
    feature: 'Ads & Redirect Popups',
    others: '5–10 intrusive popups',
    othersGood: false,
    fetch: '0 Ads, Ever',
    fetchGood: true,
  },
  {
    feature: 'Multi-Photo Posts',
    others: 'Downloads 1 photo only',
    othersGood: false,
    fetch: 'Download All as .ZIP Archive',
    fetchGood: true,
  },
  {
    feature: 'Media Preview',
    others: 'Blind download / broken images',
    othersGood: false,
    fetch: 'Interactive Image Carousel',
    fetchGood: true,
  },
  {
    feature: 'Source Quality',
    others: 'Downscaled / Compressed 480p',
    othersGood: false,
    fetch: 'Maximum Source Resolution (4K)',
    fetchGood: true,
  },
  {
    feature: 'Account / Registration',
    others: 'Required or forced sign-up',
    othersGood: false,
    fetch: 'No Sign-ups, Ever',
    fetchGood: true,
  },
];

export default function ComparisonTable() {
  return (
    <section className={styles.section}>
      <h2 className={`${styles.heading} reveal`}>Fetch vs. typical downloader sites.</h2>
      <p className={`${styles.subheading} reveal`}>
        No popups, no misleading buttons, no silent compression.
      </p>

      <SpotlightCard className={`${styles.tableWrapper} glass-panel`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.featureHeader}>Feature</th>
              <th className={styles.othersHeader}>Other Downloaders</th>
              <th className={styles.fetchHeader}>
                <div className={styles.fetchBadge}>
                  <span>Fetch</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.feature} className={styles.row}>
                <td className={styles.featureCell}>{row.feature}</td>
                <td className={styles.othersCell}>
                  <div className={styles.cellInner}>
                    <span className={styles.badIcon}>
                      <X size={14} />
                    </span>
                    <span>{row.others}</span>
                  </div>
                </td>
                <td className={styles.fetchCell}>
                  <div className={styles.cellInner}>
                    <span className={styles.goodIcon}>
                      <Check size={14} />
                    </span>
                    <strong>{row.fetch}</strong>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SpotlightCard>
    </section>
  );
}
