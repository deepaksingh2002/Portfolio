import React from 'react';

export const SkillsView: React.FC = () => {
  return (
    <div className="subview active" id="sv-skills">
      <div className="sec-head anim"><div className="sec-title">Manage <span>Skills</span></div></div>
      <div className="table-wrap anim anim-d1">
        <table className="data-table">
          <thead><tr><th>Skill</th><th>Category</th><th>Proficiency</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td className="td-title">React</td><td><span className="badge-pill pill-blue">Frontend</span></td><td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '100px', height: '4px', background: 'var(--surface2)', border: '1px solid var(--border)' }}><div style={{ width: '90%', height: '100%', background: 'var(--accent)' }}></div></div><span style={{ fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--accent)' }}>5/5</span></div></td><td><div className="td-actions"><button className="act-btn edit">Edit</button><button className="act-btn del">Delete</button></div></td></tr>
            <tr><td className="td-title">Node.js</td><td><span className="badge-pill pill-green">Backend</span></td><td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '100px', height: '4px', background: 'var(--surface2)', border: '1px solid var(--border)' }}><div style={{ width: '85%', height: '100%', background: 'var(--accent)' }}></div></div><span style={{ fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--accent)' }}>4/5</span></div></td><td><div className="td-actions"><button className="act-btn edit">Edit</button><button className="act-btn del">Delete</button></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
