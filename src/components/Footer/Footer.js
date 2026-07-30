import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <Image
                src="/images/logo.png"
                alt="Fetch Logo"
                width={22}
                height={22}
                className={styles.logoImage}
              />
            </div>
            <span>Fetch</span>
          </Link>

          <nav className={styles.nav}>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/how-it-works" className={styles.link}>How it works</Link>
            <Link href="/faq" className={styles.link}>FAQ</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </nav>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>© 2025 Fetch. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link href="/terms" className={styles.legalLink}>Terms</Link>
            <span className={styles.dot}>·</span>
            <Link href="/privacy" className={styles.legalLink}>Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
