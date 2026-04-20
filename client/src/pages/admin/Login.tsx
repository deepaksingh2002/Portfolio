import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div id="page-login" className="page page-active">
      <div className="login-orb lorb1"></div>
      <div className="login-orb lorb2"></div>
      <div className="login-wrap">
        <div className="login-logo anim">// yourname.dev / admin</div>
        <h1 className="login-title anim anim-d1">Admin<br /><span style={{ color: 'var(--accent)' }}>Portal</span></h1>
        <p className="login-sub anim anim-d2">Authenticate to manage your portfolio</p>
        <form onSubmit={handleLogin}>
          <div className="form-group anim anim-d2">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="admin@yoursite.dev" />
          </div>
          <div className="form-group anim anim-d3">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••••" />
          </div>
          <button type="submit" className="login-btn anim anim-d4">Access Dashboard →</button>
        </form>
        <div className="login-divider anim anim-d4">or</div>
        <Link to="/" className="back-link anim anim-d4">← Back to portfolio</Link>
      </div>
    </div>
  );
};

export default AdminLogin;
