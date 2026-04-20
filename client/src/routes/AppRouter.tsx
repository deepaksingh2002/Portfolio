import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AnimatePresence } from 'framer-motion';

const Home = lazy(() => import('../pages/public/Home'));
const ProjectDetail = lazy(() => import('../pages/public/ProjectDetail'));
const NotFound = lazy(() => import('../pages/public/NotFound'));

const AdminLogin = lazy(() => import('../pages/admin/Login'));
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));

export const AppRouter: React.FC = () => (
  <AnimatePresence mode="wait">
    <Suspense fallback={<div className="page page-active" style={{ padding: '24px', textAlign: 'center' }}>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </AnimatePresence>
);
