import React, { useState, useEffect } from 'react';
import { AppState, AppView } from './types';
import { SavedCalculation } from './data';
import Home from './components/Home';
import Calculator from './components/Calculator';
import BagCalculator from './components/BagCalculator';
import Guide from './components/Guide';
import SavedCalculations from './components/SavedCalculations';
import Settings from './components/Settings';
import { Home as HomeIcon, Settings as SettingsIcon, Sprout, Calculator as CalcIcon, Bookmark, BookOpen } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('bhumi_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      currentView: 'home',
      savedCalculations: [],
      darkMode: false,
      language: 'English',
    };
  });

  useEffect(() => {
    localStorage.setItem('bhumi_state', JSON.stringify(state));
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  const navigate = (view: AppView) => setState((s) => ({ ...s, currentView: view }));
  
  const handleSaveCalculation = (calc: SavedCalculation) => {
    setState((s) => ({ ...s, savedCalculations: [calc, ...s.savedCalculations] }));
  };

  const handleDeleteCalculation = (id: string) => {
    setState((s) => ({ ...s, savedCalculations: s.savedCalculations.filter(c => c.id !== id) }));
  };

  const updateState = (updates: Partial<AppState>) => {
    setState((s) => ({ ...s, ...updates }));
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-primary-50 dark:bg-gray-900 overflow-hidden flex flex-col relative shadow-2xl">
      
      {state.currentView === 'home' && (
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center px-6 py-6 bg-gradient-to-br from-primary-600 to-primary-800 shrink-0 rounded-b-[2.5rem] shadow-lg z-10"
        >
          <motion.div 
            whileHover={{ rotate: 180 }} 
            transition={{ duration: 0.5, type: 'spring' }}
            className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner"
          >
            <Sprout className="w-8 h-8 text-white" />
          </motion.div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-white tracking-tight">Bhumi Urea</h1>
            <p className="text-xs tracking-widest uppercase text-primary-200 font-semibold mt-1">Calculate • Convert • Apply</p>
          </div>
        </motion.header>
      )}

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentView}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
            transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
            className="h-full"
          >
            {state.currentView === 'home' && <Home onNavigate={navigate} />}
            {state.currentView === 'calculator' && <Calculator onNavigate={navigate} onSave={handleSaveCalculation} />}
            {state.currentView === 'bag_calculator' && <BagCalculator onNavigate={navigate} />}
            {state.currentView === 'guide' && <Guide onNavigate={navigate} />}
            {state.currentView === 'saved' && <SavedCalculations onNavigate={navigate} calculations={state.savedCalculations} onDelete={handleDeleteCalculation} />}
            {state.currentView === 'settings' && <Settings onNavigate={navigate} state={state} onUpdateState={updateState} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {['home', 'calculator', 'saved', 'guide', 'settings'].includes(state.currentView) && (
        <motion.nav 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="h-20 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex items-center justify-around px-2 z-20 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-3xl"
        >
          {[
            { id: 'home', icon: HomeIcon, label: 'Home' },
            { id: 'calculator', icon: CalcIcon, label: 'Calculator' },
            { id: 'saved', icon: Bookmark, label: 'Saved' },
            { id: 'guide', icon: BookOpen, label: 'Guide' },
            { id: 'settings', icon: SettingsIcon, label: 'Settings' }
          ].map(tab => {
            const isActive = state.currentView === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(tab.id as AppView)}
                className="flex flex-col items-center gap-1 group relative w-16"
              >
                <motion.div 
                  className={`p-2 rounded-2xl transition-colors ${isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400' : 'text-gray-400 hover:text-primary-500'}`}
                  animate={isActive ? { y: -4 } : { y: 0 }}
                >
                  <tab.icon className="w-6 h-6" />
                </motion.div>
                {isActive && (
                  <motion.div layoutId="navIndicator" className="absolute -bottom-3 w-1 h-1 bg-primary-600 rounded-full" />
                )}
              </motion.button>
            );
          })}
        </motion.nav>
      )}
    </div>
  );
}
