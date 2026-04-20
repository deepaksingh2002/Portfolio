import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from '../../lib/api';

interface AdminUser {
  id: string;
  email: string;
}

interface AuthResponse {
  accessToken: string;
  admin: AdminUser;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthState {
  token: string | null;
  user: AdminUser | null;
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated';
  initialized: boolean;
  error: string | null;
}

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return (
      (typeof error.response?.data?.message === 'string' && error.response.data.message) ||
      error.message
    );
  }

  return 'Something went wrong';
};

export const loginAdmin = createAsyncThunk<AuthResponse, LoginPayload, { rejectValue: string }>(
  'auth/loginAdmin',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const refreshSession = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: string }
>('auth/refreshSession', async (_, { rejectWithValue }) => {
  try {
    const response = await api.post<AuthResponse>('/auth/refresh');
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchCurrentAdmin = createAsyncThunk<
  { admin: AdminUser },
  void,
  { state: { auth: AuthState }; rejectValue: string }
>('auth/fetchCurrentAdmin', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await api.get<{ admin: AdminUser }>('/auth/me', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const logoutAdmin = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logoutAdmin',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState: AuthState = {
  token: null,
  user: null,
  status: 'idle',
  initialized: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.status = action.payload ? 'authenticated' : 'unauthenticated';
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.status = 'unauthenticated';
      state.error = null;
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.user = action.payload.admin;
        state.status = 'authenticated';
        state.initialized = true;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.token = null;
        state.user = null;
        state.status = 'unauthenticated';
        state.initialized = true;
        state.error = action.payload || 'Login failed';
      })
      .addCase(refreshSession.pending, (state) => {
        if (!state.initialized) {
          state.status = 'loading';
        }
        state.error = null;
      })
      .addCase(refreshSession.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.user = action.payload.admin;
        state.status = 'authenticated';
        state.initialized = true;
        state.error = null;
      })
      .addCase(refreshSession.rejected, (state, action) => {
        state.token = null;
        state.user = null;
        state.status = 'unauthenticated';
        state.initialized = true;
        state.error = action.payload || 'Session refresh failed';
      })
      .addCase(fetchCurrentAdmin.fulfilled, (state, action) => {
        state.user = action.payload.admin;
        if (state.token) {
          state.status = 'authenticated';
        }
      })
      .addCase(fetchCurrentAdmin.rejected, (state, action) => {
        state.error = action.payload || 'Failed to load admin';
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.status = 'unauthenticated';
        state.initialized = true;
        state.error = null;
      })
      .addCase(logoutAdmin.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.status = 'unauthenticated';
        state.initialized = true;
      });
  },
});

export const { setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
