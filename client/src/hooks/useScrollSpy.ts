import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setActiveSection, setScrolled } from '../store/slices/uiSlice';

export function useScrollSpy(sectionIds: string[]) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => {
      dispatch(setScrolled(window.scrollY > 80));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(setActiveSection(entry.target.id));
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, sectionIds]);
}
