'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import styles from './FaqSection.module.css';

const FAQS = [
  {
    question: 'Is Fetch completely free to use?',
    answer: 'Yes! Fetch is 100% free with no hidden subscriptions, daily download caps, or forced registration. You can paste and download as many videos and photo galleries as you need.',
  },
  {
    question: 'How do multi-photo ZIP downloads work?',
    answer: 'When you paste a link to a multi-photo post (such as an Instagram Carousel or Facebook album post), Fetch automatically extracts all high-resolution photos into a gallery slider and gives you a single "Download All Photos (.zip)" button.',
  },
  {
    question: 'Does Fetch work with private posts or accounts?',
    answer: 'Fetch only supports publicly accessible posts from YouTube, Facebook, Instagram, and X (Twitter). Private posts requiring login authentication are not accessible to protect platform privacy rules.',
  },
  {
    question: 'Does Fetch store or track my downloaded files?',
    answer: 'No. Fetch does not host, store, or log any extracted media files or user download history. All video and photo streams pass directly from the platform CDNs to your browser.',
  },
  {
    question: 'What video resolutions and formats are supported?',
    answer: 'Fetch extracts the highest quality source media available from the target platform, up to 4K Ultra HD (2160p) for YouTube MP4 videos and 1080p for Instagram Reels, Facebook HD videos, and X tweets.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className={styles.section}>
      <div className="eyebrow-container reveal">
        <div className="eyebrow-line" />
        <span className="eyebrow-label">Frequently Asked Questions</span>
        <div className="eyebrow-line" />
      </div>

      <h2 className={`${styles.heading} reveal`}>Got questions? We&apos;ve got answers.</h2>

      <div className={styles.accordion}>
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <SpotlightCard
              key={faq.question}
              className={`${styles.item} glass-panel ${isOpen ? styles.itemOpen : ''}`}
            >
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => toggleFaq(index)}
                className={styles.questionBtn}
                aria-expanded={isOpen}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ''}`}
                />
              </button>

              <div className={`${styles.answerWrap} ${isOpen ? styles.answerOpen : ''}`}>
                <div className={styles.answerInner}>
                  <p className={styles.answerText}>{faq.answer}</p>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
