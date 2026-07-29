import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import Link from 'next/link';
import { Shield, Sparkles, Layers, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'About Fetch — The All-in-One Media Downloader',
  description: 'Learn about Fetch, the free tool built for creative professionals to download videos and images from YouTube, Facebook, Instagram, and X in maximum quality.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="eyebrow-container reveal">
          <div className="eyebrow-line" />
          <span className="eyebrow-label">ABOUT FETCH</span>
          <div className="eyebrow-line" />
        </div>

        <h1 className={`${styles.headline} reveal reveal-delay-1`}>Built by a creative, for creatives.</h1>
        <p className={`${styles.subtext} reveal reveal-delay-2`}>
          Fetch exists because downloading media from social platforms shouldn&apos;t be painful.
        </p>

        <section className={`${styles.section} reveal`}>
          <SpotlightCard spotlightColor="rgba(124, 106, 239, 0.22)" className="glass-panel" style={{ padding: '40px' }}>
            <p className={styles.paragraph}>
              If you&apos;ve ever tried to save a video from Instagram or grab a high-resolution image from X, you know the drill: Google a downloader, dodge popup ads, try three different sites, settle for low quality, and repeat the whole thing for a different platform.
            </p>
            <p className={styles.paragraph}>
              We built Fetch to end that cycle. One clean interface. Every major platform. Best quality, every time.
            </p>
          </SpotlightCard>
        </section>

        <section className={`${styles.section} reveal`}>
          <div className="eyebrow-container">
            <div className="eyebrow-line" />
            <span className="eyebrow-label">OUR MISSION</span>
            <div className="eyebrow-line" />
          </div>
          <h2 className={styles.sectionTitle}>Quality without compromise.</h2>
          <SpotlightCard spotlightColor="rgba(168, 200, 238, 0.22)" className="glass-panel" style={{ padding: '40px' }}>
            <p className={styles.paragraph}>
              Most downloader sites treat quality as an afterthought. They serve you compressed, re-encoded files and call it a day. Fetch is different. We use the same extraction technology trusted by millions of users worldwide to deliver the absolute best quality available — the actual source file, not a degraded copy.
            </p>
            <p className={styles.paragraph}>
              No accounts required. No ads. No browser extensions. No tricks. Just paste a URL and download what you need.
            </p>
          </SpotlightCard>
        </section>

        <section className={`${styles.section} reveal`}>
          <div className="eyebrow-container">
            <div className="eyebrow-line" />
            <span className="eyebrow-label">WHAT MAKES US DIFFERENT</span>
            <div className="eyebrow-line" />
          </div>

          <div className={styles.grid}>
            <SpotlightCard spotlightColor="rgba(124, 106, 239, 0.25)" className="glass-panel" style={{ padding: '32px' }}>
              <div className={styles.iconCircle}><Shield size={24} /></div>
              <h3 className={styles.cardTitle}>No ads, ever</h3>
              <p className={styles.cardDesc}>No popups, no redirects, no misleading buttons. The download button actually downloads.</p>
            </SpotlightCard>

            <SpotlightCard spotlightColor="rgba(168, 200, 238, 0.25)" className="glass-panel" style={{ padding: '32px' }}>
              <div className={styles.iconCircle}><Sparkles size={24} /></div>
              <h3 className={styles.cardTitle}>Best quality</h3>
              <p className={styles.cardDesc}>We extract the original source file at highest resolution. No re-encoding, no compression.</p>
            </SpotlightCard>

            <SpotlightCard spotlightColor="rgba(124, 106, 239, 0.25)" className="glass-panel" style={{ padding: '32px' }}>
              <div className={styles.iconCircle}><Layers size={24} /></div>
              <h3 className={styles.cardTitle}>One tool for all</h3>
              <p className={styles.cardDesc}>YouTube, Facebook, Instagram, X — all from one input. No more juggling different sites.</p>
            </SpotlightCard>
          </div>
        </section>

        <section className={`${styles.ctaBox} reveal`}>
          <SpotlightCard spotlightColor="rgba(124, 106, 239, 0.28)" className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
            <h2 className={styles.ctaTitle}>Ready to download?</h2>
            <Link href="/" className="btn-primary" style={{ marginTop: '20px', fontSize: '15px' }}>
              <span>Start Fetching</span>
              <ArrowRight size={16} />
            </Link>
          </SpotlightCard>
        </section>
      </main>
      <Footer />
    </>
  );
}
