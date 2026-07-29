'use client';

import { useState } from 'react';
import { Link2, ArrowRight, X } from 'lucide-react';
import styles from './UrlInput.module.css';

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
        setUrl(text);
        setValidationError('');
      }
    } catch (err) {
      console.warn('Clipboard paste failed:', err);
    }
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
        />

        {url && !isLoading && (
          <button type="button" onClick={handleClear} className={styles.clearBtn} aria-label="Clear input">
            <X size={16} />
          </button>
        )}

        {!url && !isLoading && (
          <button type="button" onClick={handlePaste} className={styles.pasteBtn}>
            Paste
          </button>
        )}

        <button type="submit" disabled={isLoading} className="btn-primary" style={{ height: '44px' }}>
          <span>{isLoading ? 'Analyzing...' : 'Fetch Media'}</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {validationError && (
        <p className={styles.errorText}>{validationError}</p>
      )}
    </form>
  );
}
