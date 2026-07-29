'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

const FAQS = [
  {
    category: 'General',
    items: [
      {
        q: 'What is Fetch?',
        a: 'Fetch is a free, web-based tool that lets you download videos and images from major social media platforms. Just paste a URL and download the media at the best available quality.',
      },
      {
        q: 'Is Fetch free?',
        a: 'Yes, completely free. No hidden costs, no premium tiers, no ads.',
      },
      {
        q: 'Do I need to create an account?',
        a: 'No. Fetch doesn’t require any registration or sign-up. Just visit the site and start downloading.',
      },
      {
        q: 'Is Fetch safe to use?',
        a: 'Yes. Fetch doesn’t install anything on your device, doesn’t run background scripts, and doesn’t store any personal data. What you download is what you get — just the media file.',
      },
    ],
  },
  {
    category: 'Platforms & Media',
    items: [
      {
        q: 'Which platforms does Fetch support?',
        a: 'Fetch currently supports YouTube, Facebook, Instagram, and X (formerly Twitter).',
      },
      {
        q: 'Can I download Instagram Stories or Reels?',
        a: 'Yes! Reels and public Instagram posts and stories are supported.',
      },
      {
        q: 'Can I download private or restricted content?',
        a: 'No. Fetch can only access content that is publicly available. Private or restricted posts cannot be extracted.',
      },
    ],
  },
  {
    category: 'Technical & Quality',
    items: [
      {
        q: 'What quality will I get?',
        a: 'Fetch automatically selects and downloads the highest available quality — up to 4K (2160p) for YouTube videos and original resolution for photos.',
      },
      {
        q: 'What file formats are downloaded?',
        a: 'Videos download as MP4 files. Images download as JPG or PNG depending on the original source.',
      },
      {
        q: 'Is there a file size limit?',
        a: 'Downloads are capped at 2GB per file. Most social media videos are well under this limit.',
      },
    ],
  },
];

function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.questionBtn}>
        <span>{question}</span>
        <ChevronDown className={styles.chevron} size={18} />
      </button>
      {isOpen && (
        <div className={styles.answerBox}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="eyebrow-container">
          <div className="eyebrow-line" />
          <span className="eyebrow-label">FAQ</span>
          <div className="eyebrow-line" />
        </div>

        <h1 className={styles.headline}>Everything you need to know.</h1>
        <p className={styles.subtext}>Quick answers to common questions about Fetch.</p>

        <div className={styles.sectionsWrapper}>
          {FAQS.map((sec) => (
            <div key={sec.category} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>{sec.category}</h2>
              <div className="glass-panel" style={{ padding: '8px 24px' }}>
                {sec.items.map((item) => (
                  <AccordionItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <section className={styles.ctaBox}>
          <div className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
            <h2 className={styles.ctaTitle}>Have more questions?</h2>
            <p style={{ color: 'var(--color-fog-veil)', marginTop: '8px' }}>Start using Fetch right now — it takes 5 seconds.</p>
            <Link href="/" className="btn-primary" style={{ marginTop: '20px', fontSize: '15px' }}>
              <span>Start Downloading</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
