import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePortfolio } from '../../store/api/portfolioContext';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();

  const { projects, loading } = usePortfolio();
  const project = projects?.find((p: any) => p._id === id || p.slug === id);

  if (loading) return <div className="page page-active" style={{ padding: '60px', textAlign: 'center' }}>Loading...</div>;
  if (!project) return <div className="page page-active" style={{ padding: '60px', textAlign: 'center' }}>Project not found.</div>;

  return (
    <div id="page-detail" className="page page-active">
      <div className="detail-hero">
        <div className="dh-bg">01</div>
        <Link to="/" className="dh-back">← Back to Portfolio</Link>
        <div className="dh-tags">
          <span className="badge-pill pill-purple">{project.category || 'Full-Stack'}</span>
          <span className="badge-pill pill-green">Live</span>
        </div>
        <h1 className="dh-title">{project.title}</h1>
        <div className="dh-meta">
          <span>Year: <span>2024</span></span>
          <span>Type: <span>Web App</span></span>
          <span>Stack: <span>{project.techStack?.join(' · ') || 'Next.js · Node.js · MongoDB'}</span></span>
        </div>
      </div>
      <div className="detail-body">
        {project.image ? (
          <img src={project.image} alt={project.title} className="detail-img" />
        ) : (
          <div className="detail-img">PREVIEW</div>
        )}
        <div className="detail-section">
          <div className="detail-sec-title">Overview</div>
          <p className="detail-text">{project.description}</p>
        </div>
        <div className="detail-section">
          <div className="detail-sec-title">Tech Stack</div>
          <div className="detail-stack">
            {project.techStack?.map((tech: string) => (
              <span key={tech} className="badge-pill pill-blue">{tech}</span>
            ))}
          </div>
        </div>
        <div className="detail-links" style={{ marginBottom: '48px' }}>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="detail-link dl-primary">Live Demo →</a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="detail-link dl-outline">View on GitHub</a>}
        </div>
        <div className="detail-nav">
          <button className="dn-btn">← Previous Project</button>
          <button className="dn-btn">Next Project →</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
