import React, { useState } from 'react';
import { ProjectCard, ProjectCardProps } from '../molecules/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Props for ProjectsGrid component.
 */
export interface ProjectsGridProps {
  projects: ProjectCardProps[];
}

/**
 * Masonry grid of projects with filter tabs.
 */
export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  const [filter, setFilter] = useState<'All' | 'Frontend' | 'Backend' | 'Full-Stack'>('All');

  const filtered = projects.filter((p) =>
    filter === 'All'
      ? true
      : filter === 'Frontend'
      ? p.category.toLowerCase().includes('front')
      : filter === 'Backend'
      ? p.category.toLowerCase().includes('back')
      : p.category.toLowerCase().includes('full')
  );

  return (
    <section>
      <div className="flex gap-2 mb-6">
        {['All', 'Frontend', 'Backend', 'Full-Stack'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1 rounded-full font-medium transition ${
              filter === tab
                ? 'bg-accent text-white dark:bg-accent'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200'
            }`}
            onClick={() => setFilter(tab as any)}
          >
            {tab}
          </button>
        ))}
      </div>
      <motion.div
        layout
        className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
