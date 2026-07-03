import React from 'react';
import { ArrowLeft, Moon, Sun, Globe, Shield, Info, Star, Share2 } from 'lucide-react';
import { AppState } from '../types';
import { motion } from 'motion/react';

interface SettingsProps {
  onNavigate: (view: any) => void;
  state: AppState;
  onUpdateState: (updates: Partial<AppState>) => void;
}

export default function Settings({ onNavigate, state, onUpdateState }: SettingsProps) {
  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Bhumi Urea Calculator',
        text: 'Try the Bhumi Urea Calculator app for accurate fertilizer planning!',
        url: window.location.href,
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-primary-50 dark:bg-gray-900 pb-20 font-sans">
      <header className="flex items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-sm shrink-0 z-10 rounded-b-3xl">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => onNavigate('home')} className="w-10 h-10 rounded-full bg-primary-50 dark:bg-gray-700 flex items-center justify-center mr-4">
          <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
        </motion.button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-[10px] tracking-widest uppercase text-primary-600 dark:text-primary-400 font-bold">Preferences</p>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-primary-50 dark:bg-gray-700 p-3 rounded-2xl">
                {state.darkMode ? <Moon className="w-5 h-5 text-primary-600 dark:text-primary-400" /> : <Sun className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
              </div>
              <span className="font-bold text-gray-900 dark:text-white text-lg">Dark Mode</span>
            </div>
            <button
              onClick={() => onUpdateState({ darkMode: !state.darkMode })}
              className={`w-14 h-8 rounded-full transition-colors relative ${state.darkMode ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'}`}
            >
              <motion.div layout className={`w-6 h-6 bg-white rounded-full absolute top-1 ${state.darkMode ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="p-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-primary-50 dark:bg-gray-700 p-3 rounded-2xl">
                <Globe className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white text-lg">Language</span>
            </div>
            <select
              value={state.language}
              onChange={(e) => onUpdateState({ language: e.target.value as any })}
              className="bg-primary-50 dark:bg-gray-700 text-primary-700 dark:text-white border-none font-bold rounded-xl px-4 py-3 outline-none appearance-none"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {[
            { icon: Shield, label: 'Privacy Policy' },
            { icon: Info, label: 'About Bhumi' },
            { icon: Star, label: 'Rate App' },
            { icon: Share2, label: 'Share App', onClick: handleShareApp }
          ].map((item, idx) => (
            <motion.button whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }} whileTap={{ scale: 0.98 }} key={idx} onClick={item.onClick} className="w-full p-6 border-b last:border-0 border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-colors">
              <div className="bg-primary-50 dark:bg-gray-700 p-3 rounded-2xl">
                <item.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white text-lg">{item.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
