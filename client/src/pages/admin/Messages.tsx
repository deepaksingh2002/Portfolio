import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useGetMessagesQuery,
  useMarkReadMutation,
  useDeleteMessageMutation,
} from '../../store/api/portfolioApi';

export default function Messages() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const { data, isLoading } = useGetMessagesQuery();
  const [markRead] = useMarkReadMutation();
  const [deleteMsg] = useDeleteMessageMutation();

  const messages = (data?.data || []).filter((m) => {
    if (filter === 'unread') return !m.read;
    if (filter === 'read') return m.read;
    return true;
  });

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-[28px]">Messages</h1>
          <p className="text-muted font-mono text-[12px] mt-1">
            // {data?.data?.length ?? 0} total ·{' '}
            <span className="text-accent">{data?.unread ?? 0} unread</span>
          </p>
        </div>
        <div className="flex gap-2">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-mono text-[12px] border transition-all ${filter === f ? 'border-accent text-accent bg-accent/5' : 'border-border/20 text-muted hover:text-white'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'unread' && data?.unread ? ` (${data.unread})` : ''}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-surface animate-pulse border border-border/20"
            />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-surface border border-border/20 py-16 text-center">
          <div className="font-mono text-[13px] text-muted">
            No {filter !== 'all' ? filter : ''} messages
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={msg._id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className={`bg-surface border border-border/20 p-5 hover:border-accent/30 transition-colors ${!msg.read ? 'border-l-2 border-l-accent' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${msg.read ? 'bg-muted/40' : 'bg-accent animate-pulse'}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-medium text-[14px]">
                          {msg.name}
                        </span>
                        {!msg.read && (
                          <span className="font-mono text-[10px] px-2 py-0.5 bg-accent/10 text-accent border border-accent/20">
                            NEW
                          </span>
                        )}
                        <span className="text-muted text-[12px]">
                          · {msg.email}
                        </span>
                      </div>
                      <div className="text-[13px] text-accent2 mb-1">
                        {msg.subject}
                      </div>
                      <AnimatePresence>
                        {expanded === msg._id ? (
                          <motion.p
                            key="full"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[13px] text-muted leading-[1.7]"
                          >
                            {msg.message}
                          </motion.p>
                        ) : (
                          <motion.p
                            key="short"
                            className="text-[13px] text-muted truncate"
                          >
                            {msg.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="font-mono text-[11px] text-muted flex-shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 ml-5">
                  <button
                    onClick={() =>
                      setExpanded(expanded === msg._id ? null : msg._id)
                    }
                    className="px-3 py-1 border border-border/20 text-muted font-mono text-[11px] hover:border-accent hover:text-accent transition-all"
                  >
                    {expanded === msg._id ? 'Collapse' : 'Read more'}
                  </button>
                  {!msg.read && (
                    <button
                      onClick={() => markRead(msg._id)}
                      className="px-3 py-1 border border-border/20 text-muted font-mono text-[11px] hover:border-accent hover:text-accent transition-all"
                    >
                      Mark read
                    </button>
                  )}
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                    className="px-3 py-1 border border-border/20 text-muted font-mono text-[11px] hover:border-blue-400/50 hover:text-blue-400 transition-all no-underline"
                  >
                    Reply ↗
                  </a>
                  <button
                    onClick={() => deleteMsg(msg._id)}
                    className="px-3 py-1 border border-border/20 text-muted font-mono text-[11px] hover:border-red-500/50 hover:text-red-400 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
