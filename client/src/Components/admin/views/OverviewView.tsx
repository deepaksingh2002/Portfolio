import React from 'react';
import { StatCard } from '../StatCard';
import { useNavigate } from 'react-router-dom';

interface OverviewViewProps {
  switchTab: (tab: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ switchTab }) => {
  const navigate = useNavigate();

  return (
    <div className="subview active" id="sv-overview">
      <div className="stats-grid anim">
        <StatCard icon="◈" label="Total Projects" value="6" changeValue="+2" changeDesc="this month" colorClass="green" />
        <StatCard icon="✦" label="Profile Views" value="2,840" changeValue="+18%" changeDesc="vs last month" colorClass="yellow" />
        <StatCard icon="◉" label="Messages" value="12" changeValue="3" changeColor="var(--red)" changeDesc="unread" colorClass="blue" />
        <StatCard icon="★" label="GitHub Stars" value="348" changeValue="+24" changeDesc="this week" colorClass="red" />
      </div>

      <div className="two-col anim anim-d1">
        <div className="panel">
          <div className="panel-title">Monthly Profile Views</div>
          <div className="chart-bars">
            <div className="bar-col"><div className="bar" style={{ height: '40%' }}></div><div className="bar-label">Jan</div></div>
            <div className="bar-col"><div className="bar" style={{ height: '55%' }}></div><div className="bar-label">Feb</div></div>
            <div className="bar-col"><div className="bar" style={{ height: '38%' }}></div><div className="bar-label">Mar</div></div>
            <div className="bar-col"><div className="bar" style={{ height: '70%' }}></div><div className="bar-label">Apr</div></div>
            <div className="bar-col"><div className="bar" style={{ height: '60%' }}></div><div className="bar-label">May</div></div>
            <div className="bar-col"><div className="bar" style={{ height: '85%' }}></div><div className="bar-label">Jun</div></div>
            <div className="bar-col"><div className="bar" style={{ height: '75%' }}></div><div className="bar-label">Jul</div></div>
            <div className="bar-col"><div className="bar" style={{ height: '90%' }}></div><div className="bar-label">Aug</div></div>
            <div className="bar-col"><div className="bar" style={{ height: '65%' }}></div><div className="bar-label">Sep</div></div>
            <div className="bar-col"><div className="bar" style={{ height: '80%' }}></div><div className="bar-label">Oct</div></div>
            <div className="bar-col"><div className="bar" style={{ height: '95%' }}></div><div className="bar-label">Nov</div></div>
            <div className="bar-col"><div className="bar" style={{ height: '100%', background: 'rgba(100,255,218,.35)', borderTopColor: 'var(--accent)' }}></div><div className="bar-label" style={{ color: 'var(--accent)' }}>Dec</div></div>
          </div>
        </div>
        <div className="panel">
          <div className="panel-title">Recent Activity</div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="act-dot green"></div>
              <div className="act-content">
                <div className="act-text">New message from <strong>Rahul Sharma</strong></div>
                <div className="act-time">2 minutes ago</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="act-dot blue"></div>
              <div className="act-content">
                <div className="act-text">Project <strong>SaaS Dashboard</strong> updated</div>
                <div className="act-time">1 hour ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec-head anim anim-d2">
        <div className="sec-title">Recent <span>Projects</span></div>
        <button className="sec-action" onClick={() => switchTab('projects')}>View all →</button>
      </div>
      <div className="table-wrap anim anim-d2">
        <table className="data-table">
          <thead><tr><th>Project</th><th>Category</th><th>Status</th><th>Views</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div className="td-img">S</div><div><div className="td-title">SaaS Analytics Dashboard</div><div className="td-meta">Next.js · TypeScript · MongoDB</div></div></div></td><td><span className="badge-pill pill-purple">Full-Stack</span></td><td><span className="badge-pill pill-green">Live</span></td><td style={{ fontFamily: 'var(--font-m)', fontSize: '13px', color: 'var(--muted)' }}>1,240</td><td><div className="td-actions"><button className="act-btn edit" onClick={() => switchTab('add-project')}>Edit</button><button className="act-btn view" onClick={() => navigate('/projects/saas-dashboard')}>View</button><button className="act-btn del">Delete</button></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
