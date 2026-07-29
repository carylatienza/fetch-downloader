'use client';

import { useEffect } from 'react';
import styles from './CursorSpotlight.module.css';

export default function CursorSpotlight() {
  useEffect(() => {
    let animationFrameId;

    const handlePointerMove = (e) => {
      const { clientX, clientY } = e;
      animationFrameId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div className={styles.spotlightBackdrop} aria-hidden="true" />;
}
