import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login as loginApi, register as registerApi } from '../api/authApi';

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

const initialState = {
  user: null,
  status: 'idle',
  error: null
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
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


