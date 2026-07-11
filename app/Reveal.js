'use client';

import { useEffect, useRef, useState } from 'react';

// Wraps children in a div that fades/slides in the first time it scrolls into view.
// delay (seconds) staggers a group of siblings (e.g. cards in a grid).
export default function Reveal({ children, delay = 0, className = '', style = {}, id }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`reveal ${visible ? 'in' : ''} ${className}`}
      style={{ '--d': `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}
