'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import UrlInput from '@/components/UrlInput/UrlInput';
import PlatformBadges from '@/components/PlatformBadges/PlatformBadges';
import LoadingState from '@/components/LoadingState/LoadingState';
import PreviewCard from '@/components/PreviewCard/PreviewCard';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import PlatformMatrix from '@/components/PlatformMatrix/PlatformMatrix';
import ComparisonTable from '@/components/ComparisonTable/ComparisonTable';
import FaqSection from '@/components/FaqSection/FaqSection';
import { Shield, Sparkles, Layers, Link as LinkIcon, Search, Download } from 'lucide-react';
import styles from './page.module.css';

function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function HomePage() {
  const [status, setStatus] = useState('idle');
  const [extractedData, setExtractedData] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const scrollRef = useScrollReveal();

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

      <main className={styles.main} ref={scrollRef}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroInner}>
            <div className="eyebrow-container">
              <div className="eyebrow-line" />
              <div className={styles.featureBadge}>
                <Sparkles size={12} className={styles.badgeSparkle} />
                <span>100% Free · No Ads · Multi-Photo ZIP Download</span>
              </div>
              <div className="eyebrow-line" />
            </div>

            <h1 className={`${styles.title} text-gradient`}>Fetch</h1>

            <p className={styles.subheadline}>
              Grab videos and images from YouTube, Facebook, Instagram, and X in maximum quality. No ads, no sign-ups — just paste and download.
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
          </div>
        </section>

        {/* How It Works — Step Timeline */}
        <section className={styles.stepsSection}>
          <div className="eyebrow-container reveal">
            <div className="eyebrow-line" />
            <span className="eyebrow-label">How it works</span>
            <div className="eyebrow-line" />
          </div>

          <h2 className={`${styles.sectionHeading} reveal`}>Three steps. That&apos;s it.</h2>

          <div className={styles.stepsTimeline}>
            <div className={`${styles.step} reveal reveal-delay-1`}>
              <div className={styles.stepNumber}>01</div>
              <div className={styles.stepContent}>
                <div className={styles.stepIconWrap}>
                  <LinkIcon size={20} strokeWidth={1.5} />
                </div>
                <h3 className={styles.stepTitle}>Copy your URL</h3>
                <p className={styles.stepDesc}>Find a video or image on any supported platform and copy its URL.</p>
              </div>
            </div>

            <div className={styles.stepConnector} aria-hidden="true" />

            <div className={`${styles.step} reveal reveal-delay-2`}>
              <div className={styles.stepNumber}>02</div>
              <div className={styles.stepContent}>
                <div className={styles.stepIconWrap}>
                  <Search size={20} strokeWidth={1.5} />
                </div>
                <h3 className={styles.stepTitle}>Paste into Fetch</h3>
                <p className={styles.stepDesc}>Paste the URL into Fetch. We auto-detect the platform and extract top quality.</p>
              </div>
            </div>

            <div className={styles.stepConnector} aria-hidden="true" />

            <div className={`${styles.step} reveal reveal-delay-3`}>
              <div className={styles.stepNumber}>03</div>
              <div className={styles.stepContent}>
                <div className={styles.stepIconWrap}>
                  <Download size={20} strokeWidth={1.5} />
                </div>
                <h3 className={styles.stepTitle}>Download</h3>
                <p className={styles.stepDesc}>Preview your media and download it directly to your device.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Fetch — Asymmetric Bento Grid */}
        <section className={styles.featuresSection}>
          <div className="eyebrow-container reveal">
            <div className="eyebrow-line" />
            <span className="eyebrow-label">Why Fetch</span>
            <div className="eyebrow-line" />
          </div>

          <h2 className={`${styles.sectionHeading} reveal`}>One tool. Every platform.</h2>

          <div className={styles.bentoGrid}>
            {/* Full-width hero card */}
            <div className={`${styles.bentoHero} glass-panel reveal reveal-delay-1`}>
              <div className={styles.bentoInner}>
                <div className={styles.featureIcon}>
                  <Shield size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className={styles.featureTitle}>No ads, ever</h3>
                  <p className={styles.featureDesc}>
                    No popups, no redirects, no misleading buttons. The download button actually downloads. We built Fetch because every other tool felt broken.
                  </p>
                </div>
              </div>
            </div>

            {/* Two side-by-side cards */}
            <div className={`${styles.bentoCard} glass-panel reveal reveal-delay-2`}>
              <div className={styles.bentoInner}>
                <div className={styles.featureIcon}>
                  <Sparkles size={24} strokeWidth={1.5} />
                </div>
                <h3 className={styles.featureTitle}>Best quality source</h3>
                <p className={styles.featureDesc}>
                  We extract the original source file at highest resolution. No silent compression.
                </p>
              </div>
            </div>

            <div className={`${styles.bentoCard} glass-panel reveal reveal-delay-3`}>
              <div className={styles.bentoInner}>
                <div className={styles.featureIcon}>
                  <Layers size={24} strokeWidth={1.5} />
                </div>
                <h3 className={styles.featureTitle}>All-in-one experience</h3>
                <p className={styles.featureDesc}>
                  YouTube, Facebook, Instagram, X — all from one input. No more juggling different sites.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Capabilities Matrix */}
        <PlatformMatrix />

        {/* Comparison Table */}
        <ComparisonTable />

        {/* FAQ Accordion Section */}
        <FaqSection />
      </main>

      <Footer />
    </>
  );
}
