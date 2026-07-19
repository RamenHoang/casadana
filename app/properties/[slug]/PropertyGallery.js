'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Lightbox from './Lightbox';

// most of these photos are ~3:2 landscape shots — used as the frame ratio
// until each image loads and reports its real one, so there's no layout jump
const DEFAULT_RATIO = 3 / 2;

export default function PropertyGallery({ images, alt }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [ratios, setRatios] = useState({});

  if (images.length === 0) return null;

  const isMarquee = images.length > 1;
  // duplicate the list once so translateX(-50%) loops seamlessly
  const track = isMarquee ? [...images, ...images] : images;
  // scale animation duration to image count so dwell time per photo stays roughly constant
  // (doubled from the original 24 / 3.2 baseline to halve the scroll speed)
  const duration = Math.max(48, images.length * 6.4);

  return (
    <div className="property-gallery">
      <div
        className={`property-gallery-track ${isMarquee ? 'is-marquee' : 'is-static'}`}
        style={isMarquee ? { animationDuration: `${duration}s` } : undefined}
      >
        {track.map((src, i) => {
          const ratio = ratios[src] ?? DEFAULT_RATIO;
          return (
            <button
              type="button"
              key={`${src}-${i}`}
              className="property-gallery-item"
              style={{ aspectRatio: ratio }}
              onClick={() => setOpenIndex(i % images.length)}
              aria-label={`Open photo ${(i % images.length) + 1}`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes={`${Math.round(ratio * 100)}vh`}
                quality={60}
                loading="lazy"
                onLoad={(e) => {
                  const { naturalWidth: w, naturalHeight: h } = e.target;
                  if (h > 0 && ratios[src] === undefined) {
                    setRatios((prev) => ({ ...prev, [src]: w / h }));
                  }
                }}
              />
            </button>
          );
        })}
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
