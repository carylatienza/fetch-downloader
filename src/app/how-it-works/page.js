import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { Link2, Search, Download, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'How Fetch Works — Download in 3 Steps',
  description: 'Learn how to download videos and images from YouTube, Facebook, Instagram, and X in 3 simple steps.',
};

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="eyebrow-container">
          <div className="eyebrow-line" />
          <span className="eyebrow-label">HOW IT WORKS</span>
          <div className="eyebrow-line" />
        </div>

        <h1 className={styles.headline}>Download in three steps.</h1>
        <p className={styles.subtext}>
          Fetch makes downloading media from social platforms as simple as copy-paste. Here&apos;s how it works.
        </p>

        <section className={styles.stepsContainer}>
          <div className="glass-panel" style={{ padding: '40px', marginBottom: '32px' }}>
            <div className={styles.stepHeader}>
              <span className={styles.stepBadge}>STEP 01</span>
              <div className={styles.iconCircle}><Link2 size={24} /></div>
            </div>
            <h2 className={styles.stepTitle}>Find and copy the URL</h2>
            <p className={styles.stepDesc}>
              Navigate to the video or image you want to download on YouTube, Facebook, Instagram, or X. Copy the URL from your browser&apos;s address bar or use the platform&apos;s share button to copy the link.
            </p>
            <div className={styles.exampleBox}>
              <p className={styles.exampleTitle}>Supported URL patterns:</p>
              <code className={styles.code}>youtube.com/watch?v=...</code>
              <code className={styles.code}>instagram.com/reel/...</code>
              <code className={styles.code}>facebook.com/watch/...</code>
              <code className={styles.code}>x.com/user/status/...</code>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '40px', marginBottom: '32px' }}>
            <div className={styles.stepHeader}>
              <span className={styles.stepBadge}>STEP 02</span>
              <div className={styles.iconCircle}><Search size={24} /></div>
            </div>
            <h2 className={styles.stepTitle}>Paste into Fetch</h2>
            <p className={styles.stepDesc}>
              Paste the URL into the input field on Fetch and click the &quot;Fetch Media&quot; button. We&apos;ll automatically detect which platform it&apos;s from and extract the media information — including title, thumbnail, quality, and file size.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '40px', marginBottom: '32px' }}>
            <div className={styles.stepHeader}>
              <span className={styles.stepBadge}>STEP 03</span>
              <div className={styles.iconCircle}><Download size={24} /></div>
            </div>
            <h2 className={styles.stepTitle}>Preview and download</h2>
            <p className={styles.stepDesc}>
              Review the preview card to make sure it&apos;s the right content and quality. Then click &quot;Download Now&quot; — the file saves directly to your device through your browser&apos;s native download.
            </p>
          </div>
        </section>

        <section className={styles.ctaBox}>
          <div className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
            <h2 className={styles.ctaTitle}>Ready to try it?</h2>
            <Link href="/" className="btn-primary" style={{ marginTop: '20px', fontSize: '15px' }}>
              <span>Open Fetch</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
