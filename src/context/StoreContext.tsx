import React, { createContext, useContext, useState, useEffect } from 'react';
import { Screen, User, Product, CartItem, Order } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface StoreContextType {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  orders: Order[];
  placeOrder: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;
  currency: 'PKR' | 'USD';
  setCurrency: (cur: 'PKR' | 'USD') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<Screen>(Screen.Splash);
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const placeOrder = () => {
    const newOrder: Order = {
      id: 'DS' + Math.floor(Math.random() * 100000000),
      date: new Date().toLocaleDateString(),
      status: 'pending',
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      items: [...cart],
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setScreen(Screen.Success);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <StoreContext.Provider value={{
      screen, setScreen,
      user, setUser,
      products, setProducts, addProduct, updateProduct, deleteProduct,
      cart, addToCart, removeFromCart, updateCartQuantity,
      wishlist, toggleWishlist,
      orders, placeOrder,
      isDarkMode, toggleDarkMode,
      language, setLanguage,
      currency, setCurrency,
      searchQuery, setSearchQuery,
      selectedProduct, setSelectedProduct,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
