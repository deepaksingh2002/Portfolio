import { motion } from 'framer-motion';
import { useGetExperienceQuery } from '../../store/api/portfolioApi';

export default function Experience() {
  const { data, isLoading } = useGetExperienceQuery();
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display font-bold text-[28px]">Experience</h1>
          <p className="text-muted font-mono text-[12px] mt-1">
            // work timeline
          </p>
        </div>
        <button className="px-6 py-2.5 bg-accent text-bg font-mono text-[13px] font-semibold hover:opacity-90 transition-opacity">
          + Add Role
        </button>
      </div>
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-surface animate-pulse border border-border/20"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {(data?.data || []).map((exp, i) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-surface border border-border/20 p-6 ${exp.current ? 'border-l-2 border-l-accent' : ''}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-mono text-[11px] text-accent mb-1">
                    {exp.period}
                  </div>
                  <div className="font-display font-bold text-[20px]">
                    {exp.role}
                  </div>
                  <div className="text-muted text-[14px]">
                    @ <span className="text-accent2">{exp.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {exp.current && (
                    <span className="font-mono text-[10px] px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 rounded-full">
                      Current
                    </span>
                  )}
                  <button className="px-3 py-1 border border-border/20 text-muted font-mono text-[11px] hover:border-accent hover:text-accent transition-all">
                    Edit
                  </button>
                </div>
              </div>
              <p className="text-[#6a7494] text-[13px] leading-[1.7]">
                {exp.description}
              </p>
            </motion.div>
          ))}
          {(!data?.data || data.data.length === 0) && (
            <div className="text-center py-12 text-muted font-mono text-[13px]">
              No experience entries yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
