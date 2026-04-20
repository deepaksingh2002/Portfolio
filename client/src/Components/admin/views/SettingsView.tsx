import React from 'react';

export const SettingsView: React.FC = () => {
  return (
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
  );
};
