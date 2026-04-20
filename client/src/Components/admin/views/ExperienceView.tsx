import React from 'react';

export const ExperienceView: React.FC = () => {
  return (
    <div className="subview active" id="sv-experience">
      <div className="sec-head anim"><div className="sec-title">Work <span>Experience</span></div></div>
      <div className="table-wrap anim anim-d1">
        <table className="data-table">
          <thead><tr><th>Role</th><th>Company</th><th>Period</th><th>Current</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td className="td-title">Senior Full-Stack Developer</td><td style={{ color: 'var(--accent2)', fontSize: '13px' }}>Company Name</td><td><span style={{ fontFamily: 'var(--font-m)', fontSize: '12px', color: 'var(--muted)' }}>2022 — Present</span></td><td><span className="badge-pill pill-green">Yes <span className="pulse" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', marginLeft: '4px' }}></span></span></td><td><div className="td-actions"><button className="act-btn edit">Edit</button><button className="act-btn del">Delete</button></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
