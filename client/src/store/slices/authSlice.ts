import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Admin } from '../../types';

interface AuthState {
  token: string | null;
  admin: Admin | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('portfolio_token'),
  admin: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; admin: Admin }>
    ) => {
      state.token = action.payload.token;
      state.admin = action.payload.admin;
      state.error = null;
      localStorage.setItem('portfolio_token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.admin = null;
      localStorage.removeItem('portfolio_token');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
