'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import UrlInput from '@/components/UrlInput/UrlInput';
import PlatformBadges from '@/components/PlatformBadges/PlatformBadges';
import LoadingState from '@/components/LoadingState/LoadingState';
import PreviewCard from '@/components/PreviewCard/PreviewCard';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { Shield, Sparkles, Layers, Link as LinkIcon, Search, Download } from 'lucide-react';
import styles from './page.module.css';

export default function HomePage() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [extractedData, setExtractedData] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('');

  const handleExtract = async (url) => {
    setCurrentUrl(url);
    setStatus('loading');
    setErrorData(null);
    setExtractedData(null);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (result.success) {
        setExtractedData(result.data);
        setStatus('success');
      } else {
        setErrorData(result.error);
        setStatus('error');
      }
    } catch (err) {
      console.error('Extraction error:', err);
      setErrorData({
        code: 'EXTRACTION_FAILED',
        message: 'Could not connect to extraction server. Please check your connection.',
      });
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setExtractedData(null);
    setErrorData(null);
    setCurrentUrl('');
  };

  return (
    <>
      <Header />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="eyebrow-container">
            <div className="eyebrow-line" />
            <span className="eyebrow-label">DOWNLOAD ANYTHING, ANYWHERE</span>
            <div className="eyebrow-line" />
          </div>

          <h1 className={`${styles.title} text-gradient`}>Fetch</h1>

          <p className={styles.subheadline}>
            The all-in-one media downloader. Grab videos and images from YouTube, Facebook, Instagram, and X in maximum available quality. No ads. No sign-ups. Just paste and download.
          </p>

          <div className={styles.inputArea}>
            <UrlInput onSubmit={handleExtract} isLoading={status === 'loading'} initialValue={currentUrl} />

            {status === 'idle' && <PlatformBadges />}
            {status === 'loading' && <LoadingState />}
            {status === 'success' && extractedData && (
              <PreviewCard data={extractedData} onReset={handleReset} />
            )}
            {status === 'error' && errorData && (
              <ErrorMessage
                error={errorData}
                onRetry={() => handleExtract(currentUrl)}
                onReset={handleReset}
              />
            )}
          </div>
        </section>

        {/* How It Works Brief (Below the Fold) */}
        <section className={styles.featureSection}>
          <div className="eyebrow-container">
            <div className="eyebrow-line" />
            <span className="eyebrow-label">HOW IT WORKS</span>
            <div className="eyebrow-line" />
          </div>

          <h2 className={styles.sectionHeading}>Three steps. That&apos;s it.</h2>

          <div className={styles.stepsGrid}>
            <div className="glass-panel" style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div className={styles.iconCircle}>
                <LinkIcon size={24} />
              </div>
              <h3 className={styles.stepTitle}>1. Copy your URL</h3>
              <p className={styles.stepDesc}>Find a video or image on any supported platform and copy its URL.</p>
            </div>

            <div className="glass-panel" style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div className={styles.iconCircle}>
                <Search size={24} />
              </div>
              <h3 className={styles.stepTitle}>2. Paste into Fetch</h3>
              <p className={styles.stepDesc}>Paste the URL into Fetch. We auto-detect the platform and extract top quality.</p>
            </div>

            <div className="glass-panel" style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div className={styles.iconCircle}>
                <Download size={24} />
              </div>
              <h3 className={styles.stepTitle}>3. Download</h3>
              <p className={styles.stepDesc}>Preview your media and download it directly to your device.</p>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className={styles.featureSection}>
          <div className="eyebrow-container">
            <div className="eyebrow-line" />
            <span className="eyebrow-label">WHY FETCH</span>
            <div className="eyebrow-line" />
          </div>

          <h2 className={styles.sectionHeading}>One tool. Every platform.</h2>

          <div className={styles.featuresGrid}>
            <div className="glass-panel" style={{ padding: '28px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div className={styles.featureIcon}>
                <Shield size={24} />
              </div>
              <div>
                <h3 className={styles.featureTitle}>No ads, ever</h3>
                <p className={styles.featureDesc}>No popups, no redirects, no misleading buttons. The download button actually downloads.</p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '28px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div className={styles.featureIcon}>
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className={styles.featureTitle}>Best quality source</h3>
                <p className={styles.featureDesc}>We extract the original source file at highest resolution. No silent compression.</p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '28px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div className={styles.featureIcon}>
                <Layers size={24} />
              </div>
              <div>
                <h3 className={styles.featureTitle}>All-in-one experience</h3>
                <p className={styles.featureDesc}>YouTube, Facebook, Instagram, X — all from one input. No more juggling different sites.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
