import { useEffect, useState } from 'react';

export function useTypingEffect(strings: string[], speed = 100) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const current = strings[index % strings.length];

    if (!isDeleting && display.length < current.length) {
      timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), speed);
    } else if (isDeleting && display.length > 0) {
      timeout = setTimeout(() => setDisplay(current.slice(0, display.length - 1)), speed / 2);
    } else if (!isDeleting && display.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && display.length === 0) {
      setIsDeleting(false);
      setIndex((i) => (i + 1) % strings.length);
    }
    return () => clearTimeout(timeout);
  }, [display, isDeleting, index, strings, speed]);

  return display;
}
