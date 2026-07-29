import React from 'react';

/**
 * YouTube Solid Full-Color Brand Logo
 * Solid #FF0000 red rounded rectangle badge with solid white play triangle.
 */
export function YouTubeLogo({ size = 24, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="6" fill="#FF0000" />
      <path d="M9.5 7.5L16.5 12L9.5 16.5V7.5Z" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Instagram Solid Full-Color Brand Logo
 * Official 5-color vibrant gradient badge with solid white camera lens & dot.
 */
export function InstagramLogo({ size = 24, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="igGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#igGradient)" />
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
      <circle cx="15.8" cy="8.2" r="1.1" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Facebook Solid Full-Color Brand Logo
 * Solid #1877F2 blue circle badge with solid white bold 'f'.
 */
export function FacebookLogo({ size = 24, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="12" fill="#1877F2" />
      <path
        d="M15.5 12.5H13.2V20H10.1V12.5H8.5V9.8H10.1V8.1C10.1 6.6 11 5 13.5 5H15.6V7.7H14.1C13.4 7.7 13.2 8.1 13.2 8.6V9.8H15.8L15.5 12.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * X (Twitter) Solid Full-Color Brand Logo
 * Solid dark badge (#000000) with official solid white X vector logo.
 */
export function XLogo({ size = 24, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="6" fill="#000000" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <path
        d="M16.99 5H19.58L13.93 11.46L20.58 20H15.36L11.27 14.66L6.59 20H4L10.04 13.1L3.71 5H9.06L12.75 9.87L16.99 5ZM16.08 18.45H17.51L8.58 6.47H7.04L16.08 18.45Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
