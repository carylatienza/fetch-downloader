'use client';

import { useState, useEffect } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import styles from './LoadingState.module.css';

const MESSAGES = [
  'Analyzing your URL...',
  'Detecting platform...',
  'Finding the best quality...',
  'Extracting media info...',
  'Almost there...',
];

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.spinnerWrapper}>
        <Loader2 className={styles.spinner} size={36} />
        <Sparkles className={styles.sparkle} size={18} />
      </div>

      <p className={styles.message}>{MESSAGES[messageIndex]}</p>
      <p className={styles.subtext}>Extracting maximum quality source media</p>
    </div>
  );
}
