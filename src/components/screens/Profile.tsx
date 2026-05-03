import { motion } from 'motion/react';
import { 
  User, Package, Heart, MapPin, CreditCard, Settings, 
  HelpCircle, LogOut, ChevronRight, Moon, Globe, DollarSign,
  Shield, Bell
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Screen } from '../../types';
import { Button } from '../ui/Button';

export function Profile() {
  const { 
    user, setUser, setScreen, 
    isDarkMode, toggleDarkMode,
    language, setLanguage,
    currency, setCurrency 
  } = useStore();

  const handleLogout = () => {
    setUser(null);
    setScreen(Screen.Login);
  };

  const sections = [
    {
      title: 'Personal',
      items: [
        { icon: <Package size={20} />, label: 'My Orders', screen: Screen.MyOrders },
        { icon: <Heart size={20} />, label: 'Wishlist', screen: Screen.Wishlist },
        { icon: <MapPin size={20} />, label: 'Addresses', badge: '2' },
        { icon: <CreditCard size={20} />, label: 'Payment Methods' },
      ]
    },
    {
      title: 'App Settings',
      items: [
        { 
          icon: <Moon size={20} />, 
          label: 'Dark Mode', 
          toggle: true, 
          active: isDarkMode, 
          action: toggleDarkMode 
        },
        { 
          icon: <Globe size={20} />, 
          label: 'Language', 
          value: language === 'en' ? 'English' : 'Urdu',
          action: () => setLanguage(language === 'en' ? 'ur' : 'en')
        },
        { 
          icon: <DollarSign size={20} />, 
          label: 'Currency', 
          value: currency,
          action: () => setCurrency(currency === 'PKR' ? 'USD' : 'PKR')
        },
        { icon: <Bell size={20} />, label: 'Notifications', badge: 'On' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: <HelpCircle size={20} />, label: 'Help & Support' },
        { icon: <Shield size={20} />, label: 'Privacy & Security' },
      ]
    },
    {
      title: 'Management',
      items: [
        { icon: <Settings size={20} />, label: 'Admin Dashboard', screen: Screen.AdminLogin },
      ]
    }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      {/* Profile Header */}
      <div className="gradient-bg pt-16 pb-20 px-8 rounded-b-[3rem] shadow-xl shadow-primary-500/10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <button className="absolute -bottom-1 -right-1 p-2 bg-white text-primary-600 rounded-xl shadow-lg border-2 border-primary-500/10">
              <Settings size={16} />
            </button>
          </div>
          <div className="text-white space-y-1">
            <h2 className="text-2xl font-display font-bold">{user.name}</h2>
            <p className="text-primary-100/80 font-medium text-sm">{user.email}</p>
            <div className="flex gap-2 mt-2">
              <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                Verified Buyer
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-10 space-y-8">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="px-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {section.title}
            </h3>
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
              {section.items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => item.action ? item.action() : (item.screen && setScreen(item.screen))}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                      {item.icon}
                    </div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{item.label}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {item.toggle ? (
                       <div className={`w-12 h-6 rounded-full transition-colors relative ${item.active ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                         <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${item.active ? 'left-7' : 'left-1'}`} />
                       </div>
                    ) : item.value ? (
                      <span className="text-sm font-bold text-primary-600">{item.value}</span>
                    ) : item.badge ? (
                      <span className="bg-primary-100 text-primary-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                    ) : (
                      <ChevronRight size={18} className="text-slate-300" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full h-14 rounded-2xl text-red-500 font-bold bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/20 shadow-sm"
        >
          Logout Account
          <LogOut size={20} className="ml-2" />
        </Button>

        <div className="text-center pb-8">
           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Digital Store v1.0.4 - Premium</p>
        </div>
      </div>
    </div>
  );
}
