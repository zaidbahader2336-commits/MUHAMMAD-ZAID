import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldAlert, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setScreen, setUser } = useStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (password === '12345') {
        setUser({
          id: 'admin',
          name: 'Super Admin',
          email: 'admin@luxestore.com',
          role: 'admin'
        });
        setScreen(Screen.AdminDashboard);
      } else {
        setError('Invalid admin password. Try 12345');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-950 to-primary-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white/10 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-8"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-primary-600/20 rounded-3xl flex items-center justify-center border border-primary-500/30">
            <ShieldAlert size={40} className="text-primary-400" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-display font-bold text-white">Admin Login</h1>
            <p className="text-slate-400 text-sm font-medium">Restricted Access. Authentication Required.</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input 
            type="password"
            placeholder="Admin Password"
            icon={<Lock size={20} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            className="bg-white/5 border-white/20 text-white placeholder:text-slate-500"
          />
          <Button isLoading={isLoading} className="w-full h-14 rounded-2xl group shadow-lg shadow-primary-600/20">
            Authenticate
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <button 
          onClick={() => setScreen(Screen.Login)}
          className="w-full text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
        >
          Return to User Store
        </button>

        <div className="p-4 bg-primary-900/20 border border-primary-500/20 rounded-2xl text-center">
            <p className="text-xs text-primary-400 font-bold">Admin Demo Pass: <span className="text-white">12345</span></p>
        </div>
      </motion.div>
    </div>
  );
}
