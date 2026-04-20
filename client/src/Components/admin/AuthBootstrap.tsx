import { useEffect } from 'react';
import { refreshSession } from '../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function AuthBootstrap() {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector((state) => state.auth.initialized);

  useEffect(() => {
    if (!initialized) {
      dispatch(refreshSession());
    }
  }, [dispatch, initialized]);

  return null;
}
