'use client';

import { useRef } from 'react';
import styles from './SpotlightCard.module.css';

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(140, 120, 240, 0.16)',
  ...props
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--card-x', `${x}px`);
    cardRef.current.style.setProperty('--card-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`${styles.spotlightCard} ${className}`}
      style={{ '--spotlight-color': spotlightColor }}
      {...props}
    >
      <div className={styles.spotlightOverlay} aria-hidden="true" />
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}
