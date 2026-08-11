import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
} from '../../store/api/portfolioApi';
import ProjectForm from '../../components/admin/ProjectForm';
import { Project } from '../../types';

const categoryPills: Record<string, string> = {
  'Full-Stack': 'bg-purple-500/10 text-purple-300 border border-purple-500/20',
  Frontend: 'bg-blue-500/10 text-blue-300 border border-blue-500/20',
  Backend: 'bg-green-500/10 text-green-300 border border-green-500/20',
  Mobile: 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20',
  'AI/ML': 'bg-pink-500/10 text-pink-300 border border-pink-500/20',
  'Open Source': 'bg-accent/10 text-accent border border-accent/20',
};

export default function Projects() {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editing, setEditing] = useState<Project | null>(null);
  const [delId, setDelId] = useState<string | null>(null);

  const { data, isLoading } = useGetProjectsQuery({ status: 'live' } as any);
  const [deleteProject, { isLoading: deleting }] = useDeleteProjectMutation();

  const handleDelete = async (id: string) => {
    await deleteProject(id).unwrap();
    setDelId(null);
  };

  if (view === 'add' || view === 'edit')
    return (
      <div className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => {
              setView('list');
              setEditing(null);
            }}
            className="font-mono text-[12px] text-muted hover:text-accent transition-colors"
          >
            ← Back
          </button>
          <h1 className="font-display font-bold text-[24px]">
            {view === 'add' ? 'Add New' : 'Edit'} Project
          </h1>
        </div>
        <div className="max-w-3xl bg-surface border border-border/20 p-8">
          <ProjectForm
            project={editing || undefined}
            onDone={() => {
              setView('list');
              setEditing(null);
            }}
          />
        </div>
      </div>
    );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display font-bold text-[28px]">Projects</h1>
          <p className="text-muted font-mono text-[12px] mt-1">
            // {data?.count ?? 0} total
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView('add')}
          className="px-6 py-2.5 bg-accent text-bg font-mono text-[13px] font-semibold hover:opacity-90 transition-opacity"
        >
          + Add Project
        </motion.button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 bg-surface animate-pulse border border-border/20"
            />
          ))}
        </div>
      ) : (
        <div className="bg-surface border border-border/20 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface2">
                {['Project', 'Category', 'Status', 'Featured', 'Actions'].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left font-mono text-[10px] text-muted tracking-[0.15em] uppercase border-b border-border/20"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {(data?.data || []).map((p, i) => (
                <motion.tr
                  key={p._id}
                  className="border-b border-border/20 hover:bg-accent/[0.02] transition-colors"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className="px-5 py-4">
                    <div className="font-medium text-[13px] text-white">
                      {p.title}
                    </div>
                    <div className="font-mono text-[11px] text-muted mt-0.5">
                      {p.techStack.slice(0, 3).join(' · ')}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`font-mono text-[11px] px-2.5 py-0.5 rounded-sm ${categoryPills[p.category] || 'bg-accent/10 text-accent'}`}
                    >
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`font-mono text-[11px] px-2.5 py-0.5 border rounded-full ${p.status === 'live' ? 'bg-accent/8 text-accent border-accent/20' : p.status === 'draft' ? 'bg-yellow-400/8 text-yellow-400 border-yellow-400/20' : 'bg-muted/10 text-muted border-border/20'}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`font-mono text-[11px] ${p.featured ? 'text-accent' : 'text-muted'}`}
                    >
                      {p.featured ? '✦ Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditing(p);
                          setView('edit');
                        }}
                        className="px-3 py-1 border border-border/20 text-muted font-mono text-[11px] hover:border-accent hover:text-accent transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDelId(p._id)}
                        className="px-3 py-1 border border-border/20 text-muted font-mono text-[11px] hover:border-red-500/50 hover:text-red-400 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {(!data?.data || data.data.length === 0) && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-muted font-mono text-[13px]"
                  >
                    No projects yet — add your first project above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirm modal */}
      <AnimatePresence>
        {delId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface border border-red-500/30 p-8 max-w-sm w-full"
            >
              <div className="text-[20px] font-display font-bold mb-2">
                Delete project?
              </div>
              <p className="text-muted text-[14px] mb-6">
                This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(delId)}
                  disabled={deleting}
                  className="px-6 py-2.5 bg-red-500/20 border border-red-500/50 text-red-400 font-mono text-[13px] hover:bg-red-500/30 transition-all disabled:opacity-60"
                >
                  {deleting ? 'Deleting...' : 'Yes, delete'}
                </button>
                <button
                  onClick={() => setDelId(null)}
                  className="px-6 py-2.5 border border-border/20 text-muted font-mono text-[13px] hover:border-accent hover:text-accent transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
