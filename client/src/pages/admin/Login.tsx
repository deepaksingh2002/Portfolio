import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../../store/api/portfolioApi';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../store/slices/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ token: res.token, admin: res.admin }));
      navigate(from, { replace: true });
    } catch {}
  };

  return (
    <div
      className="bg-bg min-h-screen flex items-center justify-center px-6"
      style={{
        backgroundImage:
          'linear-gradient(rgba(100,255,218,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(100,255,218,.02) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    >
      <div className="w-full max-w-md">
        <div className="font-mono text-[13px] text-accent tracking-[0.15em] mb-12 text-center">
          // yourname.dev / admin
        </div>
        <h1 className="font-display font-extrabold text-[48px] leading-none tracking-[-0.02em] mb-2">
          Admin
          <br />
          <span className="text-accent">Portal</span>
        </h1>
        <p className="font-mono text-[13px] text-muted mb-10">
          Authenticate to manage your portfolio
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-mono text-[11px] text-accent tracking-[0.15em] uppercase mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-surface border border-border/20 text-white font-mono text-[13px] outline-none transition-colors placeholder:text-muted focus:border-accent"
              placeholder="admin@portfolio.dev"
              required
            />
          </div>
          <div>
            <label className="block font-mono text-[11px] text-accent tracking-[0.15em] uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-surface border border-border/20 text-white font-mono text-[13px] outline-none transition-colors placeholder:text-muted focus:border-accent"
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <p className="text-red-400 font-mono text-[12px]">
              Invalid credentials. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-accent text-bg font-mono text-[13px] font-semibold border-none cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-60 mt-2"
          >
            {isLoading ? 'Authenticating...' : 'Access Dashboard →'}
          </button>
        </form>
        <a
          href="/"
          className="block text-center font-mono text-[12px] text-muted no-underline mt-8 hover:text-accent transition-colors"
        >
          ← Back to portfolio
        </a>
      </div>
    </div>
  );
}
