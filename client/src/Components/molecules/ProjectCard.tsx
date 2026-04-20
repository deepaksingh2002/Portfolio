import React from 'react';
import { motion } from 'framer-motion';
import { Badge, Tag, Button } from '../atoms';

/**
 * Props for ProjectCard component.
 */

export interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  featured?: boolean;
  category: string;
}

/**
 * Displays a portfolio project with overlay links and tech stack.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  techStack,
  liveUrl,
  githubUrl,
  image,
  featured,
  category,
}) => (
  <motion.div
    className="relative group rounded-lg overflow-hidden shadow-lg bg-white dark:bg-neutral-900 transition"
    whileHover={{ scale: 1.03 }}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
  >
    <img
      src={image}
      alt={title}
      className="w-full h-56 object-cover object-top"
      loading="lazy"
    />
    <div className="absolute top-4 left-4 flex gap-2">
      {featured && <Badge variant="accent">Featured</Badge>}
      <Badge>{category}</Badge>
    </div>
    <div className="p-5 pb-16">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-300 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {techStack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </div>
    {/* Overlay */}
    <motion.div
      className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex gap-4">
        <Button as="a" href={liveUrl} target="_blank" rel="noopener" variant="primary">
          Live Demo
        </Button>
        <Button as="a" href={githubUrl} target="_blank" rel="noopener" variant="outline">
          GitHub
        </Button>
      </div>
    </motion.div>
  </motion.div>
);
