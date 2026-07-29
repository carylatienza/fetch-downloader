import Link from 'next/link';
import { ArrowDownToLine } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <ArrowDownToLine size={16} />
            </div>
            <span>Fetch</span>
          </Link>
          <p className={styles.tagline}>
            The all-in-one media downloader. Download videos & images from YouTube, Facebook, Instagram, and X in maximum quality.
          </p>
          <p className={styles.copyright}>© 2025 Fetch. All rights reserved.</p>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Product</h4>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/how-it-works" className={styles.link}>How It Works</Link>
          <Link href="/faq" className={styles.link}>FAQ</Link>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Legal</h4>
          <Link href="/terms" className={styles.link}>Terms of Service</Link>
          <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Supported</h4>
          <span className={styles.textMuted}>YouTube</span>
          <span className={styles.textMuted}>Facebook</span>
          <span className={styles.textMuted}>Instagram</span>
          <span className={styles.textMuted}>X (Twitter)</span>
        </div>
      </div>
    </footer>
  );
}
