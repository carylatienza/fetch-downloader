import Link from 'next/link';
import Image from 'next/image';
import { Github } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Image
              src="/images/logo.png"
              alt="Fetch Logo"
              width={28}
              height={28}
              className={styles.logoImage}
            />
          </div>
          <span className={styles.logoText}>Fetch</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/how-it-works" className={styles.navLink}>How It Works</Link>
          <Link href="/faq" className={styles.navLink}>FAQ</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </nav>

        <div className={styles.actions}>
          <a
            href="https://github.com/carylatienza/fetch-downloader"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{ padding: '6px 14px', fontSize: '13px' }}
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
