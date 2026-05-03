export enum Screen {
  Splash = 'splash',
  Onboarding = 'onboarding',
  Login = 'login',
  Home = 'home',
  Categories = 'categories',
  ProductList = 'product-list',
  ProductDetail = 'product-detail',
  Cart = 'cart',
  Checkout = 'checkout',
  Success = 'success',
  OrderTracking = 'order-tracking',
  MyOrders = 'my-orders',
  Wishlist = 'wishlist',
  Profile = 'profile',
  AdminLogin = 'admin-login',
  AdminDashboard = 'admin-dashboard',
  AdminProducts = 'admin-products',
  AdminOrders = 'admin-orders',
  AdminAnalytics = 'admin-analytics',
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  stock: number;
  isTrending?: boolean;
  isFlashSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: CartItem[];
}
