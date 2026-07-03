import React, { useState } from 'react';
import { ArrowLeft, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BagCalculatorProps {
  onNavigate: (view: any) => void;
}

export default function BagCalculator({ onNavigate }: BagCalculatorProps) {
  const [kg, setKg] = useState<string>('');
  const [bagSize, setBagSize] = useState<number>(45);

  const weight = parseFloat(kg) || 0;
  const bags = Math.floor(weight / bagSize);
  const remaining = Math.round(weight % bagSize);

  return (
    <div className="flex flex-col h-full bg-primary-50 dark:bg-gray-900 pb-20 font-sans">
      <header className="flex items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-sm shrink-0 z-10 rounded-b-3xl">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => onNavigate('home')} className="w-10 h-10 rounded-full bg-primary-50 dark:bg-gray-700 flex items-center justify-center mr-4">
          <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
        </motion.button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Bag Calculator</h1>
          <p className="text-[10px] tracking-widest uppercase text-primary-600 dark:text-primary-400 font-bold">Convert kg to bags</p>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring' }} className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Total Weight (kg)</label>
            <input
              type="number"
              value={kg}
              onChange={(e) => setKg(e.target.value)}
              placeholder="e.g. 260"
              className="w-full text-3xl font-black p-5 bg-primary-50 dark:bg-gray-700 border-none rounded-2xl text-gray-900 dark:text-white focus:ring-4 focus:ring-primary-500/20 outline-none transition-shadow text-center"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Bag Size</label>
            <div className="flex gap-3 bg-gray-50 dark:bg-gray-900 p-1.5 rounded-2xl">
              {[45, 50].map(size => (
                <button
                  key={size}
                  onClick={() => setBagSize(size)}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${bagSize === size ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                >
                  {size} kg
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        <AnimatePresence>
          {weight > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', bounce: 0.5 }} className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-8 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center relative overflow-hidden">
              <Package className="w-32 h-32 absolute opacity-10 -right-6 -bottom-6" />
              <span className="text-emerald-100 font-semibold uppercase tracking-wider text-sm mb-4 relative z-10">You will need</span>
              <div className="text-6xl font-black mb-2 relative z-10">{bags} <span className="text-2xl font-bold opacity-90">Bags</span></div>
              {remaining > 0 && (
                <div className="text-lg font-bold bg-white/20 px-4 py-2 rounded-2xl mt-4 backdrop-blur-sm relative z-10">
                  + {remaining} kg extra
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
