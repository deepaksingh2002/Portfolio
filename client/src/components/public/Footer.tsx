import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <footer className="border-t border-border/20 px-6 md:px-[60px] py-8 flex justify-between items-center relative z-10">
      <p className="font-mono text-xs text-muted">
        Designed & Built by <span className="text-accent">Your Name</span> — 2025
      </p>
      <a href="#hero" className="font-mono text-xs text-muted hover:text-accent transition-colors no-underline">Back to top ↑</a>
      <div className="relative w-6 h-6 flex items-center justify-center">
        <span
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => navigate('/admin/login')}
          className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 block ${hovered ? 'bg-accent opacity-40 shadow-[0_0_8px_rgba(100,255,218,0.5)]' : 'bg-transparent opacity-0'}`}
          title=""
        />
      </div>
    </footer>
  );
}
