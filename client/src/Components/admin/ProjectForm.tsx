import React, { useState } from 'react';

interface ProjectFormProps {
  onCancel: () => void;
  onSave: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onCancel, onSave }) => {
  const [techTags, setTechTags] = useState(['Next.js', 'TypeScript', 'Node.js', 'MongoDB']);
  const [techInput, setTechInput] = useState('');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isPublished, setIsPublished] = useState(false);

  const handleTechAdd = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e && 'key' in e && e.key !== 'Enter') return;
    if (e) e.preventDefault();
    if (techInput.trim() && !techTags.includes(techInput.trim())) {
      setTechTags([...techTags, techInput.trim()]);
    }
    setTechInput('');
  };

  return (
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
          <button className="save-btn" onClick={onSave}>Save Project →</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
