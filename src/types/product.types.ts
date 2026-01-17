export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductsState {
  products: Product[];        
  loading: boolean;          
  error: string | null;      
  selectedProduct: Product | null; 
}

export interface FavoritesState {
  favorites: Product[];       
  loading: boolean; 
}