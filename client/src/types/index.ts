export interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
  category:
    | 'Full-Stack'
    | 'Frontend'
    | 'Backend'
    | 'Mobile'
    | 'AI/ML'
    | 'Open Source'
    | 'Other';
  status: 'live' | 'draft' | 'archived';
  stats?: { users?: string; stars?: string; impact?: string };
  createdAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools' | 'Other';
  proficiency: number;
  icon?: string;
}

export interface Experience {
  _id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  current: boolean;
  description: string;
  highlights?: string[];
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
