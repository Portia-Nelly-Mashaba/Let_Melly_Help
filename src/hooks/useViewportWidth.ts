import { useEffect, useState } from 'react';

export function useViewportWidth(): number {
  const [w, setW] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024,
  );
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return w;
}
