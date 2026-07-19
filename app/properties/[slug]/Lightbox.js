'use client';

import { useEffect, useRef, useState } from 'react';

export default function Lightbox({ images, index, alt, onClose, onIndexChange }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragState = useRef(null);

  const count = images.length;

  const goTo = (i) => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    onIndexChange(((i % count) + count) % count);
  };
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && count > 1) prev();
      else if (e.key === 'ArrowRight' && count > 1) next();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index, count]);

  const zoomIn = () => setZoom((z) => Math.min(4, +(z + 0.5).toFixed(2)));
  const zoomOut = () =>
    setZoom((z) => {
      const nz = Math.max(1, +(z - 0.5).toFixed(2));
      if (nz === 1) setPan({ x: 0, y: 0 });
      return nz;
    });

  const onPointerDown = (e) => {
    if (zoom <= 1) return;
    dragState.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragState.current) return;
    const { startX, startY, panX, panY } = dragState.current;
    setPan({ x: panX + (e.clientX - startX), y: panY + (e.clientY - startY) });
  };
  const onPointerUp = () => { dragState.current = null; };

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-toolbar" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox-count">{index + 1} / {count}</span>
        <button type="button" onClick={zoomOut} aria-label="Zoom out">−</button>
        <button type="button" onClick={zoomIn} aria-label="Zoom in">+</button>
        <button type="button" onClick={onClose} aria-label="Close">✕</button>
      </div>

      {count > 1 && (
        <button
          type="button"
          className="lightbox-nav lightbox-prev"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous photo"
        >
          ‹
        </button>
      )}

      <div
        className="lightbox-stage"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <img
          src={images[index]}
          alt={alt}
          draggable={false}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            cursor: zoom > 1 ? 'grab' : 'default',
          }}
        />
      </div>

      {count > 1 && (
        <button
          type="button"
          className="lightbox-nav lightbox-next"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next photo"
        >
          ›
        </button>
      )}
    </div>
  );
}
