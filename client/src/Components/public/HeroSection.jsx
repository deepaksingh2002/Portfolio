import React from 'react';

export const HeroSection = () => {
  return (
    <>
      <div className="hero-orb orb1"></div>
      <div className="hero-orb orb2"></div>

      <div className="available-badge" style={{ opacity: 0, animation: 'fadeIn 0.8s 0.1s forwards' }}>
        <span className="badge-dot"></span>
        Available for opportunities
      </div>

      <p className="hero-eyebrow">Full-Stack Developer &amp; UI Engineer</p>
      <h1 className="hero-title">
        Building<br/>
        <span>Digital</span><br/>
        <span className="outline">Experiences</span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-desc">
          I craft <strong>fast, scalable, and beautiful</strong> web applications —
          from pixel-perfect frontends to resilient backend systems.
          Based in <span style={{ color: 'var(--accent2)' }}>India</span>, working globally.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">4<span>+</span></div>
            <div className="stat-label">Years exp.</div>
          </div>
          <div className="stat">
            <div className="stat-num">30<span>+</span></div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat">
            <div className="stat-num">15<span>+</span></div>
            <div className="stat-label">Clients</div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">Scroll</div>
    </>
  );
};

export default HeroSection;