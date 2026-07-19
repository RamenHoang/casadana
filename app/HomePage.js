'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import Nav from './Nav';
import { useLang } from './LangContext';
import PropertyGallery from './properties/[slug]/PropertyGallery';
import {
  UI,
  messengerUrl,
  roomsData,
  spacesData,
  propertiesData,
  nearbyData,
  pick,
} from './content';

const HERO_SLIDE_MS = 5000;

export default function HomePage({ heroImages, galleryImages }) {
  const { lang } = useLang();
  const [heroIndex, setHeroIndex] = useState(0);
  const heroWrapRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let rafId;
    const tick = (now) => {
      const el = heroWrapRef.current;
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

    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (heroImages.length <= 1) return undefined;
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, HERO_SLIDE_MS);
    return () => clearInterval(id);
  }, [heroImages.length]);

  const t = UI[lang];
  const rooms = roomsData.map((r) => ({ img: r.img, name: pick(r.name, lang), tagline: pick(r.tagline, lang), text: pick(r.text, lang) }));
  const spaces = spacesData.map((s) => ({ img: s.img, name: pick(s.name, lang), text: pick(s.text, lang) }));
  const properties = propertiesData.map((p) => ({ slug: p.slug, img: p.img, name: p.name, addr: p.addr, tag: pick(p.tag, lang) }));
  const nearby = nearbyData.map((n) => ({ img: n.img, name: pick(n.name, lang), dist: pick(n.dist, lang) }));

  return (
    <>
      {/* ============ NAV ============ */}
      <Nav />

      {/* ============ HERO ============ */}
      <div className="hero-section">
        <div className="hero-media">
          <div ref={heroWrapRef} className="hero-media-inner" style={{ transform: 'scale(1.05)' }}>
            {heroImages.map((src, i) => (
              <div key={src} className={`hero-slide${i === heroIndex ? ' is-active' : ''}`}>
                <img src={src} alt="Casadana homestay" loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'auto'} />
              </div>
            ))}
          </div>
        </div>
        <div className="container hero-copy">
          <span className="hero-tagline">{t.heroTagline}</span>
          <h1 className="hero-title">Casadana<br />Homestay</h1>
          <div className="hero-row">
            <p className="hero-sub">{t.heroSub}</p>
            <a className="btn-dark" href={messengerUrl} target="_blank" rel="noreferrer">{t.bookHero}</a>
          </div>
        </div>
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
              <img src={room.img} alt={room.name} loading="lazy" />
            </div>
          </Reveal>
        ))}
      </div>

      {/* ============ SPACES ============ */}
      <div className="spaces container">
        {spaces.map((sp, i) => (
          <Reveal key={sp.name} delay={i * 0.12} className="space">
            <div className="space-media">
              <img src={sp.img} alt={sp.name} loading="lazy" />
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
                <img src={p.img} alt={p.name} loading="lazy" />
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
      <div id="gallery" className="gallery-section">
        <div className="container gallery-section-heading">
          <h2 className="section-heading">{t.galleryHeading}</h2>
        </div>
        <PropertyGallery images={galleryImages} alt="Casadana homestay" />
      </div>

      {/* ============ LOCATION ============ */}
      <div id="location" className="container" style={{ paddingBottom: 64 }}>
        <h2 className="section-heading" style={{ marginBottom: 8 }}>{t.locationHeading}</h2>
        <p className="hero-sub" style={{ border: 'none', padding: 0, marginBottom: 32 }}>{t.locationSub}</p>
        <div className="location-row">
          {nearby.map((n, i) => (
            <Reveal key={n.name} delay={i * 0.1} className="location-card">
              <div className="location-media">
                <img src={n.img} alt={n.name} loading="lazy" />
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
          <div className="footer-contacts">
            <a className="footer-contact" href="tel:+84975010000">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              097 501 0000
            </a>
            <a className="footer-contact" href="mailto:casadana.home@gmail.com">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16v16H4z" opacity="0"/>
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 6-10 7L2 6"/>
              </svg>
              casadana.home@gmail.com
            </a>
            <a className="footer-contact" href="https://instagram.com/casadana.home" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              @casadana.home
            </a>
          </div>
        </div>
        <a className="btn-cream" href={messengerUrl} target="_blank" rel="noreferrer">{t.footerCta}</a>
      </div>
    </>
  );
}
