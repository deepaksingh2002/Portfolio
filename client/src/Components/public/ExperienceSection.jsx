import React from 'react';

export const ExperienceSection = () => {
  return (
    <>
      <div className="section-header reveal">
        <span className="section-num">03 /</span>
        <h2 className="section-title">Work<br/><span className="dim">Experience</span></h2>
        <div className="section-line"></div>
      </div>

      <div className="timeline">
        <div className="timeline-item reveal">
          <div className="timeline-period">2022 — Present</div>
          <div className="timeline-role">Senior Full-Stack Developer</div>
          <div className="timeline-company">@ <span>Company Name, Remote</span></div>
          <p className="timeline-desc">
            Led development of a multi-tenant SaaS platform serving 50k+ users. 
            Architected microservices migration reducing infrastructure costs by 40%. 
            Mentored a team of 4 junior developers.
          </p>
        </div>
        <div className="timeline-item reveal reveal-delay-1">
          <div className="timeline-period">2021 — 2022</div>
          <div className="timeline-role">Full-Stack Developer</div>
          <div className="timeline-company">@ <span>Startup Name, Bangalore</span></div>
          <p className="timeline-desc">
            Built the MVP from scratch — React frontend, Node.js API, PostgreSQL DB.
            Integrated payment gateways, implemented real-time notifications.
          </p>
        </div>
        <div className="timeline-item reveal reveal-delay-2">
          <div className="timeline-period">2020 — 2021</div>
          <div className="timeline-role">Frontend Developer</div>
          <div className="timeline-company">@ <span>Agency Name, Delhi</span></div>
          <p className="timeline-desc">
            Developed responsive web interfaces for 15+ client projects. 
            Improved page load performance by 60% through code splitting and lazy loading.
          </p>
        </div>
      </div>
    </>
  );
};

export default ExperienceSection;
