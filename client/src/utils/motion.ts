import { useReducedMotion } from 'framer-motion';

export function useMotionConfig() {
  const reduced = useReducedMotion();
  return {
    reduced,
    fadeUp: {
      initial: { opacity: 0, y: reduced ? 0 : 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-60px' },
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
    fadeIn: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { duration: 0.6 },
    },
    stagger: (i: number) => ({
      initial: { opacity: 0, y: reduced ? 0 : 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-40px' },
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
    }),
    cardHover: {
      whileHover: { y: reduced ? 0 : -4 },
      transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
    },
    pageEnter: {
      initial: { opacity: 0, y: reduced ? 0 : 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: reduced ? 0 : -8 },
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
  };
}

export const SPRING = { type: 'spring' as const, stiffness: 400, damping: 17 };
