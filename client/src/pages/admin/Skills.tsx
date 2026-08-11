import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useGetSkillsQuery,
  useAddSkillMutation,
  useDeleteSkillMutation,
} from '../../store/api/portfolioApi';

const CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Tools',
  'Other',
];
const catColors: Record<string, string> = {
  Frontend: 'text-blue-400',
  Backend: 'text-green-400',
  Database: 'text-yellow-400',
  DevOps: 'text-purple-400',
  Tools: 'text-pink-400',
  Other: 'text-muted',
};

export default function Skills() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [proficiency, setProf] = useState(3);
  const { data, isLoading } = useGetSkillsQuery();
  const [addSkill, { isLoading: adding }] = useAddSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

  const handleAdd = async () => {
    if (!name.trim()) return;
    await addSkill({
      name: name.trim(),
      category,
      proficiency,
    } as any).unwrap();
    setName('');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display font-bold text-[28px]">Skills</h1>
          <p className="text-muted font-mono text-[12px] mt-1">
            // {data?.data?.length ?? 0} skills
          </p>
        </div>
      </div>

      {/* Add form */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-border/20 p-6 mb-6"
      >
        <div className="font-mono text-[11px] text-accent tracking-[0.15em] uppercase mb-4">
          Add New Skill
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd();
            }}
            placeholder="Skill name (e.g. React)"
            className="px-4 py-3 bg-surface2 border border-border/20 text-white font-body text-[13px] outline-none focus:border-accent transition-colors placeholder:text-muted"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 bg-surface2 border border-border/20 text-white font-body text-[13px] outline-none focus:border-accent"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[12px] text-muted">
              Proficiency:
            </span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setProf(n)}
                className={`w-7 h-7 font-mono text-[11px] border transition-all ${n <= proficiency ? 'bg-accent text-bg border-accent' : 'border-border/20 text-muted hover:border-accent'}`}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            onClick={handleAdd}
            disabled={adding || !name.trim()}
            className="px-6 py-3 bg-accent text-bg font-mono text-[13px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {adding ? 'Adding...' : 'Add Skill'}
          </button>
        </div>
      </motion.div>

      {/* Skills grouped */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-16 bg-surface animate-pulse border border-border/20"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {CATEGORIES.filter(
            (cat) => (data?.grouped?.[cat]?.length ?? 0) > 0
          ).map((cat) => (
            <div key={cat}>
              <div
                className={`font-mono text-[11px] tracking-[0.2em] uppercase mb-3 ${catColors[cat]}`}
              >
                {cat}
              </div>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {(data?.grouped?.[cat] || []).map((s: any, i: number) => (
                    <motion.div
                      key={s._id}
                      layout
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-3 px-4 py-2.5 bg-surface border border-border/20 group hover:border-accent/30 transition-all"
                    >
                      <div>
                        <div className="font-mono text-[12px] text-white">
                          {s.name}
                        </div>
                        <div className="flex gap-0.5 mt-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <div
                              key={n}
                              className={`w-3 h-1 rounded-full ${n <= s.proficiency ? 'bg-accent' : 'bg-muted/20'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteSkill(s._id)}
                        className="text-muted hover:text-red-400 transition-colors text-[14px] opacity-0 group-hover:opacity-100 ml-1"
                      >
                        ×
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
          {(!data?.data || data.data.length === 0) && (
            <div className="text-center py-12 text-muted font-mono text-[13px]">
              No skills yet — add your first one above.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
