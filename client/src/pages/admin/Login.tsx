import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAdmin } from '../../store/slices/authSlice';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, status, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginAdmin({ email, password }));
    if (loginAdmin.fulfilled.match(result)) {
      navigate('/admin/dashboard', { replace: true });
    }
  };

  return (
    <div id="page-login" className="page page-active">
      <div className="login-orb lorb1"></div>
      <div className="login-orb lorb2"></div>
      <div className="login-wrap">
        <div className="login-logo anim">// yourname.dev / admin</div>
        <h1 className="login-title anim anim-d1">
          Admin
          <br />
          <span style={{ color: 'var(--accent)' }}>Portal</span>
        </h1>
        <p className="login-sub anim anim-d2">Authenticate to manage your portfolio</p>
        {error ? (
          <p className="login-sub anim anim-d2" style={{ color: '#ff6b6b', marginBottom: '16px' }}>
            {error}
          </p>
        ) : null}
        <form onSubmit={handleLogin}>
          <div className="form-group anim anim-d2">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="admin@yoursite.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="form-group anim anim-d3">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-btn anim anim-d4" disabled={status === 'loading'}>
            {status === 'loading' ? 'Signing in...' : 'Access Dashboard ->'}
          </button>
        </form>
        <div className="login-divider anim anim-d4">or</div>
        <Link to="/" className="back-link anim anim-d4">
          {'<- Back to portfolio'}
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
