import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import styles from './page.module.css';

export const metadata = {
  title: 'Privacy Policy — Fetch',
  description: 'Read the Fetch Privacy Policy to understand how we protect user privacy with zero tracking, zero ad cookies, and zero media storage.',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="eyebrow-container reveal">
          <div className="eyebrow-line" />
          <span className="eyebrow-label">LEGAL & PRIVACY</span>
          <div className="eyebrow-line" />
        </div>

        <h1 className={`${styles.headline} reveal reveal-delay-1`}>Privacy Policy</h1>
        <p className={`${styles.subtext} reveal reveal-delay-2`}>
          Last updated: July 29, 2025. Fetch is built with a strict privacy-first architecture.
        </p>

        <section className={`${styles.section} reveal`}>
          <SpotlightCard spotlightColor="rgba(124, 106, 239, 0.2)" className="glass-panel" style={{ padding: '40px' }}>
            <h2 className={styles.sectionTitle}>1. Zero Storage Policy</h2>
            <p className={styles.paragraph}>
              Fetch does not host, store, save, or archive any extracted videos, images, or audio files on our servers. When you paste a URL, media streams are proxied directly from the official platform CDNs (YouTube, Facebook, Instagram, X) to your local browser session.
            </p>

            <h2 className={styles.sectionTitle}>2. No Tracking or Personal Data Collection</h2>
            <p className={styles.paragraph}>
              We do not require user registration, accounts, or personal information to use Fetch. We do not place tracking cookies, run third-party advertising scripts, or build user profiles.
            </p>

            <h2 className={styles.sectionTitle}>3. Server Logs</h2>
            <p className={styles.paragraph}>
              Temporary server logs are maintained strictly for performance monitoring, rate limiting, and technical debugging. These logs are automatically purged regularly and are never shared or sold.
            </p>
          </SpotlightCard>
        </section>
      </main>
      <Footer />
    </>
  );
}
