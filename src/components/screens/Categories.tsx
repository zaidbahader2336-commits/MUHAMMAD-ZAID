import { motion } from 'motion/react';
import { ChevronRight, Search } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen } from '../../types';
import { CATEGORIES } from '../../constants';
import { Input } from '../ui/Input';

export function Categories() {
  const { setScreen } = useStore();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      <header className="px-6 pt-8 pb-4 space-y-4 sticky top-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md z-10">
        <h1 className="text-2xl font-display font-bold">Categories</h1>
        <Input 
          placeholder="Search categories..." 
          icon={<Search size={18} />}
          className="h-12 border-none shadow-sm"
        />
      </header>

      <div className="px-6 grid grid-cols-1 gap-3">
        {CATEGORIES.map((cat, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.02 }}
            onClick={() => setScreen(Screen.ProductList)}
            className="bg-white dark:bg-slate-900 flex items-center justify-between p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-primary-200 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center font-bold">
                {cat[0]}
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{cat}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">120+ Products</span>
              <ChevronRight size={18} className="text-slate-300" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
