import './App.css';

// Optionally, provide a global layout wrapper here if needed

import React, { useEffect } from 'react';

function App({ children }) {
  useEffect(() => {
    // Custom cursor logic
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let cx = 0, cy = 0, rx = 0, ry = 0;
    const mouseMove = (e) => {
      cx = e.clientX; cy = e.clientY;
      if (cursor) {
        cursor.style.left = cx + 'px';
        cursor.style.top = cy + 'px';
      }
    };
    document.addEventListener('mousemove', mouseMove);
    function animateRing() {
      rx += (cx - rx) * 0.12;
      ry += (cy - ry) * 0.12;
      if (ring) {
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
      }
      requestAnimationFrame(animateRing);
    }
    animateRing();
    return () => {
      document.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  return (
    <>
      <div id="cursor"></div>
      <div id="cursor-ring"></div>
      <div className="grid-bg"></div>
      {children}
    </>
  );
}

export default App;
