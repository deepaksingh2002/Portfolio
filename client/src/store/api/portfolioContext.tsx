import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../../lib/api';

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
  category: 'frontend' | 'backend' | 'devops' | 'tools';
  proficiency: number;
  icon?: string;
}
export interface Experience {
  _id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface PortfolioContextProps {
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  messages: Message[];
  loading: boolean;
  error: string;
  refresh: () => void;
  refreshMessages: () => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  createProject: (data: any) => Promise<void>;
  updateProject: (id: string, data: any) => Promise<void>;
}
  const createProject = async (data: any) => {
    setError('');
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v, i) => formData.append(`${key}[${i}]`, v));
        } else {
          formData.append(key, value as any);
        }
      });
      await api.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await fetchAll();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Unable to create project.');
    }
  };

  const updateProject = async (id: string, data: any) => {
    setError('');
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v, i) => formData.append(`${key}[${i}]`, v));
        } else {
          formData.append(key, value as any);
        }
      });
      await api.put(`/projects/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await fetchAll();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Unable to update project.');
    }
  };

const PortfolioContext = createContext<PortfolioContextProps | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [projectsRes, skillsRes, experienceRes] = await Promise.all([
        api.get('/projects'),
        api.get('/skills'),
        api.get('/experience'),
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

  // Admin messages logic
  const refreshMessages = async () => {
    setLoading(true);
    setError('');
    try {
      // You may want to add auth headers here if needed
      const response = await api.get('/contact/messages');
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Unable to load messages right now.');
    } finally {
      setLoading(false);
    }
  };

  const markMessageRead = async (id: string) => {
    setError('');
    try {
      const response = await api.patch(`/contact/messages/${id}/read`);
      setMessages((current) =>
        current.map((msg) => (msg._id === id ? response.data : msg))
      );
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Unable to mark this message as read.');
    }
  };

  const deleteMessage = async (id: string) => {
    setError('');
    try {
      await api.delete(`/contact/messages/${id}`);
      setMessages((current) => current.filter((msg) => msg._id !== id));
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Unable to delete this message.');
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        skills,
        experience,
        messages,
        loading,
        error,
        refresh: fetchAll,
        refreshMessages,
        markMessageRead,
        deleteMessage,
        createProject,
        updateProject,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
};
