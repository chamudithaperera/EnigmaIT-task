import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addFavorite, removeFavorite, getFavorites } from '../api/userApi';

export const fetchFavorites = createAsyncThunk('favorites/fetch', async (_, thunkAPI) => {
  try {
    const data = await getFavorites();
    return data.favorites || [];
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.message || 'Failed to fetch favorites');
  }
});

export const addToFavorites = createAsyncThunk('favorites/add', async (recipe, thunkAPI) => {
  try {
    const data = await addFavorite(recipe);
    return data.favorite;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.message || 'Failed to add favorite');
  }
});

export const removeFromFavorites = createAsyncThunk('favorites/remove', async (recipeId, thunkAPI) => {
  try {
    await removeFavorite(recipeId);
    return recipeId;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.message || 'Failed to remove favorite');
  }
});

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.recipeId !== action.payload);
      });
  }
});

export default favoritesSlice.reducer;
