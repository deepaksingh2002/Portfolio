import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';
import type {
  Project,
  Skill,
  Experience,
  Message,
  ContactFormData,
} from '../../types';

export const portfolioApi = createApi({
  reducerPath: 'portfolioApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ['Project', 'Skill', 'Experience', 'Message'],
  endpoints: (builder) => ({
    // Projects
    getProjects: builder.query<
      { data: Project[]; count: number },
      { featured?: boolean; category?: string }
    >({
      query: (params = {}) => ({ url: '/projects', params }),
      providesTags: ['Project'],
    }),

    getProject: builder.query<{ data: Project }, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Project', id }],
    }),

    addProject: builder.mutation<{ data: Project }, Partial<Project>>({
      query: (body) => ({ url: '/projects', method: 'POST', body }),
      invalidatesTags: ['Project'],
    }),

    updateProject: builder.mutation<
      { data: Project },
      { id: string; body: Partial<Project> }
    >({
      query: ({ id, body }) => ({
        url: `/projects/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Project'],
    }),

    deleteProject: builder.mutation<void, string>({
      query: (id) => ({ url: `/projects/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Project'],
    }),

    // Skills
    getSkills: builder.query<
      { data: Skill[]; grouped: Record<string, Skill[]> },
      void
    >({
      query: () => '/skills',
      providesTags: ['Skill'],
    }),

    addSkill: builder.mutation<{ data: Skill }, Partial<Skill>>({
      query: (body) => ({ url: '/skills', method: 'POST', body }),
      invalidatesTags: ['Skill'],
    }),

    deleteSkill: builder.mutation<void, string>({
      query: (id) => ({ url: `/skills/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Skill'],
    }),

    // Experience
    getExperience: builder.query<{ data: Experience[] }, void>({
      query: () => '/experience',
      providesTags: ['Experience'],
    }),

    // Messages
    sendMessage: builder.mutation<{ message: string }, ContactFormData>({
      query: (body) => ({ url: '/contact', method: 'POST', body }),
    }),

    getMessages: builder.query<{ data: Message[]; unread: number }, void>({
      query: () => '/messages',
      providesTags: ['Message'],
    }),

    markRead: builder.mutation<void, string>({
      query: (id) => ({ url: `/messages/${id}/read`, method: 'PUT' }),
      invalidatesTags: ['Message'],
    }),

    deleteMessage: builder.mutation<void, string>({
      query: (id) => ({ url: `/messages/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Message'],
    }),

    // Auth
    login: builder.mutation<
      { token: string; admin: any },
      { email: string; password: string }
    >({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetSkillsQuery,
  useAddSkillMutation,
  useDeleteSkillMutation,
  useGetExperienceQuery,
  useSendMessageMutation,
  useGetMessagesQuery,
  useMarkReadMutation,
  useDeleteMessageMutation,
  useLoginMutation,
} = portfolioApi;
