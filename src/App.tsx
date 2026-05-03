/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from 'motion/react';
import { MessageSquare, LifeBuoy } from 'lucide-react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Screen } from './types';
import { Splash } from './components/screens/Splash';
import { Onboarding } from './components/screens/Onboarding';
import { Login } from './components/screens/Login';
import { Home } from './components/screens/Home';
import { ProductDetail } from './components/screens/ProductDetail';
import { Cart } from './components/screens/Cart';
import { Checkout } from './components/screens/Checkout';
import { Success } from './components/screens/Success';
import { AdminLogin } from './components/screens/AdminLogin';
import { AdminDashboard } from './components/screens/AdminDashboard';
import { Profile } from './components/screens/Profile';
import { Categories } from './components/screens/Categories';
import { ProductList } from './components/screens/ProductList';
import { Wishlist } from './components/screens/Wishlist';
import { OrderTracking } from './components/screens/OrderTracking';
import { BottomNav } from './components/ui/BottomNav';

import { Sidebar } from './components/ui/Sidebar';
import { TopBar } from './components/ui/TopBar';

function AppContent() {
  const { screen } = useStore();

  const renderScreen = () => {
    switch (screen) {
      case Screen.Splash: return <Splash />;
      case Screen.Onboarding: return <Onboarding />;
      case Screen.Login: return <Login />;
      case Screen.Home: return <Home />;
      case Screen.Categories: return <Categories />;
      case Screen.ProductList: return <ProductList />;
      case Screen.ProductDetail: return <ProductDetail />;
      case Screen.Cart: return <Cart />;
      case Screen.Wishlist: return <Wishlist />;
      case Screen.Profile: return <Profile />;
      case Screen.Checkout: return <Checkout />;
      case Screen.Success: return <Success />;
      case Screen.OrderTracking: return <OrderTracking />;
      case Screen.AdminLogin: return <AdminLogin />;
      case Screen.AdminDashboard: return <AdminDashboard />;
      default: return <Home />;
    }
  };

  const showNav = [Screen.Home, Screen.Categories, Screen.Cart, Screen.Wishlist, Screen.Profile].includes(screen);
  const isAuthScreen = [Screen.Splash, Screen.Onboarding, Screen.Login, Screen.AdminLogin].includes(screen);
  const isDesktopLayout = !isAuthScreen;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans selection:bg-primary-500 selection:text-white">
      {isDesktopLayout && <Sidebar />}
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {isDesktopLayout && <TopBar />}
        
        <main className="flex-1 overflow-y-auto scrollbar-hide pb-20 lg:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        {showNav && <BottomNav />}
      </div>

      {/* Floating Chat Support - Compact style for High Density */}
      {!isAuthScreen && (
        <button className="fixed bottom-24 right-6 lg:bottom-8 lg:right-8 w-14 h-14 bg-slate-900 border-4 border-white dark:border-slate-800 text-white rounded-2xl shadow-premium flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 group">
          <MessageSquare size={24} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 group-hover:scale-125 transition-transform" />
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

