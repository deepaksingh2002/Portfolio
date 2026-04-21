import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  switchTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, switchTab }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const adminEmail = user?.email;

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="sidebar">
      <div className="sb-logo">
        <div className="sb-logo-text">// admin panel</div>
        <div className="sb-logo-sub">deepaksingh.dev</div>
      </div>
      <div className="sb-section">
        <div className="sb-section-label">Overview</div>
        <button className={`sb-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => switchTab('overview')}>
          <svg className="sb-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" strokeWidth="1.5" rx="1"/><rect x="14" y="3" width="7" height="7" strokeWidth="1.5" rx="1"/><rect x="3" y="14" width="7" height="7" strokeWidth="1.5" rx="1"/><rect x="14" y="14" width="7" height="7" strokeWidth="1.5" rx="1"/></svg>
          Dashboard
        </button>
      </div>
      <div className="sb-section">
        <div className="sb-section-label">Content</div>
        <button className={`sb-link ${activeTab === 'projects' || activeTab === 'add-project' ? 'active' : ''}`} onClick={() => switchTab('projects')}>
          <svg className="sb-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h10" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Projects
          <span className="sb-badge">6</span>
        </button>
        <button className={`sb-link ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => switchTab('skills')}>
          <svg className="sb-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth="1.5"/><path d="M12 8v4l3 3" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Skills
        </button>
        <button className={`sb-link ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => switchTab('experience')}>
          <svg className="sb-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="14" rx="1" strokeWidth="1.5"/><path d="M8 7V5a2 2 0 014 0v2" strokeWidth="1.5"/></svg>
          Experience
        </button>
      </div>
      <div className="sb-section">
        <div className="sb-section-label">System</div>
        <button className={`sb-link ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => switchTab('settings')}>
          <svg className="sb-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" strokeWidth="1.5"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeWidth="1.5"/></svg>
          Settings
        </button>
      </div>
      <div className="sb-bottom">
        <div className="sb-user">
          <div className="sb-avatar">DS</div>
          <div>
            <div className="sb-user-name">Deepak Singh</div>
            <div className="sb-user-role">{adminEmail || 'Administrator'}</div>
          </div>
        </div>
        <button className="sb-logout" onClick={handleLogout}>Logout -&gt;</button>
      </div>
    </div>
  );
};
