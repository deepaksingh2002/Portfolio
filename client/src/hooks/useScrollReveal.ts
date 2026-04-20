import { useEffect } from 'react';

export function useScrollReveal(
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('revealed');
        observer.disconnect();
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, options]);
}
