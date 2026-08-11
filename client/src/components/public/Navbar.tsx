import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleMobileMenu, closeMobileMenu } from '../../store/slices/uiSlice';

const navLinks = [
  { href: '#about', label: 'About', num: '01' },
  { href: '#projects', label: 'Projects', num: '02' },
  { href: '#experience', label: 'Experience', num: '03' },
  { href: '#contact', label: 'Contact', num: '04' },
];

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activeSection, mobileMenuOpen, isScrolled } = useAppSelector(s => s.ui);

  useEffect(() => {
    const keys: string[] = [];
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (['INPUT','TEXTAREA','SELECT'].includes(tag)) return;
      keys.push(e.key.toLowerCase());
      if (keys.length > 5) keys.shift();
      if (keys.join('') === 'admin') {
        keys.length = 0;
        navigate('/admin/login');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);

  const scrollTo = (id: string) => {
    dispatch(closeMobileMenu());
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 backdrop-blur-md bg-bg/70 border-b border-border/20 ${isScrolled ? 'py-3 px-6 md:px-[60px]' : 'py-5 px-6 md:px-[60px]'}`}>
      <a href="#hero" className="font-mono text-[13px] text-accent tracking-[0.1em] no-underline" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}>
        // yourname.dev
      </a>
      <ul className="hidden md:flex gap-9 list-none">
        {navLinks.map(link => (
          <li key={link.href}>
            <a href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className={`font-mono text-[12px] uppercase tracking-widest transition-colors ${activeSection === link.href.slice(1) ? 'text-accent border-b border-accent' : 'text-muted hover:text-white'}`}>
              <span className="text-accent mr-1.5">{link.num}</span>{link.label}
            </a>
          </li>
        ))}
      </ul>
      <a href="/resume.pdf" className="hidden md:block font-mono text-[12px] text-accent border border-accent px-5 py-2 hover:bg-accent/10 transition-colors no-underline" target="_blank" rel="noopener noreferrer">
        Resume ↗
      </a>
      <button className="md:hidden text-muted hover:text-accent" onClick={() => dispatch(toggleMobileMenu())} aria-label="Toggle menu">
        {mobileMenuOpen ? '✕' : '☰'}
      </button>
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface border-b border-border/20 py-6 px-6 flex flex-col gap-4 md:hidden">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="font-mono text-sm text-muted hover:text-accent transition-colors no-underline">
              <span className="text-accent mr-2">{link.num}</span>{link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
