import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Terms of Service — Fetch',
  description: 'Terms of Service governing the use of Fetch media downloader.',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="eyebrow-container reveal">
          <div className="eyebrow-line" />
          <span className="eyebrow-label">LEGAL</span>
          <div className="eyebrow-line" />
        </div>

        <h1 className={`${styles.headline} reveal reveal-delay-1`}>Terms of Service</h1>
        <p className={`${styles.subtext} reveal reveal-delay-2`}>
          Last updated: July 29, 2025. Please review these terms before using Fetch.
        </p>

        <section className={`${styles.section} reveal`}>
          <div className="glass-panel" style={{ padding: '40px' }}>
            <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
            <p className={styles.paragraph}>
              By accessing and using Fetch, you agree to comply with these Terms of Service. If you do not agree with any part of these terms, please do not use the application.
            </p>

            <h2 className={styles.sectionTitle}>2. Permitted Use & Copyright Compliance</h2>
            <p className={styles.paragraph}>
              Fetch is designed for downloading public media content for personal, non-commercial, or fair use purposes. Users are solely responsible for ensuring they have the legal right or permission to download and store media obtained via Fetch.
            </p>

            <h2 className={styles.sectionTitle}>3. Disclaimer of Warranties</h2>
            <p className={styles.paragraph}>
              Fetch is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind. We do not guarantee uninterrupted service or compatibility with all third-party media links.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
