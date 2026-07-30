'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollObserverProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, {
      threshold: 0.05,
      rootMargin: '100px 0px 100px 0px',
    });

    const observeElement = (el) => {
      if (el.classList.contains('visible')) return;

      // Instant viewport check
      const rect = el.getBoundingClientRect();
      if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 100) {
        el.classList.add('visible');
      } else {
        intersectionObserver.observe(el);
      }
    };

    const scanAndObserve = () => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach(observeElement);
    };

    // Initial scan
    scanAndObserve();

    // Secondary scan after short tick to catch hydrated React elements
    const timer = setTimeout(scanAndObserve, 150);

    // Watch for dynamic DOM additions / React re-renders
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldScan = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          shouldScan = true;
          break;
        }
      }
      if (shouldScan) {
        scanAndObserve();
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      mutationObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
