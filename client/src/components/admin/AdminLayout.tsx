import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { useGetMessagesQuery } from '../../store/api/portfolioApi';

const NAV = [
  { id: 'overview', label: 'Dashboard', icon: '◈', path: '/admin' },
  { id: 'projects', label: 'Projects', icon: '◉', path: '/admin/projects' },
  { id: 'skills', label: 'Skills', icon: '✦', path: '/admin/skills' },
  {
    id: 'experience',
    label: 'Experience',
    icon: '◎',
    path: '/admin/experience',
  },
  { id: 'messages', label: 'Messages', icon: '◷', path: '/admin/messages' },
  { id: 'settings', label: 'Settings', icon: '⚙', path: '/admin/settings' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const admin = useAppSelector((s) => s.auth.admin);
  const { data: msgData } = useGetMessagesQuery();
  const [collapsed, setCollapsed] = useState(false);
  const unread = msgData?.unread ?? 0;

  const active =
    NAV.find((n) =>
      n.path === '/admin'
        ? location.pathname === '/admin'
        : location.pathname.startsWith(n.path)
    )?.id ?? 'overview';

  return (
    <div className="flex min-h-screen bg-bg text-white font-body">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex-shrink-0 bg-surface border-r border-border/20 flex flex-col overflow-hidden sticky top-0 h-screen"
      >
        {/* Logo */}
        <div className="px-5 py-7 border-b border-border/20 flex items-center justify-between">
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-mono text-[13px] text-accent">
                  // admin
                </div>
                <div className="font-mono text-[10px] text-muted mt-0.5">
                  yourname.dev
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="text-muted hover:text-accent transition-colors text-[14px] flex-shrink-0 ml-auto"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {NAV.map((item) => {
            const isActive = active === item.id;
            const hasBadge = item.id === 'messages' && unread > 0;
            return (
              <motion.button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-5 py-3 text-[13px] transition-all border-l-2 ${
                  isActive
                    ? 'border-accent text-accent bg-accent/5'
                    : 'border-transparent text-muted hover:text-white hover:bg-surface2'
                }`}
                whileHover={{ x: isActive ? 0 : 2 }}
              >
                <span className="text-[16px] flex-shrink-0">{item.icon}</span>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      className="flex-1 text-left font-body"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {hasBadge && !collapsed && (
                  <span className="font-mono text-[10px] px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 rounded-full">
                    {unread}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* User + logout */}
        <div className="px-4 py-5 border-t border-border/20">
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 mb-3"
              >
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-mono text-[11px] text-accent flex-shrink-0">
                  {admin?.name?.charAt(0) ?? 'A'}
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-medium truncate">
                    {admin?.name ?? 'Admin'}
                  </div>
                  <div className="font-mono text-[10px] text-muted truncate">
                    {admin?.email}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => {
              dispatch(logout());
              navigate('/admin/login');
            }}
            className="w-full py-2 border border-border/20 text-muted font-mono text-[11px] hover:border-red-500/50 hover:text-red-400 transition-all"
          >
            {collapsed ? '↩' : 'Logout →'}
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
