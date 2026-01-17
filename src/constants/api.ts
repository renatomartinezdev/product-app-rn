export const API_CONFIG = {
  BASE_URL: 'https://dummyjson.com',
  ENDPOINTS: {
    PRODUCTS: '/products',
    PRODUCT_BY_ID: (id: number) => `/products/${id}`,
    SEARCH: '/products/search',
    CATEGORIES: '/products/categories',
  },
  LIMITS: {
    PRODUCTS_PER_PAGE: 20,
  },
};
