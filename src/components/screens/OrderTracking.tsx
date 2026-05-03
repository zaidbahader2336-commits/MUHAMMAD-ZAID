import { motion } from 'motion/react';
import { ChevronLeft, Package, CheckCircle2, Clock, Truck, MapPin } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen } from '../../types';
import { Button } from '../ui/Button';

export function OrderTracking() {
  const { setScreen, orders } = useStore();
  const order = orders[0];

  const steps = [
    { icon: <Package size={20} />, label: 'Order Placed', time: '10:30 AM', date: 'May 03, 2026', done: true },
    { icon: <Clock size={20} />, label: 'Processing', time: '11:15 AM', date: 'May 03, 2026', done: true },
    { icon: <Truck size={20} />, label: 'Out for Delivery', time: 'Pending', done: false },
    { icon: <CheckCircle2 size={20} />, label: 'Delivered', time: 'Pending', done: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      <header className="p-6 flex items-center gap-4 sticky top-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md z-10">
        <button onClick={() => setScreen(Screen.Home)} className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-display font-bold">Track Order</h1>
      </header>

      <div className="px-6 space-y-8">
        {/* Order ID Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</p>
              <h2 className="text-xl font-display font-bold text-primary-600">#{order?.id || 'DS1234567'}</h2>
            </div>
            <div className="bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full text-[10px] font-bold text-primary-600 uppercase tracking-widest">
              Processing
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex gap-4 items-center">
             <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                <MapPin className="text-slate-400" />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Delivery Address</p>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Phase 6, DHA, Karachi</p>
             </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
           <div className="space-y-12">
             {steps.map((step, i) => (
               <div key={i} className="relative flex gap-6 group">
                 {/* Line */}
                 {i !== steps.length - 1 && (
                   <div className={`absolute top-10 left-5 w-0.5 h-12 ${step.done ? 'bg-primary-600' : 'bg-slate-100 dark:bg-slate-800'}`} />
                 )}
                 
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all ${
                   step.done 
                    ? 'bg-primary-600 border-primary-100 dark:border-primary-900/30 text-white' 
                    : 'bg-white dark:bg-slate-800 border-slate-50 dark:border-slate-800 text-slate-300'
                 }`}>
                   {step.icon}
                 </div>
                 
                 <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className={`font-bold transition-all ${step.done ? 'text-slate-800 dark:text-white' : 'text-slate-400'}`}>
                        {step.label}
                      </h4>
                      {step.date && <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-lg">{step.date}</span>}
                    </div>
                    <p className={`text-xs font-medium ${step.done ? 'text-slate-500' : 'text-slate-300'}`}>
                      {step.done ? `Successfully completed at ${step.time}` : 'Expected soon'}
                    </p>
                 </div>
               </div>
             ))}
           </div>
        </div>

        <Button variant="outline" onClick={() => setScreen(Screen.Home)} className="w-full h-14 rounded-2xl border-primary-600/20">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
