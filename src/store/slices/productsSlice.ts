import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {ProductsState, Product} from '../../types/product.types';
import {
  fetchProducts as fetchProductsAPI,
  fetchProductById as fetchProductByIdAPI,
} from '../../services/api/products.api';

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetchProductsAPI();
      return response.products;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error fetching products');
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number, {rejectWithValue}) => {
    try {
      const product = await fetchProductByIdAPI(id);
      return product;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error fetching product');
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: state => {
      state.selectedProduct = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchProductById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.selectedProduct = action.payload;
        },
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearSelectedProduct} = productsSlice.actions;
export default productsSlice.reducer;
