import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Download, Package } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen } from '../../types';
import { Button } from '../ui/Button';

export function Success() {
  const { setScreen, orders } = useStore();
  const latestOrder = orders[0];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-8 text-center space-y-8">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 10, stiffness: 200 }}
        className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/20"
      >
        <CheckCircle2 size={64} className="text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Order Placed Successfully!</h1>
        <p className="text-slate-500 font-medium max-w-xs mx-auto">
          Your order <span className="text-primary-600 font-bold">#{latestOrder?.id || 'DS123456'}</span> has been placed and is being processed.
        </p>
        <p className="text-slate-400 text-sm italic">Thank you for shopping with us.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm space-y-4"
      >
        <Button onClick={() => setScreen(Screen.OrderTracking)} className="w-full h-14 rounded-2xl group">
          Track Order
          <Package className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
        </Button>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-12 rounded-xl group">
             Invoice
             <Download size={18} className="ml-2 group-hover:translate-y-1 transition-transform" />
          </Button>
          <Button variant="ghost" className="h-12 rounded-xl" onClick={() => setScreen(Screen.Home)}>
            Back to Store
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
