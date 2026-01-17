import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FavoritesState, Product} from '../../types/product.types';

const FAVORITES_STORAGE_KEY = '@product_app_favorites';

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
};

export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async (_, {rejectWithValue}) => {
    try {
      const favoritesJSON = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (favoritesJSON) {
        const favorites: Product[] = JSON.parse(favoritesJSON);
        return favorites;
      }
      return [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error loading favorites');
    }
  },
);

const saveFavoritesToStorage = async (favorites: Product[]) => {
  try {
    await AsyncStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites),
    );
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.favorites.find(
        item => item.id === action.payload.id,
      );
      if (!exists) {
        state.favorites.push(action.payload);
        saveFavoritesToStorage(state.favorites);
      }
    },

    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        item => item.id !== action.payload,
      );
      saveFavoritesToStorage(state.favorites);
    },

    clearFavorites: state => {
      state.favorites = [];
      saveFavoritesToStorage([]);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadFavorites.pending, state => {
        state.loading = true;
      })
      .addCase(
        loadFavorites.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.favorites = action.payload;
        },
      )
      .addCase(loadFavorites.rejected, state => {
        state.loading = false;
        state.favorites = [];
      });
  },
});

export const {addFavorite, removeFavorite, clearFavorites} =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
