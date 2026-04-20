import React from 'react';

export const ProjectsSection = () => {
  return (
    <>
      <div className="section-header reveal">
        <span className="section-num">02 /</span>
        <h2 className="section-title">Selected<br/><span className="dim">Projects</span></h2>
        <div className="section-line"></div>
      </div>

      <div className="projects-grid">
        {/* FEATURED */}
        <div className="project-card card-featured reveal">
          <div className="featured-visual">
            <span className="big-text">01</span>
            <span className="vis-label">Featured Project</span>
          </div>
          <div className="featured-content">
            <div>
              <span className="featured-tag">Featured</span>
              <div className="project-num">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>001</span>
                <span className="project-badge">Full-Stack</span>
              </div>
              <h3 className="project-title">SaaS Analytics Dashboard</h3>
              <p className="project-desc">
                A real-time analytics platform serving 10k+ users. Built with WebSockets for live data, 
                role-based access control, and custom charting engine. Reduced client reporting time by 70%.
              </p>
              <div className="project-stack">
                <span className="stack-tag">Next.js</span>
                <span className="stack-tag">TypeScript</span>
                <span className="stack-tag">Node.js</span>
                <span className="stack-tag">PostgreSQL</span>
                <span className="stack-tag">WebSockets</span>
                <span className="stack-tag">AWS</span>
              </div>
            </div>
            <div className="project-links">
              <a href="#" className="project-link">Live Demo <span className="arrow">→</span></a>
              <a href="#" className="project-link">GitHub <span className="arrow">→</span></a>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="project-card card-large reveal">
          <div className="project-img"><span className="project-img-inner">02</span></div>
          <div className="project-num">
            <span>002</span>
            <span className="project-badge">API</span>
          </div>
          <h3 className="project-title">Microservices E-Commerce Platform</h3>
          <p className="project-desc">
            Scalable backend architecture using microservices pattern. Handles 50k+ daily transactions 
            with 99.9% uptime, message queuing with RabbitMQ, and distributed caching.
          </p>
          <div className="project-stack">
            <span className="stack-tag">Node.js</span>
            <span className="stack-tag">Docker</span>
            <span className="stack-tag">RabbitMQ</span>
            <span className="stack-tag">Redis</span>
            <span className="stack-tag">MongoDB</span>
          </div>
          <div className="project-links">
            <a href="#" className="project-link">Case Study <span className="arrow">→</span></a>
            <a href="#" className="project-link">GitHub <span className="arrow">→</span></a>
          </div>
        </div>

        {/* Card 3 */}
        <div className="project-card card-medium reveal reveal-delay-1">
          <div className="project-img"><span className="project-img-inner">03</span></div>
          <div className="project-num">
            <span>003</span>
            <span className="project-badge">Mobile</span>
          </div>
          <h3 className="project-title">React Native Finance App</h3>
          <p className="project-desc">
            Cross-platform personal finance tracker with expense categorization, spending forecasts, 
            and biometric auth.
          </p>
          <div className="project-stack">
            <span className="stack-tag">React Native</span>
            <span className="stack-tag">Expo</span>
            <span className="stack-tag">Firebase</span>
          </div>
          <div className="project-links">
            <a href="#" className="project-link">App Store <span className="arrow">→</span></a>
          </div>
        </div>

        {/* Card 4 */}
        <div className="project-card card-third reveal">
          <div className="project-num">
            <span>004</span>
            <span className="project-badge">Tool</span>
          </div>
          <h3 className="project-title">CLI DevTool</h3>
          <p className="project-desc">Open-source scaffolding CLI with 2k+ GitHub stars. Generates production-ready project structures.</p>
          <div className="project-stack">
            <span className="stack-tag">Node.js</span>
            <span className="stack-tag">Commander</span>
          </div>
          <div className="project-links">
            <a href="#" className="project-link">NPM <span className="arrow">→</span></a>
          </div>
        </div>

        {/* Card 5 */}
        <div className="project-card card-third reveal reveal-delay-1">
          <div className="project-num">
            <span>005</span>
            <span className="project-badge">AI</span>
          </div>
          <h3 className="project-title">AI Document Summarizer</h3>
          <p className="project-desc">RAG-powered app that summarizes large PDFs and answers questions using LLM integration.</p>
          <div className="project-stack">
            <span className="stack-tag">Python</span>
            <span className="stack-tag">LangChain</span>
            <span className="stack-tag">FastAPI</span>
          </div>
          <div className="project-links">
            <a href="#" className="project-link">Demo <span className="arrow">→</span></a>
          </div>
        </div>

        {/* Card 6 */}
        <div className="project-card card-third reveal reveal-delay-2">
          <div className="project-num">
            <span>006</span>
            <span className="project-badge">UI</span>
          </div>
          <h3 className="project-title">Component Library</h3>
          <p className="project-desc">A12-component design system published to NPM with Storybook docs and full TypeScript support.</p>
          <div className="project-stack">
            <span className="stack-tag">React</span>
            <span className="stack-tag">Storybook</span>
            <span className="stack-tag">Rollup</span>
          </div>
          <div className="project-links">
            <a href="#" className="project-link">Docs <span className="arrow">→</span></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsSection;
