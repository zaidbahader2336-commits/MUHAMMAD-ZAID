import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, LogIn, Github } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { setScreen, setUser } = useStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: '1',
        name: 'Ali Hassan',
        email: 'ali@example.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
        role: 'user'
      });
      setScreen(Screen.Home);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-slate-950 flex flex-col p-8 lg:p-12">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Log in to your account to continue shopping.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              label="Email or Phone" 
              placeholder="Enter your email" 
              icon={<Mail size={20} />}
              required
              type="email"
            />
            <Input 
              label="Password" 
              placeholder="Enter your password" 
              type="password"
              icon={<Lock size={20} />}
              required
            />
            
            <div className="flex justify-end">
              <button type="button" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                Forgot Password?
              </button>
            </div>

            <Button isLoading={isLoading} type="submit" className="w-full h-13 text-lg">
              Login
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-50 dark:bg-slate-950 px-4 text-slate-500 font-medium italic">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="ghost" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5 mr-2" alt="Google" />
              Google
            </Button>
            <Button variant="ghost" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div>

          <p className="text-center text-slate-500 font-medium">
            Don't have an account?{' '}
            <button className="text-primary-600 font-bold hover:underline">Sign Up</button>
          </p>

          <Button 
            variant="ghost" 
            onClick={() => setScreen(Screen.AdminLogin)}
            className="w-full mt-4 text-slate-400 text-xs uppercase tracking-widest font-bold"
          >
            Admin Access
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
