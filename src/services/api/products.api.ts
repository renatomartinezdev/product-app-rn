import apiClient from './axios.config';
import {API_CONFIG} from '../../constants/api';
import {Product, ProductsResponse} from '../../types/product.types';

//Obtener lista de productos
export const fetchProducts = async (
  limit: number = API_CONFIG.LIMITS.PRODUCTS_PER_PAGE,
  skip: number = 0,
): Promise<ProductsResponse> => {
  try {
    const response = await apiClient.get<ProductsResponse>(
      `${API_CONFIG.ENDPOINTS.PRODUCTS}?limit=${limit}&skip=${skip}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

//Obtener un producto por ID
export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await apiClient.get<Product>(
      API_CONFIG.ENDPOINTS.PRODUCT_BY_ID(id),
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

//Buscar productos por término
export const searchProducts = async (query: string): Promise<ProductsResponse> => {
  try {
    const response = await apiClient.get<ProductsResponse>(
      `${API_CONFIG.ENDPOINTS.SEARCH}?q=${query}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};