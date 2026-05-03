import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Mic, Bell, Timer, ChevronRight, ShoppingBag, MessageSquare } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen, Product } from '../../types';
import { MOCK_PRODUCTS, CATEGORIES } from '../../constants';
import { ProductCard } from '../ui/ProductCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

export function Home() {
  const { user, setScreen, setSelectedProduct, addToCart, products } = useStore();
  const [timeLeft, setTimeLeft] = useState(3600 * 2.5); // 2.5 hours

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const trendingProducts = products.filter(p => p.isTrending);
  const flashSaleProducts = products.filter(p => p.isFlashSale);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setScreen(Screen.ProductDetail);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 lg:p-8">
      <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
        {/* Main Content Area */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          {/* Hero Banner */}
          <section>
            <div className="gradient-indigo-purple rounded-[2rem] p-8 text-white relative overflow-hidden shadow-premium">
              <div className="relative z-10 space-y-4 max-w-md">
                <div className="flex items-center gap-2">
                  <Badge className="bg-white/20 text-white border-none shadow-sm font-black">Flash Sale</Badge>
                  <div className="bg-white/20 px-3 py-1 rounded-lg font-mono text-sm font-bold flex items-center gap-2">
                    <Timer size={14} />
                    {formatTime(timeLeft)}
                  </div>
                </div>
                <h2 className="text-4xl font-display font-black leading-tight tracking-tight uppercase">Up to 70% Over</h2>
                <p className="text-white/80 font-medium text-sm">Grab premium electronics and high-performance gear at the lowest prices of the season.</p>
                <div className="flex gap-4 pt-2">
                  <Button size="sm" variant="secondary" className="bg-white text-indigo-600 border-none">
                    Shop Now
                  </Button>
                  <Button size="sm" variant="outline" className="text-white border-white/30 bg-transparent hover:bg-white/10">
                    View Catalog
                  </Button>
                </div>
              </div>
              <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-50" />
              <div className="absolute right-12 top-1/2 -translate-y-1/2 w-48 h-48 opacity-10 hidden md:block">
                 <ShoppingBag size={180} strokeWidth={1} />
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <section>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-display font-bold text-xl dark:text-white flex items-center gap-2">
                Categories
                <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md uppercase">8 Specialized</span>
              </h3>
              <button onClick={() => setScreen(Screen.Categories)} className="text-indigo-600 text-xs font-bold uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-1">
                Explore All <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {CATEGORIES.slice(0, 8).map((cat, i) => (
                <button 
                  key={i} 
                  className="flex flex-col items-center gap-2 group"
                  onClick={() => setScreen(Screen.ProductList)}
                >
                  <div className="w-full aspect-square bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-card border border-slate-100 dark:border-slate-800 group-hover:border-indigo-400 group-hover:scale-105 transition-all duration-300">
                    <GridIcon i={i} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter text-center">{cat}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Flash Deals / Trending Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-bold text-xl dark:text-white">Flash Deals</h3>
                <button className="text-indigo-600 text-xs font-bold uppercase">View All</button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {flashSaleProducts.slice(0, 2).map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={() => handleProductClick(product)} 
                  />
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-bold text-xl dark:text-white">Trending</h3>
                <button className="text-indigo-600 text-xs font-bold uppercase">Discover</button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {trendingProducts.slice(0, 2).map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={() => handleProductClick(product)} 
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar - Desktop Only Insights */}
        <aside className="hidden lg:flex col-span-4 flex-col gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-card">
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center justify-between text-slate-400">
              Personalized Insights
              <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full lowercase">Updated now</span>
            </h4>
            
            {/* Minimal Bar Chart */}
            <div className="flex items-end gap-2 h-24 mb-6">
              {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-full rounded-t-lg transition-all duration-500",
                    i === 3 ? "bg-indigo-500 h-[90%]" : "bg-slate-100 dark:bg-slate-800 h-[30%]"
                  )}
                  style={{ height: i === 3 ? '90%' : `${h}%` }}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100/50 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 font-black uppercase mb-1">Items Seen</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">128</div>
              </div>
              <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/20">
                <div className="text-[10px] text-indigo-400 font-black uppercase mb-1">Savings</div>
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">2.4k</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-card">
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 text-slate-400">Order Updates</h4>
            <div className="relative pl-8 border-l border-slate-100 dark:border-slate-800 ml-2 space-y-8">
              <div className="relative">
                <div className="absolute -left-[41px] top-0.5 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white dark:border-slate-900 shadow-premium" />
                <div className="text-xs font-black text-slate-800 dark:text-white">Package Dispatched</div>
                <div className="text-[10px] text-slate-400 font-medium">Tracking: #PK-9284-M</div>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-0.5 w-4 h-4 bg-slate-200 dark:bg-slate-800 rounded-full border-4 border-white dark:border-slate-900" />
                <div className="text-xs font-bold text-slate-300 dark:text-slate-600">Pending Delivery</div>
                <div className="text-[10px] text-slate-300 dark:text-slate-700">Expected Wednesday</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 text-white flex items-center justify-between group cursor-pointer hover:bg-slate-800 transition-colors shadow-premium">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-black uppercase tracking-tight">Support</div>
                <div className="text-[10px] opacity-60 font-bold">2 Agents Dedicated</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-indigo-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </aside>
      </div>
    </div>
  );
}

function GridIcon({ i }: { i: number }) {
  const icons = [<Search />, <Bell />, <Timer />, <Mic />, <ChevronRight />, <Search />, <Bell />, <Timer />];
  return <div className="text-primary-500 opacity-60 scale-75">{icons[i % icons.length]}</div>;
}
