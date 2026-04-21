import React, { useState } from 'react';
import { usePortfolio } from '../../store/api/portfolioContext';

interface ProjectFormProps {
  onCancel: () => void;
  onSave: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onCancel, onSave }) => {
  const { createProject, error, loading } = usePortfolio();
  const [techTags, setTechTags] = useState(['Next.js', 'TypeScript', 'Node.js', 'MongoDB']);
  const [techInput, setTechInput] = useState('');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [order, setOrder] = useState(1);
  const [image, setImage] = useState<File | null>(null);

  const handleTechAdd = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e && 'key' in e && e.key !== 'Enter') return;
    if (e) e.preventDefault();
    if (techInput.trim() && !techTags.includes(techInput.trim())) {
      setTechTags([...techTags, techInput.trim()]);
    }
    setTechInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProject({
      title,
      category,
      description,
      liveUrl,
      githubUrl,
      techStack: techTags,
      featured: isFeatured,
      published: isPublished,
      order,
      image,
    });
    onSave();
  };

  return (
    <div className="subview active" id="sv-add-project">
      <div className="sec-head anim">
        <div className="sec-title">Add / Edit <span>Project</span></div>
      </div>
      <form className="anim anim-d1" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '32px' }} onSubmit={handleSubmit}>
        <div className="form-grid" style={{ marginBottom: '20px' }}>
          <div className="field">
            <label className="field-label">Project Title *</label>
            <input className="field-input" placeholder="e.g. SaaS Analytics Dashboard" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="field">
            <label className="field-label">Category *</label>
            <select className="field-input field-select" value={category} onChange={e => setCategory(e.target.value)} required>
              <option value="">Select category</option>
              <option>Full-Stack</option><option>Frontend</option><option>Backend</option>
              <option>Mobile</option><option>AI / ML</option><option>Open Source</option>
            </select>
          </div>
        </div>
        <div className="form-grid full" style={{ marginBottom: '20px' }}>
          <div className="field">
            <label className="field-label">Short Description *</label>
            <textarea className="field-input field-textarea" placeholder="Describe what this project does, the problem it solves, and key outcomes..." value={description} onChange={e => setDescription(e.target.value)} required />
          </div>
        </div>
        <div className="form-grid" style={{ marginBottom: '20px' }}>
          <div className="field">
            <label className="field-label">Live URL</label>
            <input className="field-input" placeholder="https://project.vercel.app" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} />
          </div>
          <div className="field">
            <label className="field-label">GitHub URL</label>
            <input className="field-input" placeholder="https://github.com/you/project" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} />
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
              <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} />
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '6px', fontFamily: 'var(--font-m)' }}>PNG, JPG, WebP · max 2MB</div>
            </div>
          </div>
          <div className="field">
            <label className="field-label">Order (display position)</label>
            <input className="field-input" type="number" placeholder="1" style={{ marginBottom: '16px' }} value={order} onChange={e => setOrder(Number(e.target.value))} />
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
          <button className="save-btn" type="submit" disabled={loading}>Save Project →</button>
          <button className="cancel-btn" type="button" onClick={onCancel}>Cancel</button>
          {error && <div style={{ color: '#ff6b6b', marginTop: 8 }}>{error}</div>}
        </div>
      </form>
    </div>
  );
};
