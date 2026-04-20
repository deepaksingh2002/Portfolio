export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  featured: boolean;
  order: number;
  category: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'tools';
  proficiency: number;
  icon: string;
}

export interface Experience {
  _id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  current: boolean;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AuthState {
  token: string | null;
  isAdmin: boolean;
}

export interface UiState {
  theme: 'dark' | 'light';
  activeSection: string;
  mobileMenuOpen: boolean;
  loading: boolean;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}
