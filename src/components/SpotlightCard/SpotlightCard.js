'use client';

import { useRef, useState } from 'react';
import styles from './SpotlightCard.module.css';

export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(124, 106, 239, 0.28)', ...props }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--card-x', `${x}px`);
    cardRef.current.style.setProperty('--card-y', `${y}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.spotlightCard} ${isHovered ? styles.hovered : ''} ${className}`}
      style={{ '--spotlight-color': spotlightColor }}
      {...props}
    >
      <div className={styles.spotlightOverlay} aria-hidden="true" />
      <div className={styles.borderHighlight} aria-hidden="true" />
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}
      <div className={styles.spotlightOverlay} aria-hidden="true" />
      <div className={styles.cardContent}>{children}</div>
    </div >
  );
}
