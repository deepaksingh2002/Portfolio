import { motion } from 'framer-motion';
import { Project } from '../../types';

interface Props { project: Project; index?: number; }

const categoryColors: Record<string, string> = {
  'Full-Stack':   'bg-purple-500/10 text-purple-300 border-purple-500/20',
  'Frontend':     'bg-blue-500/10   text-blue-300   border-blue-500/20',
  'Backend':      'bg-green-500/10  text-green-300  border-green-500/20',
  'Mobile':       'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
  'AI/ML':        'bg-pink-500/10   text-pink-300   border-pink-500/20',
  'Open Source':  'bg-accent/10     text-accent     border-accent/20',
};

export default function ProjectCard({ project, index = 0 }: Props) {
  return (
    <motion.div
      className="group relative bg-surface border border-border/20 p-7 lg:p-9 overflow-hidden cursor-pointer h-full"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      whileHover={{ y: -4, borderColor: 'rgb(100 255 218)' }}
    >
      {/* Animated top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-transparent origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className="flex justify-between items-center mb-5">
        <span className="font-mono text-[12px] text-muted">0{index + 1}</span>
        <span className={`font-mono text-[11px] px-2.5 py-0.5 border rounded-sm ${categoryColors[project.category] || 'bg-accent/10 text-accent border-accent/20'}`}>
          {project.category}
        </span>
      </div>

      {project.imageUrl && (
        <div className="w-full h-36 bg-surface2 border border-border/20 mb-5 overflow-hidden">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      )}

      <h3 className="font-display font-bold text-white mb-3 leading-[1.1]"
        style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}>
        {project.title}
      </h3>
      <p className="text-muted text-[14px] leading-[1.7] mb-6">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.techStack.slice(0, 4).map(tech => (
          <span key={tech} className="font-mono text-[11px] text-muted px-2 py-0.5 bg-white/[0.03] border border-white/[0.06]">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="font-mono text-[12px] text-accent no-underline flex items-center gap-1.5 hover:gap-3 transition-all">
            Live Demo <span>→</span>
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="font-mono text-[12px] text-muted no-underline flex items-center gap-1.5 hover:gap-3 hover:text-white transition-all">
            GitHub <span>→</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
