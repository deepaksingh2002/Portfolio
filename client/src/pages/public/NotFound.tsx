import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div id="page-404" className="page page-active">
      <div className="err-orb1"></div>
      <div className="err-orb2"></div>
      <div className="err-wrap">
        <div className="err-num anim">404</div>
        <h2 className="err-title anim anim-d1">Page Not Found</h2>
        <p className="err-sub anim anim-d2">// this route does not exist</p>
        <div className="err-actions anim anim-d3">
          <button className="save-btn" onClick={() => navigate('/')}>← Go Home</button>
          <button className="cancel-btn" onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
