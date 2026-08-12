import { motion } from 'framer-motion';
import StatCard from '../../components/admin/StatCard';
import {
  useGetProjectsQuery,
  useGetMessagesQuery,
  useGetSkillsQuery,
} from '../../store/api/portfolioApi';

export default function Overview() {
  const { data: pd } = useGetProjectsQuery({ status: 'live' } as any);
  const { data: md } = useGetMessagesQuery();
  const { data: sd } = useGetSkillsQuery();

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display font-bold text-[28px]">Dashboard</h1>
        <p className="text-muted font-mono text-[12px] mt-1">
          // portfolio overview
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Live Projects"
          value={pd?.count ?? '—'}
          icon="◈"
          color="accent"
          index={0}
          change={`${sd?.data?.length ?? 0} skills listed`}
        />
        <StatCard
          label="Messages"
          value={md?.data?.length ?? '—'}
          icon="◷"
          color="blue"
          index={1}
          change={`${md?.unread ?? 0} unread`}
        />
        <StatCard
          label="Unread"
          value={md?.unread ?? '—'}
          icon="★"
          color="amber"
          index={2}
          change="inbox notifications"
        />
        <StatCard
          label="Skills"
          value={sd?.data?.length ?? '—'}
          icon="✦"
          color="red"
          index={3}
          change="across all categories"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent messages */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-surface border border-border/20 p-6"
        >
          <div className="font-mono text-[11px] text-muted tracking-[0.15em] uppercase mb-5">
            Recent Messages
          </div>
          {(md?.data || []).slice(0, 4).map((msg, i) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              className={`flex gap-3 py-3 border-b border-border/20 last:border-0 ${!msg.read ? 'border-l-2 border-l-accent pl-3' : ''}`}
            >
              <div
                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${msg.read ? 'bg-muted/40' : 'bg-accent'}`}
              />
              <div className="min-w-0">
                <div className="text-[13px] font-medium truncate">
                  {msg.name}{' '}
                  {!msg.read && (
                    <span className="font-mono text-[10px] text-accent ml-2">
                      NEW
                    </span>
                  )}
                </div>
                <div className="text-[12px] text-muted truncate">
                  {msg.subject}
                </div>
              </div>
              <div className="font-mono text-[10px] text-muted ml-auto flex-shrink-0 mt-0.5">
                {new Date(msg.createdAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
          {(!md?.data || md.data.length === 0) && (
            <div className="text-center py-6 text-muted font-mono text-[13px]">
              No messages yet
            </div>
          )}
        </motion.div>

        {/* Quick bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface border border-border/20 p-6"
        >
          <div className="font-mono text-[11px] text-muted tracking-[0.15em] uppercase mb-5">
            Monthly Views (mock)
          </div>
          <div className="flex items-end gap-2 h-28">
            {[40, 55, 38, 70, 60, 85, 75, 90, 65, 80, 95, 100].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 flex flex-col items-center gap-1"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  delay: 0.5 + i * 0.04,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ originY: 'bottom' }}
              >
                <div
                  className="w-full rounded-t-sm hover:bg-accent/40 transition-colors cursor-default"
                  style={{
                    height: `${h}%`,
                    background:
                      i === 11
                        ? 'rgba(100,255,218,0.35)'
                        : 'rgba(100,255,218,0.12)',
                    borderTop: '1px solid rgba(100,255,218,0.4)',
                  }}
                />
                <span className="font-mono text-[9px] text-muted">
                  {
                    [
                      'J',
                      'F',
                      'M',
                      'A',
                      'M',
                      'J',
                      'J',
                      'A',
                      'S',
                      'O',
                      'N',
                      'D',
                    ][i]
                  }
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
