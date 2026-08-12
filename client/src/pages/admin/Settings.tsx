import { motion } from 'framer-motion';
import { useAppSelector } from '../../store/hooks';

const FI =
  'w-full px-4 py-3 bg-surface2 border border-border/20 text-white font-body text-[13px] outline-none transition-colors placeholder:text-muted focus:border-accent';

export default function Settings() {
  const admin = useAppSelector((s) => s.auth.admin);
  return (
    <div className="p-8">
      <h1 className="font-display font-bold text-[28px] mb-8">Settings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border/20 p-6"
        >
          <div className="font-mono text-[11px] text-accent tracking-[0.15em] uppercase mb-5 pb-4 border-b border-border/20">
            Profile
          </div>
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[11px] text-accent tracking-[0.1em] uppercase mb-2">
                Display Name
              </label>
              <input className={FI} defaultValue={admin?.name} />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-accent tracking-[0.1em] uppercase mb-2">
                Email
              </label>
              <input className={FI} defaultValue={admin?.email} type="email" />
            </div>
            <button className="px-6 py-3 bg-accent text-bg font-mono text-[13px] font-semibold hover:opacity-90 transition-opacity">
              Save Changes →
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-border/20 p-6"
        >
          <div className="font-mono text-[11px] text-accent tracking-[0.15em] uppercase mb-5 pb-4 border-b border-border/20">
            Change Password
          </div>
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[11px] text-accent tracking-[0.1em] uppercase mb-2">
                Current Password
              </label>
              <input className={FI} type="password" placeholder="••••••••" />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-accent tracking-[0.1em] uppercase mb-2">
                New Password
              </label>
              <input className={FI} type="password" placeholder="••••••••" />
            </div>
            <button className="px-6 py-3 bg-accent text-bg font-mono text-[13px] font-semibold hover:opacity-90 transition-opacity">
              Update Password →
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-red-500/5 border border-red-500/20 p-6"
        >
          <div className="font-mono text-[11px] text-red-400 tracking-[0.15em] uppercase mb-4">
            Danger Zone
          </div>
          <div className="flex items-center justify-between py-3 border-b border-red-500/10">
            <div>
              <div className="text-[13px] font-medium">Clear all messages</div>
              <div className="text-muted text-[12px]">
                Permanently delete all contact messages
              </div>
            </div>
            <button className="px-4 py-2 border border-red-500/40 text-red-400 font-mono text-[12px] hover:bg-red-500/10 transition-all">
              Clear
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
