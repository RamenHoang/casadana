'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import {
  UI,
  messengerUrl,
  roomsData,
  spacesData,
  propertiesData,
  nearbyData,
  pick,
} from './content';

export default function Home() {
  const [lang, setLang] = useState('en');
  const [scrolled, setScrolled] = useState(false);
  const heroImgRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let rafId;
    const tick = (now) => {
      const el = heroImgRef.current;
      if (el) {
        if (reduceMotion) {
          el.style.transform = 'scale(1)';
        } else {
          const t = (now - start) / 1000;
          const scale = 1.05 + 0.045 * Math.sin(t / 9);
          const parallax = Math.min(window.scrollY * 0.12, 70);
          el.style.transform = `scale(${scale}) translateY(${parallax}px)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const t = UI[lang];
  const rooms = roomsData.map((r) => ({ img: r.img, name: pick(r.name, lang), tagline: pick(r.tagline, lang), text: pick(r.text, lang) }));
  const spaces = spacesData.map((s) => ({ img: s.img, name: pick(s.name, lang), text: pick(s.text, lang) }));
  const properties = propertiesData.map((p) => ({ slug: p.slug, img: p.img, name: p.name, addr: p.addr, tag: pick(p.tag, lang) }));
  const nearby = nearbyData.map((n) => ({ img: n.img, name: pick(n.name, lang), dist: pick(n.dist, lang) }));

  return (
    <>
      {/* ============ NAV ============ */}
      <div className={`nav${scrolled ? ' nav-scrolled' : ''}`}>
        <span className="nav-logo">CASADANA</span>
        <div className="nav-links">
          <a href="#about">{t.navAbout}</a>
          <a href="#rooms">{t.navRooms}</a>
          <a href="#stays">{t.navStays}</a>
          <a href="#gallery">{t.navGallery}</a>
          <a href="#location">{t.navLocation}</a>
        </div>
        <div className="nav-right">
          <div className="lang-toggle">
            <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
            <button type="button" className={lang === 'vi' ? 'active' : ''} onClick={() => setLang('vi')}>VI</button>
          </div>
          <a className="book-link" href={messengerUrl} target="_blank" rel="noreferrer">{t.book}</a>
        </div>
      </div>

      {/* ============ HERO ============ */}
      <div className="container hero-copy">
        <span className="hero-tagline">{t.heroTagline}</span>
        <h1 className="hero-title">Casadana<br />Homestay</h1>
        <div className="hero-row">
          <p className="hero-sub">{t.heroSub}</p>
          <a className="btn-dark" href={messengerUrl} target="_blank" rel="noreferrer">{t.bookHero}</a>
        </div>
      </div>
      <div className="hero-media">
        <img ref={heroImgRef} src="/assets/hero-exterior.jpg" alt="Casadana homestay exterior" style={{ transform: 'scale(1.05)' }} />
      </div>

      {/* ============ AMENITIES ============ */}
      <div className="amenities">
        <div className="amenity">
          <span className="amenity-title">{t.amenity1Title}</span>
          <span className="amenity-sub">{t.amenity1Sub}</span>
        </div>
        <div className="amenity">
          <span className="amenity-title">{t.amenity2Title}</span>
          <span className="amenity-sub">{t.amenity2Sub}</span>
        </div>
        <div className="amenity">
          <span className="amenity-title">{t.amenity3Title}</span>
          <span className="amenity-sub">{t.amenity3Sub}</span>
        </div>
        <div className="amenity">
          <span className="amenity-title">{t.amenity4Title}</span>
          <span className="amenity-sub">{t.amenity4Sub}</span>
        </div>
      </div>

      {/* ============ ABOUT ============ */}
      <Reveal id="about" className="container section-border">
        <div className="about-row">
          <div className="about-left">
            <span>{t.helloWeAre}</span>
            <h2>Casadana</h2>
          </div>
          <div className="about-right">
            <p>{t.aboutPara}</p>
          </div>
        </div>
      </Reveal>

      {/* ============ ROOMS ============ */}
      <div id="rooms" className="container">
        {rooms.map((room, i) => (
          <Reveal key={room.name} delay={0}>
            <div className="room-block">
              <div className="room-info">
                <span>{room.tagline}</span>
                <h3>{room.name}</h3>
              </div>
              <div className="room-text">
                <p>{room.text}</p>
              </div>
            </div>
            <div className="room-media">
              <img src={room.img} alt={room.name} />
            </div>
          </Reveal>
        ))}
      </div>

      {/* ============ SPACES ============ */}
      <div className="spaces container">
        {spaces.map((sp, i) => (
          <Reveal key={sp.name} delay={i * 0.12} className="space">
            <div className="space-media">
              <img src={sp.img} alt={sp.name} />
            </div>
            <div className="space-body">
              <h4>{sp.name}</h4>
              <p>{sp.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ============ PROPERTIES ============ */}
      <div id="stays" className="container section-border" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <h2 className="section-heading">{t.propertiesHeading}</h2>
        {properties.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1}>
            <Link href={`/properties/${p.slug}`} className="property-row" style={{ textDecoration: 'none' }}>
              <span className="property-index">{i}</span>
              <div className="property-media">
                <img src={p.img} alt={p.name} />
              </div>
              <div className="property-info">
                <h4>{p.name}</h4>
                <span>{p.addr}</span>
              </div>
              <span className="property-tag">{p.tag}</span>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* ============ GALLERY ============ */}
      <div id="gallery" className="container" style={{ paddingBottom: 64 }}>
        <h2 className="section-heading">{t.galleryHeading}</h2>
        <div className="gallery-grid">
          <Reveal delay={0} style={{ gridRow: '1 / 3' }}><img src="/assets/living-main.jpg" alt="Casadana" /></Reveal>
          <Reveal delay={0.08}><img src="/assets/gal-1.jpg" alt="Casadana" /></Reveal>
          <Reveal delay={0.16}><img src="/assets/gal-6.jpg" alt="Casadana" /></Reveal>
          <Reveal delay={0.24}><img src="/assets/gal-8.jpg" alt="Casadana" /></Reveal>
          <Reveal delay={0.32}><img src="/assets/gal-4.jpg" alt="Casadana" /></Reveal>
        </div>
      </div>

      {/* ============ LOCATION ============ */}
      <div id="location" className="container" style={{ paddingBottom: 64 }}>
        <h2 className="section-heading" style={{ marginBottom: 8 }}>{t.locationHeading}</h2>
        <p className="hero-sub" style={{ border: 'none', padding: 0, marginBottom: 32 }}>{t.locationSub}</p>
        <div className="location-row">
          {nearby.map((n, i) => (
            <Reveal key={n.name} delay={i * 0.1} className="location-card">
              <div className="location-media">
                <img src={n.img} alt={n.name} />
              </div>
              <h4>{n.name}</h4>
              <span>{n.dist}</span>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ============ FOOTER ============ */}
      <div className="footer">
        <div>
          <span className="footer-tagline">{t.footerTagline}</span>
          <p>097 501 0000 · casadana.home@gmail.com · @casadana.home</p>
        </div>
        <a className="btn-cream" href={messengerUrl} target="_blank" rel="noreferrer">{t.footerCta}</a>
      </div>
    </>
  );
}
