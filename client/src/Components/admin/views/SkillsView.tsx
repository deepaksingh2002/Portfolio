import React from 'react';
import { usePortfolio } from '../../../store/api/portfolioContext';

const categoryColor = {
  frontend: 'pill-blue',
  backend: 'pill-green',
  devops: 'pill-yellow',
  tools: 'pill-purple',
};

export const SkillsView: React.FC = () => {
  const { skills } = usePortfolio();
  return (
    <div className="subview active" id="sv-skills">
      <div className="sec-head anim"><div className="sec-title">Manage <span>Skills</span></div></div>
      <div className="table-wrap anim anim-d1">
        <table className="data-table">
          <thead><tr><th>Skill</th><th>Category</th><th>Proficiency</th><th>Actions</th></tr></thead>
          <tbody>
            {skills.map(skill => (
              <tr key={skill._id}>
                <td className="td-title">
                  {skill.icon && <img src={skill.icon} alt={skill.name} style={{ width: 18, height: 18, marginRight: 8, verticalAlign: 'middle' }} />}
                  {skill.name}
                </td>
                <td>
                  <span className={`badge-pill ${categoryColor[skill.category] || 'pill-blue'}`}>{skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '100px', height: '4px', background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                      <div style={{ width: `${Math.round((skill.proficiency / 5) * 100)}%`, height: '100%', background: 'var(--accent)' }}></div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--accent)' }}>{skill.proficiency}/5</span>
                  </div>
                </td>
                <td>
                  <div className="td-actions">
                    <button className="act-btn edit">Edit</button>
                    <button className="act-btn del">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
