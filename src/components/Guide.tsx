import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { UREA_GUIDE } from '../data';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';

interface GuideProps {
  onNavigate: (view: any) => void;
}

export default function Guide({ onNavigate }: GuideProps) {
  return (
    <div className="flex flex-col h-full bg-primary-50 dark:bg-gray-900 pb-20 font-sans">
      <header className="flex items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-sm shrink-0 z-10 rounded-b-3xl">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => onNavigate('home')} className="w-10 h-10 rounded-full bg-primary-50 dark:bg-gray-700 flex items-center justify-center mr-4">
          <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
        </motion.button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Urea Guide</h1>
          <p className="text-[10px] tracking-widest uppercase text-primary-600 dark:text-primary-400 font-bold">Knowledge Base</p>
        </div>
      </header>

      <div className="px-6 py-6 space-y-4 flex-1 overflow-y-auto">
        {UREA_GUIDE.map((item, index) => {
          const IconComponent = (Icons as any)[item.icon] || Icons.Info;
          return (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.02 }}
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-2xl shrink-0">
                  <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">{item.content}</p>
            </motion.div>
          );
        })}
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-3xl border border-orange-100 dark:border-orange-800/30 flex gap-4 items-start mt-6">
          <Icons.Info className="w-6 h-6 text-orange-500 flex-shrink-0" />
          <p className="text-[11px] text-orange-800 dark:text-orange-200 leading-relaxed font-medium">
            <strong>Disclaimer:</strong> Calculations are based on standard agriculture reference values. Actual requirements may vary by soil test, crop condition, and local climate. Consult a professional before application.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
