import { motion } from 'framer-motion';
interface Props { label:string; value:string|number; change?:string; icon:string; color?:'accent'|'amber'|'blue'|'red'; index?:number; }
const colors = {
  accent: { num:'text-accent',  bar:'from-accent',       bg:'bg-accent/5',  border:'border-accent/20' },
  amber:  { num:'text-yellow-400', bar:'from-yellow-400', bg:'bg-yellow-400/5', border:'border-yellow-400/20' },
  blue:   { num:'text-blue-400',   bar:'from-blue-400',   bg:'bg-blue-400/5',   border:'border-blue-400/20' },
  red:    { num:'text-red-400',    bar:'from-red-400',     bg:'bg-red-400/5',    border:'border-red-400/20' },
};
export default function StatCard({ label, value, change, icon, color='accent', index=0 }: Props) {
  const c = colors[color];
  return (
    <motion.div
      className={`relative bg-surface border border-border/20 p-6 overflow-hidden group hover:border-accent/30 transition-colors`}
      initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:0.5, ease:[0.16,1,0.3,1], delay: index*0.08 }}>
      <motion.div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${c.bar} to-transparent origin-left`}
        initial={{ scaleX:0 }} animate={{ scaleX:1 }}
        transition={{ duration:0.6, delay: 0.3 + index*0.08 }} />
      <div className="absolute right-4 top-4 text-[32px] opacity-[0.07]">{icon}</div>
      <div className="font-mono text-[11px] text-muted tracking-[0.15em] uppercase mb-3">{label}</div>
      <div className={`font-display font-extrabold text-[38px] leading-none mb-2 ${c.num}`}>{value}</div>
      {change && <div className="font-mono text-[12px] text-muted">{change}</div>}
    </motion.div>
  );
}
