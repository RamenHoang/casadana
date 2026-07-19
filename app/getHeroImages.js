import fs from 'fs';
import path from 'path';
import { withCacheBust } from './withCacheBust';

const ALLOWED_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png']);

// Reads public/assets/hero/ at build time — drop new photos in the folder, no code change needed.
export function getHeroImages() {
  const dir = path.join(process.cwd(), 'public', 'assets', 'hero');
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [withCacheBust('/assets/hero-exterior.jpg')];
  }
  const images = files
    .filter((f) => ALLOWED_EXT.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => withCacheBust(`/assets/hero/${f}`));
  return images.length > 0 ? images : [withCacheBust('/assets/hero-exterior.jpg')];
}
