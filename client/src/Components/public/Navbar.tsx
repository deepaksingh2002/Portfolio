import React, { useEffect } from 'react';

export const Navbar: React.FC = () => {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="navbar">
      <a href="#hero" className="nav-logo">// deepaksingh.dev</a>
      <ul className="nav-links">
        <li><a href="#about" data-num="01">About</a></li>
        <li><a href="#projects" data-num="02">Projects</a></li>
        <li><a href="#experience" data-num="03">Experience</a></li>
        <li><a href="#contact" data-num="04">Contact</a></li>
      </ul>
      <a href="#" className="nav-cta">Resume ↗</a>
    </nav>
  );
};

export default Navbar;
