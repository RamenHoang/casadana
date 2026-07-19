'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLang } from './LangContext';
import { UI, messengerUrl } from './content';

// on the home page, section links scroll in place (#about); anywhere else
// they need to go back to the home page first (/#about)
export default function Nav({ minimal = false }) {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const anchor = (id) => (isHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const t = UI[lang];

  const langToggle = (
    <div className="lang-toggle">
      <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      <button type="button" className={lang === 'vi' ? 'active' : ''} onClick={() => setLang('vi')}>VI</button>
    </div>
  );

  // property pages only need the language switch — no section links, no book button
  if (minimal) {
    return (
      <div className={`nav nav-minimal${scrolled ? ' nav-scrolled' : ''}`}>
        <Link href="/" className="nav-logo">CASADANA</Link>
        {langToggle}
      </div>
    );
  }

  return (
    <div className={`nav${scrolled ? ' nav-scrolled' : ''}`}>
      <Link href="/" className="nav-logo" onClick={() => setMenuOpen(false)}>CASADANA</Link>
      <button
        type="button"
        className="nav-toggle"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`nav-menu${menuOpen ? ' open' : ''}`}>
        <div className="nav-links">
          <a href={anchor('about')} onClick={() => setMenuOpen(false)}>{t.navAbout}</a>
          <a href={anchor('rooms')} onClick={() => setMenuOpen(false)}>{t.navRooms}</a>
          <a href={anchor('stays')} onClick={() => setMenuOpen(false)}>{t.navStays}</a>
          <a href={anchor('gallery')} onClick={() => setMenuOpen(false)}>{t.navGallery}</a>
          <a href={anchor('location')} onClick={() => setMenuOpen(false)}>{t.navLocation}</a>
        </div>
        <div className="nav-right">
          {langToggle}
          <a className="book-link" href={messengerUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>{t.book}</a>
        </div>
      </div>
    </div>
  );
}
