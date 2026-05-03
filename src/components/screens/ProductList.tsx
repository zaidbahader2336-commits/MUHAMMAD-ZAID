import { motion } from 'motion/react';
import { ChevronLeft, SlidersHorizontal, Search } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen, Product } from '../../types';
import { MOCK_PRODUCTS } from '../../constants';
import { ProductCard } from '../ui/ProductCard';
import { Button } from '../ui/Button';

export function ProductList() {
  const { setScreen, setSelectedProduct, products } = useStore();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setScreen(Screen.ProductDetail);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      <header className="px-6 pt-8 pb-4 sticky top-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md z-10 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setScreen(Screen.Home)} className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-display font-bold">Electronics</h1>
            <p className="text-xs text-slate-500 font-medium">{products.length} items found</p>
          </div>
          <button className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
            <SlidersHorizontal size={20} className="text-primary-600" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {['All', 'Headphones', 'Laptops', 'Cameras', 'Smart Home', 'Accessories'].map((tag, i) => (
             <button 
               key={i} 
               className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  i === 0 ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' : 'bg-white dark:bg-slate-900 text-slate-500 border border-slate-100 dark:border-slate-800'
               }`}
             >
               {tag}
             </button>
          ))}
        </div>
      </header>

      <div className="px-6 grid grid-cols-2 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => handleProductClick(product)} 
          />
        ))}
      </div>

      <div className="p-12 text-center">
         <div className="flex flex-col items-center gap-3">
           <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
           <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading More...</p>
         </div>
      </div>
    </div>
  );
}
