import React from 'react';
import { AppView } from '../types';
import { Calculator, Package, BookOpen, Bookmark, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  onNavigate: (view: AppView) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const cards = [
    {
      id: 'calculator',
      title: 'Urea Calculator',
      description: 'Calculate requirement based on crop & area',
      icon: <Calculator className="w-8 h-8 text-white" />,
      color: 'from-primary-500 to-primary-600',
    },
    {
      id: 'bag_calculator',
      title: 'Bag Calculator',
      description: 'Convert kg into 45kg or 50kg bags',
      icon: <Package className="w-8 h-8 text-white" />,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      id: 'guide',
      title: 'Urea Guide',
      description: 'Learn about Urea application & storage',
      icon: <BookOpen className="w-8 h-8 text-white" />,
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'saved',
      title: 'Saved Calculations',
      description: 'View your previous calculation reports',
      icon: <Bookmark className="w-8 h-8 text-white" />,
      color: 'from-teal-500 to-teal-600',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="px-6 py-4 space-y-6 bg-primary-50 dark:bg-gray-900 h-full overflow-y-auto">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="pt-2 pb-2">
        <h2 className="text-sm font-bold text-primary-700 dark:text-primary-400 uppercase tracking-wider flex items-center">
          <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium text-lg">What would you like to calculate today?</p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 gap-4 pb-24">
        {cards.map((card) => (
          <motion.button
            variants={item}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            key={card.id}
            onClick={() => onNavigate(card.id as AppView)}
            className="group relative flex items-center p-5 bg-white dark:bg-gray-800 rounded-[28px] shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 text-left transition-shadow overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent dark:from-primary-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${card.color} shadow-inner shrink-0 relative z-10`}>
              {card.icon}
            </div>
            <div className="ml-4 flex-1 relative z-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">{card.title}</h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 leading-snug">
                {card.description}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-gray-700 flex items-center justify-center shrink-0 ml-2 group-hover:bg-primary-100 dark:group-hover:bg-primary-900 transition-colors relative z-10">
              <ChevronRight className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
