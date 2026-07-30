'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header';
import UrlInput from '@/components/UrlInput/UrlInput';
import PlatformBadges from '@/components/PlatformBadges/PlatformBadges';
import PreviewCard from '@/components/PreviewCard/PreviewCard';
import PlatformMatrix from '@/components/PlatformMatrix/PlatformMatrix';
import ComparisonTable from '@/components/ComparisonTable/ComparisonTable';
import FaqSection from '@/components/FaqSection/FaqSection';
import Footer from '@/components/Footer/Footer';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import { Shield, Sparkles, Layers, Link as LinkIcon, Search, Download } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const [extractedData, setExtractedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('');

  const handleExtract = async (url) => {
    setIsLoading(true);
    setError(null);
    setExtractedData(null);
    setCurrentUrl(url);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract media details.');
      }

      setExtractedData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setExtractedData(null);
    setError(null);
    setCurrentUrl('');
  };

  return (
    <>
      <Header />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroInner}>
            <div className={`${styles.featureBadge} reveal`}>
              <Sparkles size={12} className={styles.badgeSparkle} />
              <span>100% Free · No Ads · Multi-Photo ZIP Download</span>
            </div>

            <h1 className={`${styles.title} text-gradient-ice reveal reveal-delay-1`}>Fetch</h1>

            <p className={`${styles.subheadline} reveal reveal-delay-2`}>
              Grab videos and images from YouTube, Facebook, Instagram, and X in maximum quality. No ads, no sign-ups — just paste and download.
            </p>

            <div className={`${styles.inputArea} reveal reveal-delay-3`}>
              <UrlInput
                onExtract={handleExtract}
                isLoading={isLoading}
                externalUrl={currentUrl}
              />

              {!extractedData && (
                <PlatformBadges onSelectSample={handleExtract} />
              )}
            </div>

            {error && (
              <div className="error-banner reveal">
                <span>{error}</span>
                <button onClick={handleReset} className="error-reset-btn">
                  Try another link
                </button>
              </div>
            )}

            {extractedData && (
              <div className="reveal">
                <PreviewCard data={extractedData} onReset={handleReset} />
              </div>
            )}
          </div>
        </section>

        {/* How It Works */}
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
            <SpotlightCard className={`${styles.bentoHero} glass-panel reveal reveal-delay-1`}>
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
            </SpotlightCard>

            <SpotlightCard className={`${styles.bentoCard} glass-panel reveal reveal-delay-2`}>
              <div className={styles.bentoInner}>
                <div className={styles.featureIcon}>
                  <Sparkles size={24} strokeWidth={1.5} />
                </div>
                <h3 className={styles.featureTitle}>Best quality source</h3>
                <p className={styles.featureDesc}>
                  We extract the original source file at highest resolution. No silent compression.
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard className={`${styles.bentoCard} glass-panel reveal reveal-delay-3`}>
              <div className={styles.bentoInner}>
                <div className={styles.featureIcon}>
                  <Layers size={24} strokeWidth={1.5} />
                </div>
                <h3 className={styles.featureTitle}>All-in-one experience</h3>
                <p className={styles.featureDesc}>
                  YouTube, Facebook, Instagram, X — all from one input. No more juggling different sites.
                </p>
              </div>
            </SpotlightCard>
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
