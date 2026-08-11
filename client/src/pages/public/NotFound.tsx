import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="bg-bg min-h-screen flex items-center justify-center text-center px-6">
      <div className="absolute rounded-full blur-[80px] w-[400px] h-[400px] bg-accent/5 -top-24 -left-24 pointer-events-none" />
      <div className="absolute rounded-full blur-[80px] w-[300px] h-[300px] bg-accent2/4 bottom-0 right-0 pointer-events-none" />
      <div className="relative z-10">
        <div
          className="font-display font-extrabold leading-none tracking-[-0.05em] mb-4 text-transparent"
          style={{
            fontSize: 'clamp(120px, 20vw, 240px)',
            WebkitTextStroke: '1px rgba(100,255,218,0.2)',
          }}
        >
          404
        </div>
        <h2 className="font-display font-bold text-[32px] mb-3">
          Page Not Found
        </h2>
        <p className="font-mono text-[13px] text-muted mb-10">
          // this route does not exist
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="px-8 py-3.5 bg-accent text-bg font-mono text-[13px] font-semibold no-underline hover:opacity-90 transition-opacity"
          >
            ← Go Home
          </Link>
          <Link
            to="/admin"
            className="px-8 py-3.5 border border-border/20 text-muted font-mono text-[13px] no-underline hover:border-accent hover:text-accent transition-all"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
