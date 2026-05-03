import { Product } from './types';

export const CATEGORIES = [
  'Electronics', 'Fashion', 'Home & Living', 'Beauty & Health', 
  'Sports & Outdoors', 'Toys & Games', 'Automotive', 'Books & Media', 
  'Groceries', 'Smart Home', 'Accessories', 'Furniture', 'Kitchen',
  'Pet Supplies', 'Office', 'Garden', 'Tools', 'Jewelry', 'Watches',
  'Shoes', 'Bags', 'Gaming', 'Music', 'Baby Care', 'Vitamins',
  'Skin Care', 'Hair Care', 'Makeup', 'Fragrances', 'Cameras',
  'Audio', 'Phones', 'Computers', 'Tablets', 'Laptops', 'Networking',
  'Software', 'TV & Video', 'Headphones', 'Speakers', 'Wearables',
  'Storage', 'Printers', 'Monitors', 'Peripherals', 'Components',
  'Industrial', 'Scientific', 'Safety', 'Arts & Crafts', 'Stationery'
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise Canceling Headphones',
    price: 4999,
    originalPrice: 7999,
    category: 'Electronics',
    rating: 4.8,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
    ],
    description: 'Experience pure sound with our flagship noise-canceling headphones. Perfect for travel, work, and everything in between.',
    stock: 5,
    isTrending: true,
    isFlashSale: true,
  },
  {
    id: '2',
    name: 'Smart Watch Series 7',
    price: 3299,
    originalPrice: 4500,
    category: 'Wearables',
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1546868889-4e0c681995b8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1546868889-4e0c681995b8?w=800&q=80'
    ],
    description: 'Track your health and stay connected with the most advanced smart watch yet.',
    stock: 12,
    isTrending: true,
  },
  {
    id: '3',
    name: 'Premium Leather Sneakers',
    price: 5499,
    category: 'Fashion',
    rating: 4.9,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
    ],
    description: 'Handcrafted leather sneakers for the modern explorer. Comfort meets style.',
    stock: 3,
    isFlashSale: true,
  },
  {
    id: '4',
    name: 'Ultra Slim Laptop',
    price: 89999,
    originalPrice: 105000,
    category: 'Computers',
    rating: 4.7,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80'
    ],
    description: 'Powerful performance in a thin, lightweight design that goes wherever you do.',
    stock: 8,
  },
  {
    id: '5',
    name: 'Mechanical Gaming Keyboard',
    price: 2499,
    category: 'Electronics',
    rating: 4.5,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80'
    ],
    description: 'RGB backlit mechanical keyboard for the ultimate gaming experience.',
    stock: 15,
  },
  {
    id: '6',
    name: 'DSLR Camera 4K',
    price: 45999,
    category: 'Cameras',
    rating: 4.8,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80'
    ],
    description: 'Capture every moment in stunning 4K resolution with our latest DSLR camera.',
    stock: 2,
    isTrending: true,
  }
];
