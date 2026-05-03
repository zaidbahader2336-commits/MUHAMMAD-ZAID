import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen } from '../../types';
import { Button } from '../ui/Button';

export function Cart() {
  const { cart, removeFromCart, updateCartQuantity, setScreen } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 10000 ? 0 : 250;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="w-48 h-48 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center">
          <ShoppingBag size={80} className="text-slate-300" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-display font-bold">Your cart is empty</h2>
          <p className="text-slate-500 font-medium max-w-xs mx-auto">Looks like you haven't added anything to your cart yet.</p>
        </div>
        <Button onClick={() => setScreen(Screen.Home)} className="px-12">
          Go Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-40">
      <header className="p-6 pb-2 sticky top-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md z-10">
        <h1 className="text-2xl font-display font-bold dark:text-white">My Cart ({cart.length})</h1>
      </header>

      <div className="px-6 space-y-4 pt-4">
        <AnimatePresence mode="popLayout">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-4"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{item.name}</h3>
                    <p className="text-primary-600 font-bold">PKR {item.price.toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700">
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="text-slate-500 hover:text-primary-600"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-display font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="text-slate-500 hover:text-primary-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Promo Code */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 mt-6">
          <div className="flex gap-2">
            <input 
              placeholder="Coupon Code" 
              className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500/20 outline-none"
            />
            <Button size="sm" className="px-6 rounded-xl">Apply</Button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="fixed bottom-20 left-0 right-0 p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-slate-500 font-medium">
            <span>Subtotal</span>
            <span>PKR {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-500 font-medium">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `PKR ${shipping}`}</span>
          </div>
          <div className="flex justify-between text-lg font-display font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-50 dark:border-slate-800">
            <span>Total</span>
            <span className="text-primary-600">PKR {total.toLocaleString()}</span>
          </div>
        </div>
        <Button 
          className="w-full h-14 rounded-2xl group shadow-lg shadow-primary-500/20"
          onClick={() => setScreen(Screen.Checkout)}
        >
          Checkout
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
