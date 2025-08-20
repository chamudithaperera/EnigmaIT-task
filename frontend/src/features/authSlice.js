import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login as loginApi, register as registerApi, profile as profileApi, logout as logoutApi } from '../api/authApi';

export const registerUser = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  try {
    const data = await registerApi(payload);
    return data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.message || 'Registration failed');
  }
});

export const loginUser = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  try {
    const data = await loginApi(payload);
    return data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.message || 'Login failed');
  }
});

export const hydrateUser = createAsyncThunk('auth/hydrate', async (_, thunkAPI) => {
  try {
    const data = await profileApi();
    return data.user;
  } catch (err) {
    return null;
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  return true;
});

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  isHydrating: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateUser.pending, (state) => {
        state.isHydrating = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Registration failed';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      })
      .addCase(hydrateUser.fulfilled, (state, action) => {
        state.isHydrating = false;
        if (action.payload) state.user = action.payload;
      })
      .addCase(hydrateUser.rejected, (state) => {
        state.isHydrating = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


