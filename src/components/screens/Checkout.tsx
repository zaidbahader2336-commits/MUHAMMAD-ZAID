import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, MapPin, CreditCard, Banknote, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { cn } from '../../lib/utils';

export function Checkout() {
  const { setScreen, placeOrder, cart } = useStore();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + (subtotal > 10000 ? 0 : 250);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      placeOrder();
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      <header className="p-6 flex items-center gap-4">
        <button onClick={() => setScreen(Screen.Cart)} className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-display font-bold">Checkout</h1>
      </header>

      <div className="px-6 space-y-8">
        {/* Shipping Address */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-lg">Shipping Address</h3>
            <button className="text-primary-600 text-sm font-bold">Change</button>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-4">
            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">Ali Hassan</p>
              <p className="text-sm text-slate-500 font-medium leading-tight mt-1">
                123 Main Street, Phase 6, DHA,<br />Karachi, Pakistan. +92 300 1234567
              </p>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="space-y-4">
          <h3 className="font-display font-bold text-lg">Payment Method</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setPaymentMethod('card')}
              className={cn(
                "p-4 rounded-3xl border-2 transition-all text-left flex flex-col gap-3 group relative overflow-hidden",
                paymentMethod === 'card' 
                  ? "bg-primary-50 dark:bg-primary-900/20 border-primary-600 text-primary-700" 
                  : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500"
              )}
            >
              <CreditCard size={24} />
              <span className="font-bold">Card / Wallet</span>
              {paymentMethod === 'card' && <CheckCircle2 size={16} className="absolute top-4 right-4" />}
            </button>
            <button 
              onClick={() => setPaymentMethod('cod')}
              className={cn(
                "p-4 rounded-3xl border-2 transition-all text-left flex flex-col gap-3 group relative overflow-hidden",
                paymentMethod === 'cod' 
                  ? "bg-primary-50 dark:bg-primary-900/20 border-primary-600 text-primary-700" 
                  : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500"
              )}
            >
              <Banknote size={24} />
              <span className="font-bold">Cash on Delivery</span>
              {paymentMethod === 'cod' && <CheckCircle2 size={16} className="absolute top-4 right-4" />}
            </button>
          </div>

          {paymentMethod === 'card' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
               <Input label="Card Holder Name" placeholder="Ali Hassan" />
               <Input label="Card Number" placeholder="**** **** **** 1234" icon={<CreditCard size={18} />} />
               <div className="grid grid-cols-2 gap-4">
                 <Input label="Expiry Data" placeholder="MM/YY" />
                 <Input label="CVV" placeholder="***" type="password" />
               </div>
             </motion.div>
          )}
        </section>

        {/* Order Summary */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
          <h3 className="font-display font-bold text-lg mb-2">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Items Total ({cart.length})</span>
              <span>PKR {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Shipping cost</span>
              <span>{subtotal > 10000 ? 'Free' : 'PKR 250'}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Tax (Included)</span>
              <span>PKR 0</span>
            </div>
            <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
              <span className="text-lg font-display font-bold">Amount to Pay</span>
              <span className="text-2xl font-display font-bold text-primary-600">PKR {total.toLocaleString()}</span>
            </div>
          </div>
        </section>

        <div className="flex items-center gap-2 text-slate-400 justify-center pb-4">
          <ShieldCheck size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Secure SSL Encryption</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-40">
        <Button 
          isLoading={isProcessing}
          onClick={handlePlaceOrder}
          className="w-full h-14 rounded-2xl text-lg shadow-xl shadow-primary-500/20"
        >
          Confirm Order
        </Button>
      </div>
    </div>
  );
}
