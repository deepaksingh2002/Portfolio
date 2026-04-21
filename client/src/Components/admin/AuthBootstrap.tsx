
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AuthBootstrap() {
  const { status, refreshSession } = useAuth();

  useEffect(() => {
    if (status === 'idle') {
      refreshSession();
    }
  }, [status, refreshSession]);

  return null;
}
