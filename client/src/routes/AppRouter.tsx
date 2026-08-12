import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProtectedRoute from './ProtectedRoute';

/* Public */
const Home = lazy(() => import('../pages/public/Home'));
const NotFound = lazy(() => import('../pages/public/NotFound'));

/* Admin auth */
const Login = lazy(() => import('../pages/admin/Login'));

/* Admin layout + pages */
const AdminLayout = lazy(() => import('../components/admin/AdminLayout'));
const Overview = lazy(() => import('../pages/admin/Overview'));
const Projects = lazy(() => import('../pages/admin/Projects'));
const Messages = lazy(() => import('../pages/admin/Messages'));
const Skills = lazy(() => import('../pages/admin/Skills'));
const Experience = lazy(() => import('../pages/admin/Experience'));
const Settings = lazy(() => import('../pages/admin/Settings'));

function Loader() {
  return (
    <div className="bg-bg min-h-screen flex items-center justify-center">
      <div className="font-mono text-[13px] text-accent animate-pulse">
        Loading...
      </div>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* ── Public ─────────────────────────────────── */}
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />

        {/* ── Protected admin ────────────────────────── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Overview />} />
            <Route path="/admin/projects" element={<Projects />} />
            <Route path="/admin/messages" element={<Messages />} />
            <Route path="/admin/skills" element={<Skills />} />
            <Route path="/admin/experience" element={<Experience />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* ── 404 ────────────────────────────────────── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
