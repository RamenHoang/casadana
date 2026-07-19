import fs from 'fs';
import path from 'path';

const ALLOWED_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png']);

// Reads public/assets/<slug>/ at build time so new photos just need to be
// dropped in the folder — no code change required. Falls back to a single
// image (or none) when the slug has no photo folder yet.
export function getGalleryImages(slug, fallbackImg) {
  const dir = path.join(process.cwd(), 'public', 'assets', slug);
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return fallbackImg ? [fallbackImg] : [];
  }
  const images = files
    .filter((f) => ALLOWED_EXT.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => `/assets/${slug}/${f}`);
  return images.length > 0 ? images : (fallbackImg ? [fallbackImg] : []);
}
