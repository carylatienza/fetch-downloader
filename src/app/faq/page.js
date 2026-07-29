import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import FaqSection from '@/components/FaqSection/FaqSection';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'FAQ — Fetch Media Downloader',
  description: 'Frequently asked questions about Fetch, including supported platforms, formats, privacy, and trouble-shooting.',
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="eyebrow-container reveal">
          <div className="eyebrow-line" />
          <span className="eyebrow-label">HELP CENTER</span>
          <div className="eyebrow-line" />
        </div>

        <h1 className={`${styles.headline} reveal reveal-delay-1`}>Frequently asked questions.</h1>
        <p className={`${styles.subtext} reveal reveal-delay-2`}>
          Everything you need to know about Fetch, how it works, and supported media formats.
        </p>

        <FaqSection />

        <section className={`${styles.ctaBox} reveal`}>
          <SpotlightCard spotlightColor="rgba(124, 106, 239, 0.28)" className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
            <h2 className={styles.ctaTitle}>Still have questions?</h2>
            <p className={styles.ctaDesc}>Try pasting a link directly on the home page to see how fast Fetch extracts media.</p>
            <Link href="/" className="btn-primary" style={{ marginTop: '20px', fontSize: '15px' }}>
              <span>Try Fetch Now</span>
              <ArrowRight size={16} />
            </Link>
          </SpotlightCard>
        </section>
      </main>
      <Footer />
    </>
  );
}
