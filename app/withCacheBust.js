import fs from 'fs';
import path from 'path';

// /assets/* is served with a 1-year immutable Cache-Control header, so a
// photo replaced in place (same filename, new content) would stay stale in
// visitors' browsers. Appending the file's mtime as a query string changes
// the URL whenever the file changes, without needing a rename.
export function withCacheBust(urlPath) {
  const fsPath = path.join(process.cwd(), 'public', urlPath);
  try {
    const mtime = Math.round(fs.statSync(fsPath).mtimeMs);
    return `${urlPath}?v=${mtime}`;
  } catch {
    return urlPath;
  }
}
