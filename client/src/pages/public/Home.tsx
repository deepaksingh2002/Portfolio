import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../../Components/public/HeroSection';
import MarqueeSection from '../../Components/public/MarqueeSection';
import AboutSection from '../../Components/public/AboutSection';
import ProjectsSection from '../../Components/public/ProjectsSection';
import ExperienceSection from '../../Components/public/ExperienceSection';
import ContactSection from '../../Components/public/ContactSection';
import { motion } from 'framer-motion';
import Navbar from '../../Components/public/Navbar';
import Footer from '../../Components/public/Footer';
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
