'use client';

import { useState } from 'react';
import { Link2, ArrowRight, X, Sparkles, Youtube, Instagram, Facebook } from 'lucide-react';
import styles from './UrlInput.module.css';

const SAMPLE_LINKS = [
  {
    label: 'YouTube Video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    icon: Youtube,
    color: '#FF0000',
  },
  {
    label: 'Instagram Gallery',
    url: 'https://www.instagram.com/p/C-sample123/',
    icon: Instagram,
    color: '#E4405F',
  },
  {
    label: 'Facebook Post',
    url: 'https://www.facebook.com/prince.ashrin.yxie.mendoza.2024',
    icon: Facebook,
    color: '#1877F2',
  },
];

export default function UrlInput({ onSubmit, isLoading, initialValue = '' }) {
  const [url, setUrl] = useState(initialValue);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    const trimmed = url.trim();
    if (!trimmed) {
      setValidationError('Please enter a media URL');
      return;
    }

    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        throw new Error();
      }
    } catch {
      setValidationError('Please enter a valid URL (e.g. https://youtube.com/watch?v=...)');
      return;
    }

    onSubmit(trimmed);
  };

  const handleClear = () => {
    setUrl('');
    setValidationError('');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setValidationError('');
      }
    } catch (err) {
      console.warn('Clipboard paste failed:', err);
    }
  };

  const handleSampleClick = (sampleUrl) => {
    setUrl(sampleUrl);
    setValidationError('');
    onSubmit(sampleUrl);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={`${styles.inputWrapper} ${validationError ? styles.hasError : ''}`}>
        <div className={styles.iconPrefix}>
          <Link2 size={20} />
        </div>

        <input
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (validationError) setValidationError('');
          }}
          placeholder="Paste a video or image URL..."
          className={styles.input}
          disabled={isLoading}
          autoComplete="off"
          spellCheck="false"
          suppressHydrationWarning
        />

        {url && !isLoading && (
          <button type="button" onClick={handleClear} className={styles.clearBtn} aria-label="Clear input" suppressHydrationWarning>
            <X size={16} />
          </button>
        )}

        {!url && !isLoading && (
          <button type="button" onClick={handlePaste} className={styles.pasteBtn} suppressHydrationWarning>
            Paste
          </button>
        )}

        <button type="submit" disabled={isLoading} className="btn-primary" style={{ height: '44px', flexShrink: 0 }} suppressHydrationWarning>
          <span>{isLoading ? 'Analyzing...' : 'Fetch Media'}</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {validationError && (
        <p className={styles.errorText}>{validationError}</p>
      )}

      {/* Interactive Quick-Fill Sample Chips */}
      <div className={styles.samplesRow}>
        <span className={styles.samplesLabel}>
          <Sparkles size={13} />
          <span>Try a sample:</span>
        </span>
        <div className={styles.samplesGroup}>
          {SAMPLE_LINKS.map(({ label, url: sampleUrl, icon: Icon, color }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleSampleClick(sampleUrl)}
              className={styles.sampleChip}
              disabled={isLoading}
            >
              <Icon size={13} style={{ color }} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
