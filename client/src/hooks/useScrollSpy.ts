import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[], offset = 80) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + offset + 1;
      let currentId = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          currentId = id;
        }
      }
      setActiveId(currentId);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [sectionIds, offset]);

  return activeId;
}
