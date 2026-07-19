'use client';

import { useEffect, useState } from 'react';

// full-page loading layer: covers the viewport until the window's `load`
// event fires (all images/fonts/scripts settled), then fades out and
// unmounts so it never affects hit-testing or a11y once gone
export default function Preloader() {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const finish = () => setLoaded(true);
    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish);
    }
    return () => window.removeEventListener('load', finish);
  }, []);

  useEffect(() => {
    document.body.style.overflow = hidden ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [hidden]);

  useEffect(() => {
    if (!loaded) return undefined;
    const id = setTimeout(() => setHidden(true), 600);
    return () => clearTimeout(id);
  }, [loaded]);

  if (hidden) return null;

  return (
    <div className={`preloader${loaded ? ' preloader-done' : ''}`} aria-hidden="true">
      <span className="preloader-logo">CASADANA</span>
    </div>
  );
}
