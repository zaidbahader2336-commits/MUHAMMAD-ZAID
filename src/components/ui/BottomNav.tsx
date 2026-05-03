import { Home, Grid, ShoppingCart, Heart, User } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen } from '../../types';
import { cn } from '../../lib/utils';

export function BottomNav() {
  const { screen, setScreen, cart, wishlist } = useStore();

  const tabs = [
    { id: Screen.Home, icon: <Home size={22} />, label: 'Home' },
    { id: Screen.Categories, icon: <Grid size={22} />, label: 'Categories' },
    { id: Screen.Cart, icon: <ShoppingCart size={22} />, label: 'Cart', count: cart.length },
    { id: Screen.Wishlist, icon: <Heart size={22} />, label: 'Wishlist', count: wishlist.length },
    { id: Screen.Profile, icon: <User size={22} />, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 pb-safe-area-inset z-40">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id as Screen)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full relative transition-all duration-300",
              screen === tab.id ? "text-primary-600" : "text-slate-400"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-xl transition-all duration-300",
              screen === tab.id && "bg-primary-50 dark:bg-primary-900/30 scale-110"
            )}>
              {tab.icon}
            </div>
            
            {tab.count !== undefined && tab.count > 0 && (
              <span className="absolute top-2 right-1/4 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                {tab.count}
              </span>
            )}
            
            {screen === tab.id && (
              <span className="text-[10px] font-bold mt-0.5 uppercase tracking-tighter">
                {tab.label}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
