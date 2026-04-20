import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../../Components/sections/HeroSection';
import MarqueeSection from '../../Components/sections/MarqueeSection';
import AboutSection from '../../Components/sections/AboutSection';
import ProjectsSection from '../../Components/sections/ProjectsSection';
import ExperienceSection from '../../Components/sections/ExperienceSection';
import ContactSection from '../../Components/sections/ContactSection';
import { motion } from 'framer-motion';

const Navbar = () => {
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
      <a href="#hero" className="nav-logo">// yourname.dev</a>
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

const Footer = () => {
  return (
    <footer>
      <p className="footer-copy">
        Designed &amp; Built by <span>Your Name</span> — 2025
      </p>
      <a href="#hero" className="footer-back">Back to top ↑</a>
    </footer>
  );
};

export const Home: React.FC = () => {
  useEffect(() => {
    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { 
          e.target.classList.add('visible'); 
          io.unobserve(e.target); 
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => io.observe(el));
  }, []);

  return (
    <>
      <Helmet>
        <title>Dev Portfolio — Your Name</title>
        <meta name="description" content="Full-stack developer portfolio" />
      </Helmet>

      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <section id="hero"><HeroSection /></section>
        <section id="marquee"><MarqueeSection /></section>
        <section id="about"><AboutSection /></section>
        <section id="projects"><ProjectsSection /></section>
        <section id="experience"><ExperienceSection /></section>
        <section id="contact"><ContactSection /></section>
      </motion.main>

      <Footer />
    </>
  );
};

export default Home;
