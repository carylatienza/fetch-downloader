import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Terms of Service — Fetch',
  description: 'Terms of Service for using Fetch media downloader.',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="eyebrow-container">
          <div className="eyebrow-line" />
          <span className="eyebrow-label">LEGAL</span>
          <div className="eyebrow-line" />
        </div>

        <h1 className={styles.headline}>Terms of Service</h1>
        <p className={styles.lastUpdated}>Last updated: July 2025</p>

        <div className="glass-panel" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
          <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
          <p className={styles.text}>
            By accessing and using Fetch (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use the Service.
          </p>

          <h2 className={styles.sectionTitle}>2. Description of Service</h2>
          <p className={styles.text}>
            Fetch is a free, web-based tool that extracts and facilitates the download of publicly available media content from supported social media platforms. Fetch does not host, store, or redistribute any content.
          </p>

          <h2 className={styles.sectionTitle}>3. Permitted Use</h2>
          <p className={styles.text}>
            You may use Fetch to download publicly available videos and images for personal, non-commercial use. You are responsible for ensuring that your use of downloaded content complies with applicable copyright laws and the terms of service of the original platform.
          </p>

          <h2 className={styles.sectionTitle}>4. Prohibited Use</h2>
          <ul className={styles.list}>
            <li>Download content that you do not have the right to access.</li>
            <li>Download, distribute, or sell copyrighted content without permission.</li>
            <li>Circumvent access controls, paywalls, or authentication requirements.</li>
            <li>Use automated bots or scripts to access the Service at excessive rates.</li>
          </ul>

          <h2 className={styles.sectionTitle}>5. Disclaimer of Warranties</h2>
          <p className={styles.text}>
            The Service is provided &quot;as is&quot; without any warranties of any kind. We do not guarantee uninterrupted or error-free operation. Media availability depends on third-party platforms.
          </p>

          <h2 className={styles.sectionTitle}>6. Limitation of Liability</h2>
          <p className={styles.text}>
            Fetch and its creators shall not be liable for any direct, indirect, or incidental damages arising from your use of the Service.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
