'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Lightbox from './Lightbox';

export default function PropertyGallery({ images, alt }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (images.length === 0) return null;

  const isMarquee = images.length > 1;
  // duplicate the list once so translateX(-50%) loops seamlessly
  const track = isMarquee ? [...images, ...images] : images;
  // scale animation duration to image count so dwell time per photo stays roughly constant
  const duration = Math.max(24, images.length * 3.2);

  return (
    <div className="property-gallery">
      <div
        className={`property-gallery-track ${isMarquee ? 'is-marquee' : 'is-static'}`}
        style={isMarquee ? { animationDuration: `${duration}s` } : undefined}
      >
        {track.map((src, i) => (
          <button
            type="button"
            key={`${src}-${i}`}
            className="property-gallery-item"
            onClick={() => setOpenIndex(i % images.length)}
            aria-label={`Open photo ${(i % images.length) + 1}`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 560px) 260px, (max-width: 900px) 280px, 320px"
              quality={60}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && createPortal(
        <Lightbox
          images={images}
          index={openIndex}
          alt={alt}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />,
        document.body
      )}
    </div>
  );
}
