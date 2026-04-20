import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export default function ProtectedRoute() {
  const { token, initialized, status } = useAppSelector((state) => state.auth);

  if (!initialized || status === 'loading') {
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
