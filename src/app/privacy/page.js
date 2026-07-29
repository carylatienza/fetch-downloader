import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Privacy Policy — Fetch',
  description: 'Privacy Policy for Fetch media downloader.',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="eyebrow-container">
          <div className="eyebrow-line" />
          <span className="eyebrow-label">PRIVACY</span>
          <div className="eyebrow-line" />
        </div>

        <h1 className={styles.headline}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: July 2025</p>

        <div className="glass-panel" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
          <h2 className={styles.sectionTitle}>1. Overview</h2>
          <p className={styles.text}>
            Fetch is committed to protecting your privacy. We collect almost nothing. We don&apos;t require accounts, we don&apos;t track you, and we don&apos;t store your downloads.
          </p>

          <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
          <p className={styles.text}>
            We do not collect personal information like names, emails, or phone numbers. We do not store downloaded media on our servers. Media data is processed in memory and discarded after request completion.
          </p>

          <h2 className={styles.sectionTitle}>3. Server Logs</h2>
          <p className={styles.text}>
            Standard server logs (IP address, timestamp, requested URL) are maintained temporarily for security and rate limiting. We do not sell or share log data for marketing or tracking.
          </p>

          <h2 className={styles.sectionTitle}>4. Hosting & Infrastructure</h2>
          <p className={styles.text}>
            Fetch is hosted on Render.com. Standard hosting infrastructure privacy policies apply to network traffic.
          </p>

          <h2 className={styles.sectionTitle}>5. Contact</h2>
          <p className={styles.text}>
            For privacy questions, feel free to reach out via GitHub.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
