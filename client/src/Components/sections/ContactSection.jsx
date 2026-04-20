import React from 'react';

export const ContactSection = () => {
  return (
    <>
      <div className="contact-big reveal">
        Let's<br/>
        <span>Build</span><br/>
        <span className="outline">Together</span>
      </div>
      <p className="contact-sub reveal">
        Open to freelance projects, full-time roles, and interesting collaborations.
        My inbox is always open.
      </p>
      <div className="contact-links reveal">
        <a href="mailto:you@email.com" className="contact-link">
          <span>✉</span> you@email.com
        </a>
        <a href="#" className="contact-link">
          <span>in</span> LinkedIn
        </a>
        <a href="#" className="contact-link">
          <span>⌥</span> GitHub
        </a>
        <a href="#" className="contact-link">
          <span>𝕏</span> Twitter
        </a>
      </div>
      <a href="mailto:you@email.com" className="btn-primary reveal" style={{ fontSize: '14px', padding: '16px 48px' }}>
        Say Hello →
      </a>
    </>
  );
};

export default ContactSection;
