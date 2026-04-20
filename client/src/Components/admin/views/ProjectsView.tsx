import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProjectsViewProps {
  switchTab: (tab: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ switchTab }) => {
  const navigate = useNavigate();
  return (
    <div className="subview active" id="sv-projects">
      <div className="sec-head anim">
        <div className="sec-title">All <span>Projects</span></div>
      </div>
      <div className="table-wrap anim anim-d1">
        <table className="data-table">
          <thead><tr><th>Project</th><th>Category</th><th>Tech Stack</th><th>Featured</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div className="td-img">S</div><div><div className="td-title">SaaS Analytics Dashboard</div><div className="td-meta">Added Dec 2024</div></div></div></td><td><span className="badge-pill pill-purple">Full-Stack</span></td><td><div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}><span style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--muted)' }}>Next.js</span><span style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--muted)' }}>TS</span></div></td><td><span className="badge-pill pill-green">Yes</span></td><td><span className="badge-pill pill-green">Live</span></td><td><div className="td-actions"><button className="act-btn edit" onClick={() => switchTab('add-project')}>Edit</button><button className="act-btn view" onClick={() => navigate('/projects/saas-dashboard')}>Preview</button><button className="act-btn del">Delete</button></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
