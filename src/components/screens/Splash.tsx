import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen } from '../../types';

export function Splash() {
  const { setScreen } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen(Screen.Onboarding);
    }, 2500);
    return () => clearTimeout(timer);
  }, [setScreen]);

  return (
    <div className="fixed inset-0 bg-linear-to-br from-primary-600 to-accent-blue flex flex-col items-center justify-center text-white z-50">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-6 shadow-black/20"
      >
        <ShoppingBag size={48} className="text-primary-600" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-display font-bold tracking-tight"
      >
        Digital Store
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-primary-100 mt-2 font-medium"
      >
        Smart Shopping. Best Deals.
      </motion.p>
      
      <div className="absolute bottom-12">
        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    </div>
  );
}
