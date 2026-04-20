import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../store/api/portfolioContext';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [techTags, setTechTags] = useState(['Next.js', 'TypeScript', 'Node.js', 'MongoDB']);
  const [techInput, setTechInput] = useState('');

  const handleTechAdd = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e && 'key' in e && e.key !== 'Enter') return;
    if (e) e.preventDefault();
    if (techInput.trim() && !techTags.includes(techInput.trim())) {
      setTechTags([...techTags, techInput.trim()]);
    }
    setTechInput('');
  };

  const switchTab = (tab: string) => setActiveTab(tab);

  const titles: Record<string, string> = {
    'overview': 'Dashboard',
    'projects': 'Projects',
    'add-project': 'Add Project',
    'skills': 'Skills',
    'experience': 'Experience',
    'messages': 'Messages',
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
    } else if (activeTab === 'messages') {
      return <button className="topbar-btn">Compose</button>;
    } else if (activeTab === 'settings') {
      return <button className="topbar-btn">Save All</button>;
    }
  };

  return (
    <div id="page-dash" className="page page-active">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sb-logo">
          <div className="sb-logo-text">// admin panel</div>
          <div className="sb-logo-sub">yourname.dev</div>
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
          <div className="sb-section-label">Inbox</div>
          <button className={`sb-link ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => switchTab('messages')}>
            <svg className="sb-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="1.5"/><path d="M22 6l-10 7L2 6" strokeWidth="1.5"/></svg>
            Messages
            <span className="sb-badge">3</span>
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
            <div className="sb-avatar">YN</div>
            <div>
              <div className="sb-user-name">Your Name</div>
              <div className="sb-user-role">Administrator</div>
            </div>
          </div>
          <button className="sb-logout" onClick={() => navigate('/admin/login')}>Logout →</button>
        </div>
      </div>

      {/* Main */}
      <div className="main">
        {/* Topbar */}
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

        {/* Sub-views */}
        <div className="content-area">

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="subview active" id="sv-overview">
              <div className="stats-grid anim">
                <div className="stat-card">
                  <div className="sc-icon">◈</div>
                  <div className="sc-label">Total Projects</div>
                  <div className="sc-num green">6</div>
                  <div className="sc-change"><span>+2</span> this month</div>
                </div>
                <div className="stat-card yellow">
                  <div className="sc-icon">✦</div>
                  <div className="sc-label">Profile Views</div>
                  <div className="sc-num yellow">2,840</div>
                  <div className="sc-change"><span>+18%</span> vs last month</div>
                </div>
                <div className="stat-card blue">
                  <div className="sc-icon">◉</div>
                  <div className="sc-label">Messages</div>
                  <div className="sc-num blue">12</div>
                  <div className="sc-change"><span className="neg" style={{ color: 'var(--red)' }}>3</span> unread</div>
                </div>
                <div className="stat-card red">
                  <div className="sc-icon">★</div>
                  <div className="sc-label">GitHub Stars</div>
                  <div className="sc-num" style={{ color: 'var(--accent2)' }}>348</div>
                  <div className="sc-change"><span>+24</span> this week</div>
                </div>
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
                    <div className="activity-item">
                      <div className="act-dot yellow"></div>
                      <div className="act-content">
                        <div className="act-text">Resume PDF re-uploaded</div>
                        <div className="act-time">3 hours ago</div>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="act-dot green"></div>
                      <div className="act-content">
                        <div className="act-text">New project <strong>CLI Tool</strong> published</div>
                        <div className="act-time">Yesterday</div>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="act-dot red"></div>
                      <div className="act-content">
                        <div className="act-text">Failed login attempt blocked</div>
                        <div className="act-time">2 days ago</div>
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
                    <tr><td><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div className="td-img">E</div><div><div className="td-title">E-Commerce Platform</div><div className="td-meta">Node.js · Docker · RabbitMQ</div></div></div></td><td><span className="badge-pill pill-blue">Backend</span></td><td><span className="badge-pill pill-green">Live</span></td><td style={{ fontFamily: 'var(--font-m)', fontSize: '13px', color: 'var(--muted)' }}>890</td><td><div className="td-actions"><button className="act-btn edit">Edit</button><button className="act-btn view">View</button><button className="act-btn del">Delete</button></div></td></tr>
                    <tr><td><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div className="td-img">F</div><div><div className="td-title">Finance Mobile App</div><div className="td-meta">React Native · Expo · Firebase</div></div></div></td><td><span className="badge-pill pill-yellow">Mobile</span></td><td><span className="badge-pill pill-yellow">Draft</span></td><td style={{ fontFamily: 'var(--font-m)', fontSize: '13px', color: 'var(--muted)' }}>340</td><td><div className="td-actions"><button className="act-btn edit">Edit</button><button className="act-btn view">View</button><button className="act-btn del">Delete</button></div></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {activeTab === 'projects' && (
            <div className="subview active" id="sv-projects">
              <div className="sec-head anim">
                <div className="sec-title">All <span>Projects</span></div>
              </div>
              <div className="table-wrap anim anim-d1">
                <table className="data-table">
                  <thead><tr><th>Project</th><th>Category</th><th>Tech Stack</th><th>Featured</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    <tr><td><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div className="td-img">S</div><div><div className="td-title">SaaS Analytics Dashboard</div><div className="td-meta">Added Dec 2024</div></div></div></td><td><span className="badge-pill pill-purple">Full-Stack</span></td><td><div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}><span style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--muted)' }}>Next.js</span><span style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--muted)' }}>TS</span></div></td><td><span className="badge-pill pill-green">Yes</span></td><td><span className="badge-pill pill-green">Live</span></td><td><div className="td-actions"><button className="act-btn edit" onClick={() => switchTab('add-project')}>Edit</button><button className="act-btn view" onClick={() => navigate('/projects/saas-dashboard')}>Preview</button><button className="act-btn del">Delete</button></div></td></tr>
                    <tr><td><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div className="td-img">E</div><div><div className="td-title">E-Commerce Platform</div><div className="td-meta">Added Nov 2024</div></div></div></td><td><span className="badge-pill pill-blue">Backend</span></td><td><div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}><span style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--muted)' }}>Node.js</span></div></td><td><span className="badge-pill pill-red">No</span></td><td><span className="badge-pill pill-green">Live</span></td><td><div className="td-actions"><button className="act-btn edit">Edit</button><button className="act-btn view">Preview</button><button className="act-btn del">Delete</button></div></td></tr>
                    {/* Add more as needed */}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ADD PROJECT */}
          {activeTab === 'add-project' && (
            <div className="subview active" id="sv-add-project">
              <div className="sec-head anim">
                <div className="sec-title">Add / Edit <span>Project</span></div>
              </div>
              <div className="anim anim-d1" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '32px' }}>
                <div className="form-grid" style={{ marginBottom: '20px' }}>
                  <div className="field">
                    <label className="field-label">Project Title *</label>
                    <input className="field-input" placeholder="e.g. SaaS Analytics Dashboard"/>
                  </div>
                  <div className="field">
                    <label className="field-label">Category *</label>
                    <select className="field-input field-select">
                      <option value="">Select category</option>
                      <option>Full-Stack</option><option>Frontend</option><option>Backend</option>
                      <option>Mobile</option><option>AI / ML</option><option>Open Source</option>
                    </select>
                  </div>
                </div>
                <div className="form-grid full" style={{ marginBottom: '20px' }}>
                  <div className="field">
                    <label className="field-label">Short Description *</label>
                    <textarea className="field-input field-textarea" placeholder="Describe what this project does, the problem it solves, and key outcomes..."></textarea>
                  </div>
                </div>
                <div className="form-grid" style={{ marginBottom: '20px' }}>
                  <div className="field">
                    <label className="field-label">Live URL</label>
                    <input className="field-input" placeholder="https://project.vercel.app"/>
                  </div>
                  <div className="field">
                    <label className="field-label">GitHub URL</label>
                    <input className="field-input" placeholder="https://github.com/you/project"/>
                  </div>
                </div>
                <div className="form-grid full" style={{ marginBottom: '20px' }}>
                  <div className="field">
                    <label className="field-label">Tech Stack</label>
                    <div className="tech-input-wrap">
                      <input className="field-input" id="tech-in" value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Type a tech and press Enter (e.g. React)" style={{ flex: 1 }} onKeyDown={handleTechAdd}/>
                      <button className="save-btn" style={{ padding: '12px 20px' }} onClick={handleTechAdd}>Add</button>
                    </div>
                    <div className="tech-tags-preview" id="tech-tags">
                      {techTags.map(tag => (
                        <span key={tag} className="tech-tag">{tag} <span className="tech-tag-x" onClick={() => setTechTags(techTags.filter(t => t !== tag))}>×</span></span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-grid" style={{ marginBottom: '20px' }}>
                  <div className="field">
                    <label className="field-label">Project Image</label>
                    <div className="upload-area">
                      <div className="upload-icon">⬆</div>
                      <div className="upload-text">Drag & drop or <span>browse file</span></div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '6px', fontFamily: 'var(--font-m)' }}>PNG, JPG, WebP · max 2MB</div>
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">Order (display position)</label>
                    <input className="field-input" type="number" placeholder="1" style={{ marginBottom: '16px' }}/>
                    <label className="field-label">Options</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '16px', background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                      <div className="toggle-wrap">
                        <div className={`toggle ${isFeatured ? 'on' : ''}`} onClick={() => setIsFeatured(!isFeatured)}><div className="toggle-dot"></div></div>
                        <span style={{ fontSize: '13px' }}>Mark as featured</span>
                      </div>
                      <div className="toggle-wrap">
                        <div className={`toggle ${isPublished ? 'on' : ''}`} onClick={() => setIsPublished(!isPublished)}><div className="toggle-dot"></div></div>
                        <span style={{ fontSize: '13px' }}>Publish immediately</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-actions">
                  <button className="save-btn">Save Project →</button>
                  <button className="cancel-btn" onClick={() => switchTab('projects')}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* SKILLS */}
          {activeTab === 'skills' && (
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
          )}

          {/* EXPERIENCE */}
          {activeTab === 'experience' && (
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
          )}

          {/* MESSAGES */}
          {activeTab === 'messages' && (
            <div className="subview active" id="sv-messages">
              <div className="sec-head anim"><div className="sec-title">Inbox <span>(12)</span></div><button className="sec-action">Mark all read</button></div>
              <div className="msg-filters anim">
                <button className="msg-filter active">All (12)</button>
                <button className="msg-filter">Unread (3)</button>
                <button className="msg-filter">Read (9)</button>
              </div>
              <div className="anim anim-d1">
                <div className="msg-card unread">
                  <div className="msg-header">
                    <div><div className="msg-from">Rahul Sharma <span style={{ fontSize: '11px', fontFamily: 'var(--font-m)', padding: '2px 8px', background: 'rgba(100,255,218,.08)', color: 'var(--accent)', marginLeft: '8px' }}>NEW</span></div><div className="msg-email">rahul@example.com</div></div>
                    <div className="msg-time">2 min ago</div>
                  </div>
                  <div className="msg-subject">Interested in collaborating on a React project</div>
                  <div className="msg-body">Hi, I came across your portfolio and was really impressed by the SaaS Dashboard project. I'm working on a similar product and would love to discuss...</div>
                  <div className="msg-actions"><button className="act-btn view">Reply</button><button className="act-btn edit">Mark read</button><button className="act-btn del">Delete</button></div>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <div className="subview active" id="sv-settings">
              <div className="sec-head anim"><div className="sec-title">Account <span>Settings</span></div></div>
              <div className="settings-grid anim anim-d1">
                <div className="settings-panel">
                  <div className="sp-title">Profile <span>Info</span></div>
                  <div className="form-grid full" style={{ gap: '14px' }}>
                    <div className="field"><label className="field-label">Display Name</label><input className="field-input" defaultValue="Your Name"/></div>
                    <div className="field"><label className="field-label">Email</label><input className="field-input" defaultValue="admin@yoursite.dev"/></div>
                    <div className="field"><label className="field-label">Bio (short)</label><textarea className="field-input field-textarea" style={{ minHeight: '80px' }} defaultValue="Full-Stack Developer based in Delhi, India."></textarea></div>
                    <div className="field"><label className="field-label">Availability Status</label>
                      <div className="toggle-wrap" style={{ padding: '10px', background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                        <div className="toggle on" onClick={(e) => e.currentTarget.classList.toggle('on')}><div className="toggle-dot"></div></div>
                        <span style={{ fontSize: '13px' }}>Show "Available for opportunities" badge</span>
                      </div>
                    </div>
                    <button className="save-btn" style={{ alignSelf: 'flex-start' }}>Save Changes →</button>
                  </div>
                </div>
                <div>
                  <div className="settings-panel" style={{ marginBottom: '20px' }}>
                    <div className="sp-title">Social <span>Links</span></div>
                    <div className="form-grid full" style={{ gap: '14px' }}>
                      <div className="field"><label className="field-label">GitHub</label><input className="field-input" placeholder="https://github.com/yourname"/></div>
                      <div className="field"><label className="field-label">LinkedIn</label><input className="field-input" placeholder="https://linkedin.com/in/yourname"/></div>
                      <div className="field"><label className="field-label">Twitter / X</label><input className="field-input" placeholder="https://x.com/yourname"/></div>
                      <button className="save-btn" style={{ alignSelf: 'flex-start' }}>Save Links →</button>
                    </div>
                  </div>
                  <div className="settings-panel">
                    <div className="sp-title">Security</div>
                    <div className="form-grid full" style={{ gap: '14px' }}>
                      <div className="field"><label className="field-label">Current Password</label><input className="field-input" type="password" placeholder="••••••••"/></div>
                      <div className="field"><label className="field-label">New Password</label><input className="field-input" type="password" placeholder="••••••••"/></div>
                      <button className="save-btn" style={{ alignSelf: 'flex-start' }}>Update Password →</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="danger-zone anim anim-d2">
                <div className="dz-title">Danger Zone</div>
                <div className="dz-row"><div className="dz-desc">Clear all contact messages from database</div><button className="dz-btn">Clear Messages</button></div>
                <div className="dz-row"><div className="dz-desc">Reset all portfolio data to defaults</div><button className="dz-btn">Reset Data</button></div>
                <div className="dz-row"><div className="dz-desc">Delete admin account permanently</div><button className="dz-btn">Delete Account</button></div>
              </div>
            </div>
          )}

        </div>{/* /content-area */}
      </div>{/* /main */}
    </div>
  );
};

export default AdminDashboard;
