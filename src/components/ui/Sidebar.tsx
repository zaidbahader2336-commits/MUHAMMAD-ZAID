import React from 'react';
import { 
  Home, 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Settings, 
  BarChart2, 
  LogOut,
  LayoutGrid
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen } from '../../types';
import { cn } from '../../lib/utils';

export function Sidebar() {
  const { screen, setScreen } = useStore();

  const navItems = [
    { id: Screen.Home, icon: Home, label: 'Home' },
    { id: Screen.Categories, icon: LayoutGrid, label: 'Categories' },
    { id: Screen.Wishlist, icon: Heart, label: 'Wishlist' },
    { id: Screen.Cart, icon: ShoppingBag, label: 'Cart' },
    { id: Screen.Profile, icon: User, label: 'Profile' },
  ];

  const adminItems = [
    { id: Screen.AdminDashboard, icon: BarChart2, label: 'Dashboard' },
  ];

  return (
    <aside className="hidden lg:flex w-20 bg-slate-900 flex-col items-center py-8 gap-10 text-slate-400 border-r border-slate-800 shrink-0">
      <div 
        className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-primary-500/20 cursor-pointer hover:scale-105 transition-transform"
        onClick={() => setScreen(Screen.Home)}
      >
        L
      </div>

      <nav className="flex flex-col gap-8">
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={cn(
              "p-3 rounded-xl cursor-pointer transition-all duration-300 relative group",
              screen === item.id 
                ? "bg-primary-500/10 text-primary-400" 
                : "hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon size={24} />
            {screen === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary-500 rounded-r-lg shadow-[0_0_10px_#6366f1]" />
            )}
            
            {/* Tooltip */}
            <div className="absolute left-16 px-2 py-1 bg-slate-800 text-white text-[10px] font-bold rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
              {item.label}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-8">
        <div className="p-3 hover:text-white cursor-pointer transition-colors">
          <Settings size={24} />
        </div>
        <div className="p-3 hover:text-rose-400 cursor-pointer transition-colors">
          <LogOut size={24} />
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 cursor-pointer hover:border-primary-500 transition-colors" />
      </div>
    </aside>
  );
}
