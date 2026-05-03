import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen, Product } from '../../types';
import { Button } from '../ui/Button';

export function Wishlist() {
  const { wishlist, setScreen, setSelectedProduct, addToCart } = useStore();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setScreen(Screen.ProductDetail);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="w-48 h-48 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center">
          <Heart size={80} className="text-slate-300" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-display font-bold">Your wishlist is empty</h2>
          <p className="text-slate-500 font-medium max-w-xs mx-auto">Save items you love here and they'll be waiting for you!</p>
        </div>
        <Button onClick={() => setScreen(Screen.Home)} className="px-12">
          Discover Products
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      <header className="p-6 sticky top-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md z-10 flex justify-between items-center">
        <h1 className="text-2xl font-display font-bold">My Wishlist</h1>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{wishlist.length} Items</span>
      </header>

      <div className="px-6 space-y-4">
        <AnimatePresence mode="popLayout">
          {wishlist.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-slate-900 p-3 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-4"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 cursor-pointer" onClick={() => handleProductClick(product)}>
                <img src={product.image} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 flex flex-col justify-center gap-1">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{product.name}</h3>
                <p className="text-primary-600 font-bold">PKR {product.price.toLocaleString()}</p>
                <div className="flex gap-2 mt-2">
                   <Button size="sm" className="h-8 px-4 text-[10px]" onClick={() => addToCart(product)}>Add to Cart</Button>
                   <Button variant="ghost" size="sm" className="h-8 px-4 text-[10px] text-slate-400" onClick={() => handleProductClick(product)}>
                      View
                   </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
