import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../Components/admin/Sidebar';
import { OverviewView } from '../../Components/admin/views/OverviewView';
import { ProjectsView } from '../../Components/admin/views/ProjectsView';
import { ProjectForm } from '../../Components/admin/ProjectForm';
import { SkillsView } from '../../Components/admin/views/SkillsView';
import { ExperienceView } from '../../Components/admin/views/ExperienceView';
import { SettingsView } from '../../Components/admin/views/SettingsView';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const switchTab = (tab: string) => setActiveTab(tab);

  const titles: Record<string, string> = {
    'overview': 'Dashboard',
    'projects': 'Projects',
    'add-project': 'Add Project',
    'skills': 'Skills',
    'experience': 'Experience',
    'settings': 'Settings'
  };

  const getActionBtn = () => {
    if (activeTab === 'add-project') {
      return <button className="topbar-btn" onClick={() => switchTab('projects')}>← Back</button>;
    } else if (activeTab === 'overview' || activeTab === 'projects') {
      return <button className="topbar-btn" id="tb-action" onClick={() => switchTab('add-project')}>+ Add Project</button>;
    } else if (activeTab === 'skills') {
      return <button className="topbar-btn">+ Add Skill</button>;
    } else if (activeTab === 'experience') {
      return <button className="topbar-btn">+ Add Role</button>;
    } else if (activeTab === 'settings') {
      return <button className="topbar-btn">Save All</button>;
    }
  };

  return (
    <div id="page-dash" className="page page-active">
      <Sidebar activeTab={activeTab} switchTab={switchTab} />
      
      <div className="main">
        <div className="topbar">
          <div className="topbar-title" id="tb-title">{titles[activeTab] || 'Dashboard'}</div>
          <div className="topbar-right">
            <button className="topbar-btn-outline" onClick={() => navigate('/')}>View Portfolio ↗</button>
            <button className="notif-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeWidth="1.5"/></svg>
              <span className="notif-dot pulse"></span>
            </button>
            {getActionBtn()}
          </div>
        </div>

        <div className="content-area">
          {activeTab === 'overview' && <OverviewView switchTab={switchTab} />}
          {activeTab === 'projects' && <ProjectsView switchTab={switchTab} />}
          {activeTab === 'add-project' && <ProjectForm onSave={() => switchTab('projects')} onCancel={() => switchTab('projects')} />}
          {activeTab === 'skills' && <SkillsView />}
          {activeTab === 'experience' && <ExperienceView />}
          {activeTab === 'settings' && <SettingsView />}
        </div>
      </div>
    </div>
  );
};
