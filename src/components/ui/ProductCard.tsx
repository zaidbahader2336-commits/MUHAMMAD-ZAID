import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Badge } from './Badge';
import { Button } from './Button';
import { cn } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  key?: string | number;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { toggleWishlist, wishlist, addToCart } = useStore();
  const isWishlisted = wishlist.some(p => p.id === product.id);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-card hover:shadow-premium transition-all duration-300 border border-slate-100 dark:border-slate-800"
    >
      <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={onClick}>
        <div className="w-full h-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          {product.isTrending && (
            <Badge className="bg-indigo-600 text-white border-none shadow-sm">Trending</Badge>
          )}
          {discount > 0 && (
            <Badge variant="error" className="shadow-sm">-{discount}%</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={cn(
            "absolute top-4 right-4 p-2 rounded-xl backdrop-blur-md transition-all duration-300 shadow-sm border border-white/20",
            isWishlisted 
              ? "bg-rose-500 text-white border-rose-400" 
              : "bg-white/90 text-slate-400 hover:text-slate-600"
          )}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Quick Add Button */}
        <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-10 h-10 shadow-premium bg-slate-900 dark:bg-white dark:text-slate-900"
          >
            <ShoppingCart size={18} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-1.5 cursor-pointer" onClick={onClick}>
        <div className="flex justify-between items-start mb-0.5">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 line-clamp-1 flex-1">{product.name}</h3>
          <div className="flex items-center text-xs text-amber-500 font-bold ml-2">
            <Star size={12} fill="currentColor" className="mr-0.5" />
            {product.rating}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-slate-900 dark:text-white">PKR {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-[10px] text-slate-400 line-through font-medium">
                  {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.stock <= 3 ? (
              <p className="text-[10px] font-bold text-rose-500 uppercase">Only {product.stock} left!</p>
            ) : (
              <p className="text-[10px] font-bold text-emerald-500 uppercase">In Stock</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
