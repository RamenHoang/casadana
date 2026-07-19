import fs from 'fs';
import path from 'path';
import { withCacheBust } from './withCacheBust';

const ALLOWED_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png']);

function readFolder(slug) {
  const dir = path.join(process.cwd(), 'public', 'assets', slug);
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return files
    .filter((f) => ALLOWED_EXT.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => withCacheBust(`/assets/${slug}/${f}`));
}

// Combines photos from every property folder into one homepage gallery —
// drop new photos into any of these folders, no code change needed.
export function getHomeGalleryImages() {
  return ['le-dinh-duong', 'nguyen-thong-1', 'nguyen-thong-2'].flatMap(readFolder);
}
