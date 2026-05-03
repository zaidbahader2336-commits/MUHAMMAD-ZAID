import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, ShoppingBag, ListOrdered, BarChart3, Settings, 
  Grid3X3, Search, Bell, LogOut, TrendingUp, Users, DollarSign, 
  PackageCheck, Plus, X, Upload, Check, Trash2, Edit2, ChevronRight,
  ShieldCheck, CreditCard, Tag, Box, AlertCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen, Product } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { CATEGORIES } from '../../constants';
import { cn } from '../../lib/utils';

const DATA = [
  { name: 'Mon', sales: 4000, visits: 2400 },
  { name: 'Tue', sales: 3000, visits: 1398 },
  { name: 'Wed', sales: 2000, visits: 9800 },
  { name: 'Thu', sales: 2780, visits: 3908 },
  { name: 'Fri', sales: 1890, visits: 4800 },
  { name: 'Sat', sales: 2390, visits: 3800 },
  { name: 'Sun', sales: 3490, visits: 4300 },
];

export function AdminDashboard() {
  const { setScreen, setUser, products, addProduct, deleteProduct } = useStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'users'>('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for New Product
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    originalPrice: 0,
    category: CATEGORIES[0],
    description: '',
    stock: 10,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'],
    rating: 5,
    reviews: 0
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      ...newProduct as Product,
      id: 'P' + Math.floor(Math.random() * 1000000),
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : undefined,
    };
    addProduct(product);
    setShowAddModal(false);
    setNewProduct({
      name: '',
      price: 0,
      originalPrice: 0,
      category: CATEGORIES[0],
      description: '',
      stock: 10,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'],
      rating: 5,
      reviews: 0
    });
  };

  const handleLogout = () => {
    setUser(null);
    setScreen(Screen.Login);
  };

  const stats = [
    { label: 'Total Revenue', value: 'PKR 245.8k', icon: <DollarSign />, trend: '+12.5%', color: 'bg-indigo-600' },
    { label: 'Active Orders', value: '1,245', icon: <PackageCheck />, trend: '+15.2%', color: 'bg-slate-900' },
    { label: 'Customer Growth', value: '12,845', icon: <Users />, trend: '+18.1%', color: 'bg-indigo-600' },
    { label: 'Conversion Rate', value: '3.24%', icon: <TrendingUp />, trend: '+5.4%', color: 'bg-indigo-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed inset-y-0 z-50">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20">L</div>
            <h1 className="text-xl font-display font-black text-slate-900 dark:text-white tracking-tight uppercase">Admin Panel</h1>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Overview' },
            { id: 'products', icon: <ShoppingBag size={20} />, label: 'Product Control' },
            { id: 'orders', icon: <ListOrdered size={20} />, label: 'Sales & Orders' },
            { id: 'analytics', icon: <BarChart3 size={20} />, label: 'Deep Analytics' },
            { id: 'users', icon: <Users size={20} />, label: 'Customer CRM' },
            { id: 'settings', icon: <Settings size={20} />, label: 'Store Config' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-black text-xs uppercase tracking-widest",
                activeTab === item.id 
                  ? 'bg-slate-900 text-white shadow-premium' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              )}
            >
              <span className={cn(activeTab === item.id ? "text-indigo-400" : "text-slate-400")}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" onClick={handleLogout} className="w-full text-rose-500 font-black text-xs uppercase tracking-[0.2em] hover:bg-rose-50">
            <LogOut size={18} className="mr-2" />
            Terminate Session
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-10 space-y-10">
        <header className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-4xl font-display font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
              {activeTab === 'dashboard' ? 'Market Overview' : activeTab === 'products' ? 'Inventory Control' : activeTab.toUpperCase()}
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Real-time System Status: <span className="text-emerald-500">Live & Encrypted</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             {activeTab === 'products' && (
               <Button onClick={() => setShowAddModal(true)} className="rounded-2xl h-12 px-6 shadow-premium">
                 <Plus size={18} className="mr-2" />
                 Create New Item
               </Button>
             )}
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-12 pr-6 h-12 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-bold min-w-[280px]"
                  placeholder="Global System Search..."
                />
             </div>
             <button className="h-12 w-12 bg-white dark:bg-slate-900 rounded-2xl shadow-card flex items-center justify-center border border-slate-100 dark:border-slate-800 relative">
               <Bell size={20} className="text-slate-500" />
               <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full" />
             </button>
          </div>
        </header>

        {activeTab === 'dashboard' ? (
          <>
            <section className="grid grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-card flex flex-col justify-between group cursor-default hover:border-indigo-200 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-indigo-600 transition-all group-hover:scale-110">
                      {React.cloneElement(stat.icon as React.ReactElement, { size: 24 })}
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 font-black">{stat.trend}</Badge>
                  </div>
                  <div className="mt-8">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{stat.label}</p>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2 tabular-nums tracking-tighter">{stat.value}</h3>
                  </div>
                </motion.div>
              ))}
            </section>

            <section className="grid grid-cols-2 gap-10">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-card">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Revenue Stream (Live)</h3>
                  <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Processing</span>
                  </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)', background: '#111827', padding: '16px' }}
                        itemStyle={{ fontWeight: 'black', color: '#fff', fontSize: '12px', textTransform: 'uppercase' }}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={6} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-card">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Visitor Velocity</h3>
                  <Badge variant="outline" className="text-[10px] font-black border-slate-100">Global Regions</Badge>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)', background: '#111827', padding: '16px' }}
                      />
                      <Bar dataKey="visits" fill="#4f46e5" radius={[12, 12, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>
          </>
        ) : activeTab === 'products' ? (
           <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-card overflow-hidden">
             <div className="p-10 pb-0 flex justify-between items-center">
               <div className="flex items-center gap-3">
                 <ShoppingBag className="text-indigo-600" size={24} />
                 <h3 className="text-xl font-black uppercase tracking-widest text-slate-800 dark:text-white">Active Catalog</h3>
                 <Badge className="bg-slate-900 text-white border-none px-3 font-black">{products.length} Items</Badge>
               </div>
               <div className="flex gap-2">
                 <Button variant="outline" size="sm">Download PDF</Button>
                 <Button variant="outline" size="sm">Export CSV</Button>
               </div>
             </div>
             <div className="p-10 overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                     <th className="pb-6 px-4">Item Identity</th>
                     <th className="pb-6 px-4">Group</th>
                     <th className="pb-6 px-4">Commercials</th>
                     <th className="pb-6 px-4 text-center">Volume</th>
                     <th className="pb-6 px-4">System Status</th>
                     <th className="pb-6 px-4 text-right">Operations</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                   {products.map(product => (
                     <tr key={product.id} className="group hover:bg-slate-50 dark:hover:bg-indigo-600/5 transition-all">
                       <td className="py-6 px-4">
                         <div className="flex items-center gap-4">
                           <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm relative grow-0 shrink-0">
                             <img src={product.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                             {product.isTrending && (
                               <div className="absolute inset-0 bg-indigo-600/10 flex items-center justify-center">
                                 <TrendingUp size={16} className="text-indigo-600" />
                               </div>
                             )}
                           </div>
                           <div className="flex flex-col">
                             <span className="font-black text-sm text-slate-900 dark:text-slate-100 tracking-tight">{product.name}</span>
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {product.id}</span>
                           </div>
                         </div>
                       </td>
                       <td className="py-6 px-4">
                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500">
                           <Tag size={10} />
                           {product.category}
                         </div>
                       </td>
                       <td className="py-6 px-4">
                         <div className="flex flex-col">
                           <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums">PKR {product.price.toLocaleString()}</span>
                           {product.originalPrice && (
                             <span className="text-[10px] text-slate-400 line-through font-bold">{product.originalPrice.toLocaleString()}</span>
                           )}
                         </div>
                       </td>
                       <td className="py-6 px-4 text-center">
                         <div className="flex flex-col items-center">
                           <span className={cn(
                             "text-sm font-black tabular-nums",
                             product.stock <= 5 ? "text-rose-500" : "text-slate-900"
                           )}>
                             {product.stock}
                           </span>
                           <div className="w-12 h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                             <div className="h-full bg-indigo-500" style={{ width: `${Math.min(100, (product.stock / 20) * 100)}%` }} />
                           </div>
                         </div>
                       </td>
                       <td className="py-6 px-4">
                         <Badge variant={product.stock > 0 ? 'success' : 'error'} className="font-black border-none shadow-sm">
                           {product.stock > 0 ? 'ACTIVE' : 'DEPLETED'}
                         </Badge>
                       </td>
                       <td className="py-6 px-4 text-right">
                         <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => deleteProduct(product.id)}
                              className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                            >
                              <Trash2 size={16} />
                            </button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </section>
        ) : (
          <div className="flex flex-col items-center justify-center p-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-card space-y-6">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-100 dark:border-slate-800 group">
              <AlertCircle size={48} className="text-slate-200 group-hover:text-indigo-400 transition-colors" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">View Restricted</h3>
              <p className="text-slate-500 font-bold text-sm max-w-sm">
                This administrative sub-module is currently in development. Full CRM and Payment tracking is expected in next system patch.
              </p>
            </div>
            <Button onClick={() => setActiveTab('dashboard')} variant="outline" className="px-8 font-black uppercase text-[10px] tracking-[0.2em]">Return to Core Insights</Button>
          </div>
        )}
      </main>

      {/* Add New Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-3xl"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-white/20 overflow-hidden flex"
            >
              <div className="hidden lg:block w-72 bg-indigo-600 p-12 text-white space-y-10 relative overflow-hidden shrink-0">
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center">
                    <Box size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black leading-tight uppercase tracking-tighter">Publish New Product</h3>
                    <p className="text-indigo-100/60 font-bold text-xs mt-2 uppercase tracking-widest leading-relaxed">
                      Sync your inventory with our global store distribution network.
                    </p>
                  </div>
                </div>
                
                <div className="relative z-10 pt-10 space-y-6">
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] opacity-50">
                    <div className="w-6 h-6 rounded-full border-2 border-white/20 flex items-center justify-center">1</div>
                    Configuration
                  </div>
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em]">
                    <div className="w-6 h-6 rounded-full bg-white text-indigo-600 flex items-center justify-center">2</div>
                    Assets & SEO
                  </div>
                </div>

                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              </div>

              <div className="flex-1 p-12 space-y-8 overflow-y-auto max-h-[85vh] scrollbar-hide">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">System Entry Form</h4>
                  <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <Input 
                      label="Product Name" 
                      placeholder="e.g. Wireless Pro Max" 
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      required
                      className="rounded-2xl border-slate-100"
                    />
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Category Select</label>
                      <select 
                        className="w-full h-12 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 appearance-none"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      >
                        {CATEGORIES.slice(0, 10).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-8">
                    <Input 
                      label="Base Price" 
                      type="number"
                      placeholder="999"
                      value={newProduct.price || ''}
                      onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                      icon={<DollarSign size={16} />}
                      required
                      className="rounded-2xl border-slate-100"
                    />
                    <Input 
                      label="Retail Price" 
                      type="number"
                      placeholder="1299"
                      value={newProduct.originalPrice || ''}
                      onChange={(e) => setNewProduct({...newProduct, originalPrice: Number(e.target.value)})}
                      icon={<Tag size={16} />}
                      className="rounded-2xl border-slate-100"
                    />
                    <Input 
                      label="Initial Stock" 
                      type="number"
                      placeholder="10"
                      value={newProduct.stock || ''}
                      onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                      icon={<PackageCheck size={16} />}
                      required
                      className="rounded-2xl border-slate-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Product Description</label>
                    <textarea 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[2rem] p-6 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 min-h-[140px]"
                      placeholder="Elaborate on hardware specs, material quality and luxury features..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Asset Verification</label>
                    <div className="grid grid-cols-4 gap-4 mt-2">
                       <div className="aspect-square rounded-2xl bg-indigo-50 border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-indigo-100 transition-colors overflow-hidden">
                         <Upload size={20} className="text-indigo-400" />
                         <span className="text-[10px] font-black text-indigo-500 uppercase">Upload</span>
                       </div>
                       {[1, 2, 3].map(i => (
                         <div key={i} className="aspect-square rounded-2xl bg-slate-100 border border-slate-200 animate-pulse" />
                       ))}
                    </div>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="flex-1 h-14 rounded-2xl text-slate-500 border-slate-100"
                      onClick={() => setShowAddModal(false)}
                    >
                      Abort Task
                    </Button>
                    <Button 
                      type="submit"
                      className="flex-1 h-14 rounded-2xl shadow-indigo-500/20 shadow-premium"
                    >
                      Authenticate and Publish
                      <ChevronRight size={18} className="ml-2" />
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
