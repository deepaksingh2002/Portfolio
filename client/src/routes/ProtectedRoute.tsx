import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function ProtectedRoute() {
  const { token, status } = useAuth();


  if (status === 'idle' || status === 'loading') {
    return (
      <div className="page page-active" style={{ padding: '24px', textAlign: 'center' }}>
        Checking session...
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
