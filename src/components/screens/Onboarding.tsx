import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Award, Truck, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen } from '../../types';
import { Button } from '../ui/Button';

const SLIDES = [
  {
    title: 'Best Quality',
    description: 'Get the best quality products at your doorstep with our premium selection.',
    icon: <Award className="w-16 h-16 text-primary-500" />,
    color: 'from-amber-400 to-amber-600'
  },
  {
    title: 'Fast Delivery',
    description: '100% secure payment methods and fastest delivery in town.',
    icon: <Truck className="w-16 h-16 text-blue-500" />,
    color: 'from-blue-400 to-blue-600'
  },
  {
    title: 'Secure Payment',
    description: 'We ensure your money is safe with our encrypted payment systems.',
    icon: <ShieldCheck className="w-16 h-16 text-green-500" />,
    color: 'from-green-400 to-green-600'
  }
];

export function Onboarding() {
  const [current, setCurrent] = useState(0);
  const { setScreen } = useStore();

  const next = () => {
    if (current < SLIDES.length - 1) {
      setCurrent(current + 1);
    } else {
      setScreen(Screen.Login);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col p-8 dark:bg-slate-950">
      <div className="flex justify-end pt-4">
        <button 
          onClick={() => setScreen(Screen.Login)}
          className="text-slate-400 font-medium hover:text-primary-600 transition-colors"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className={`w-32 h-32 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-xl`}>
              {SLIDES[current].icon}
            </div>
            <div className="space-y-4 max-w-xs">
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
                {SLIDES[current].title}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {SLIDES[current].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pb-12 space-y-8 flex flex-col items-center">
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-primary-600' : 'w-2 bg-slate-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>

        <Button 
          onClick={next}
          className="w-full max-w-xs group"
        >
          {current === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
