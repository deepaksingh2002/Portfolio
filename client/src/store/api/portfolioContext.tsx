import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
}
export interface Skill {
  _id: string;
  name: string;
}
export interface Experience {
  _id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface PortfolioContextProps {
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  loading: boolean;
  refresh: () => void;
}

const PortfolioContext = createContext<PortfolioContextProps | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [projectsRes, skillsRes, experienceRes] = await Promise.all([
        axios.get('/api/projects', { withCredentials: true }),
        axios.get('/api/skills', { withCredentials: true }),
        axios.get('/api/experience', { withCredentials: true }),
      ]);
      setProjects(Array.isArray(projectsRes.data) ? projectsRes.data : []);
      setSkills(Array.isArray(skillsRes.data) ? skillsRes.data : []);
      setExperience(Array.isArray(experienceRes.data) ? experienceRes.data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <PortfolioContext.Provider value={{ projects, skills, experience, loading, refresh: fetchAll }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
};
