import React from 'react';

export const AboutSection = () => {
  return (
    <>
      <div className="section-header reveal">
        <span className="section-num">01 /</span>
        <h2 className="section-title">About<br/><span className="dim">Me</span></h2>
        <div className="section-line"></div>
      </div>

      <div className="about-grid">
        <div className="about-text reveal">
          <p>
            Hey, I'm <span className="highlight">Your Name</span> — a full-stack developer with
            <span className="accent">4+ years</span> of experience building web applications that
            balance technical performance with thoughtful UX.
          </p>
          <p>
            I specialize in the <span className="highlight">React / Node.js ecosystem</span>,
            and I love working at the intersection of design and engineering —
            writing clean, scalable code that also looks and feels great.
          </p>
          <p>
            When I'm not coding, I contribute to open-source projects, write
            technical articles, and obsess over typography.
          </p>
          <div className="about-actions">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#" className="btn-outline">Download CV</a>
          </div>
        </div>

        <div className="skills-container reveal reveal-delay-2">
          <div className="skill-category">
            <div className="skill-cat-label">Frontend</div>
            <div className="skill-tags">
              <span className="tag">React</span>
              <span className="tag">Next.js</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Tailwind CSS</span>
              <span className="tag">Framer Motion</span>
              <span className="tag">Vue.js</span>
            </div>
          </div>
          <div className="skill-category">
            <div className="skill-cat-label">Backend</div>
            <div className="skill-tags">
              <span className="tag">Node.js</span>
              <span className="tag">Express</span>
              <span className="tag">GraphQL</span>
              <span className="tag">REST APIs</span>
              <span className="tag">Python</span>
              <span className="tag">FastAPI</span>
            </div>
          </div>
          <div className="skill-category">
            <div className="skill-cat-label">Database &amp; DevOps</div>
            <div className="skill-tags">
              <span className="tag">PostgreSQL</span>
              <span className="tag">MongoDB</span>
              <span className="tag">Redis</span>
              <span className="tag">Docker</span>
              <span className="tag">AWS</span>
              <span className="tag">CI/CD</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
