import { motion } from 'framer-motion';
interface Column<T> { key: string; label: string; render?: (row: T) => React.ReactNode; }
interface Props<T> { columns: Column<T>[]; data: T[]; keyFn: (row: T) => string; loading?: boolean; emptyMsg?: string; }
export default function DataTable<T>({ columns, data, keyFn, loading, emptyMsg='No data yet.' }: Props<T>) {
  if (loading) return (
    <div className="bg-surface border border-border/20 overflow-hidden">
      {[1,2,3,4].map(i=><div key={i} className="h-14 border-b border-border/20 animate-pulse bg-surface2/50" />)}
    </div>
  );
  return (
    <div className="bg-surface border border-border/20 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-surface2">
            {columns.map(c=>(
              <th key={c.key} className="px-5 py-3 text-left font-mono text-[10px] text-muted tracking-[0.15em] uppercase border-b border-border/20">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={columns.length} className="px-5 py-10 text-center text-muted font-mono text-[13px]">{emptyMsg}</td></tr>
          ) : data.map((row, i) => (
            <motion.tr key={keyFn(row)}
              className="border-b border-border/20 hover:bg-accent/[0.02] transition-colors"
              initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
              transition={{ delay: i*0.05, duration:0.35 }}>
              {columns.map(c=>(
                <td key={c.key} className="px-5 py-3.5 text-[13px]">
                  {c.render ? c.render(row) : String((row as any)[c.key] ?? '')}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
