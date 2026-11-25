export type Category = 'Todos' | 'Camisetas' | 'Moletons' | 'Calças' | 'Tênis' | 'Acessórios';

export type SortOption = 'popular' | 'price-asc' | 'price-desc';

export interface Product {
  id: string;
  name: string;
  category: Exclude<Category, 'Todos'>;
  price: number;
  originalPrice?: number;
  image: string;
  tag?: 'Novidade' | 'Oferta' | 'Limitado';
  rating: number;
  reviewsCount: number;
  sizes: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface CheckoutData {
  name: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
  number: string;
  city: string;
  state: string;
  paymentMethod: 'pix' | 'credit';
}