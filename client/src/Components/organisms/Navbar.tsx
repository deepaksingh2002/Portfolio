
import React from 'react';

/**
 * Props for Navbar component.
 */
export interface NavbarProps {
  sections: { id: string; label: string }[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

/**
 * Sticky, responsive navbar with blur and active highlight.
 */

export const Navbar: React.FC = () => {
  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[60px] py-[20px] backdrop-blur-[12px] bg-[rgba(2,3,5,0.7)] border-b border-border transition-all duration-300"
      aria-label="Main navigation"
    >
      <a href="#hero" className="font-mono text-[14px] text-accent tracking-[0.1em] no-underline nav-logo">Deepak</a>
      <ul className="flex gap-[36px] list-none nav-links">
        <li><a href="#about" data-num="01" className="font-mono text-[12px] text-muted no-underline tracking-[0.1em] uppercase relative transition-colors duration-200 before:content-[attr(data-num)] before:text-accent before:mr-[6px] before:text-[10px] hover:text-white">About</a></li>
        <li><a href="#projects" data-num="02" className="font-mono text-[12px] text-muted no-underline tracking-[0.1em] uppercase relative transition-colors duration-200 before:content-[attr(data-num)] before:text-accent before:mr-[6px] before:text-[10px] hover:text-white">Projects</a></li>
        <li><a href="#experience" data-num="03" className="font-mono text-[12px] text-muted no-underline tracking-[0.1em] uppercase relative transition-colors duration-200 before:content-[attr(data-num)] before:text-accent before:mr-[6px] before:text-[10px] hover:text-white">Experience</a></li>
        <li><a href="#contact" data-num="04" className="font-mono text-[12px] text-muted no-underline tracking-[0.1em] uppercase relative transition-colors duration-200 before:content-[attr(data-num)] before:text-accent before:mr-[6px] before:text-[10px] hover:text-white">Contact</a></li>
      </ul>
      <a href="#" className="font-mono text-[12px] px-[20px] py-[8px] border border-accent text-accent bg-transparent no-underline tracking-[0.1em] uppercase nav-cta transition-colors duration-200 hover:bg-[rgba(100,255,218,0.1)]">Resume ↗</a>
    </nav>
  );
};
