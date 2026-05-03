import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Share2, Heart, Star, ShoppingBag, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

export function ProductDetail() {
  const { selectedProduct, setScreen, addToCart, toggleWishlist, wishlist } = useStore();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) {
    setScreen(Screen.Home);
    return null;
  }

  const isWishlisted = wishlist.some(p => p.id === selectedProduct.id);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-24">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center p-6 bg-white/20 dark:bg-black/20 backdrop-blur-sm">
        <button 
          onClick={() => setScreen(Screen.Home)}
          className="p-2.5 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-100 dark:border-slate-800"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-3">
          <button className="p-2.5 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-100 dark:border-slate-800">
            <Share2 size={20} />
          </button>
          <button 
            onClick={() => toggleWishlist(selectedProduct)}
            className={cn(
              "p-2.5 rounded-xl shadow-md border border-slate-100 dark:border-slate-800 transition-all",
              isWishlisted ? "bg-red-500 text-white" : "bg-white dark:bg-slate-900"
            )}
          >
            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative aspect-square bg-slate-50 dark:bg-slate-900">
        <motion.img
          key={activeImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={selectedProduct.images[activeImage] || selectedProduct.image}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {selectedProduct.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                i === activeImage ? "w-6 bg-primary-600" : "bg-white/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-8 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <Badge variant="success" className="mb-2">In Stock</Badge>
              <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white leading-tight">
                {selectedProduct.name}
              </h1>
            </div>
            <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
              <Star size={16} fill="currentColor" />
              <span>{selectedProduct.rating}</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-display font-bold text-primary-600">PKR {selectedProduct.price.toLocaleString()}</span>
            {selectedProduct.originalPrice && (
              <span className="text-lg text-slate-400 line-through font-medium italic">PKR {selectedProduct.originalPrice.toLocaleString()}</span>
            )}
            {selectedProduct.originalPrice && (
              <Badge variant="error" className="h-6">
                {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-3 gap-4 border-y border-slate-100 dark:border-slate-800 py-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <Truck size={20} className="text-primary-500" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Free Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center border-x border-slate-100 dark:border-slate-800">
            <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <ShieldCheck size={20} className="text-primary-500" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">1 Year Warranty</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <ShoppingBag size={20} className="text-primary-500" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Verified Store</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg dark:text-white">Product Description</h3>
          <p className="text-slate-500 leading-relaxed font-medium">
            {selectedProduct.description}
          </p>
        </div>

        {/* Quantity Selection */}
        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl">
          <span className="font-bold text-slate-700 dark:text-slate-300">Quantity</span>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xl shadow-sm"
            >
              -
            </button>
            <span className="font-display font-bold text-lg w-4 text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xl shadow-sm"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 flex gap-4 z-40">
        <Button 
          variant="outline" 
          className="flex-1 h-14 rounded-2xl border-primary-600/20"
          onClick={() => {
            for(let i=0; i<quantity; i++) addToCart(selectedProduct);
            setScreen(Screen.Cart);
          }}
        >
          Add to Cart
        </Button>
        <Button 
          className="flex-2 h-14 rounded-2xl text-lg shadow-xl shadow-primary-500/20"
          onClick={() => {
             for(let i=0; i<quantity; i++) addToCart(selectedProduct);
             setScreen(Screen.Checkout);
          }}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
