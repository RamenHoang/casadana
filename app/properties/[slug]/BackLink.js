'use client';

import { useRouter } from 'next/navigation';

// Uses browser history back (not a fresh push to "/") so Next.js restores
// the scroll position the user was at on the home page, instead of jumping to the top.
export default function BackLink({ children, style }) {
  const router = useRouter();

  const handleClick = (e) => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <a href="/" onClick={handleClick} style={style}>
      {children}
    </a>
  );
}
