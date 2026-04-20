import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const baseURL = rawBaseUrl ? rawBaseUrl.replace(/\/+$/, '') : '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const getApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseURL}${normalizedPath}`;
};
