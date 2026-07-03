import React from 'react';
import { ArrowLeft, Trash2, Calendar, Share2, Map } from 'lucide-react';
import { SavedCalculation } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface SavedCalculationsProps {
  onNavigate: (view: any) => void;
  calculations: SavedCalculation[];
  onDelete: (id: string) => void;
}

export default function SavedCalculations({ onNavigate, calculations, onDelete }: SavedCalculationsProps) {
  const handleShare = (calc: SavedCalculation) => {
    const text = `Bhumi Urea Calculator Report\nCrop: ${calc.cropName}\nArea: ${calc.area} ${calc.unit}\nNitrogen Needed: ${calc.nitrogenRequired} kg\nUrea Required: ${calc.ureaRequired} kg\nBags (${calc.bagSize}kg): ${calc.bags} bags + ${calc.remainingKg} kg\n${calc.totalCost ? `Cost: ₹${Math.round(calc.totalCost)}\n` : ''}\n*Consult local experts for final application.`;
    if (navigator.share) {
      navigator.share({ title: 'Urea Calculation', text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Report copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col h-full bg-primary-50 dark:bg-gray-900 pb-20 font-sans">
      <header className="flex items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-sm shrink-0 z-10 rounded-b-3xl">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => onNavigate('home')} className="w-10 h-10 rounded-full bg-primary-50 dark:bg-gray-700 flex items-center justify-center mr-4">
          <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
        </motion.button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Saved Logs</h1>
          <p className="text-[10px] tracking-widest uppercase text-primary-600 dark:text-primary-400 font-bold">Your Calculations</p>
        </div>
      </header>

      <div className="px-6 py-6 flex-1 overflow-y-auto space-y-4">
        <AnimatePresence>
          {calculations.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500">
              <Map className="w-16 h-16 mb-4 opacity-50" />
              <p className="font-bold">No saved calculations yet.</p>
            </motion.div>
          ) : (
            calculations.map((calc, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0 }}
                transition={{ type: 'spring' }}
                key={calc.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{calc.name}</h3>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(calc.date).toLocaleDateString()}
                    </div>
                  </div>
                  <motion.button whileTap={{ scale: 0.8 }} onClick={() => onDelete(calc.id)} className="w-10 h-10 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-primary-50 dark:bg-gray-700 p-4 rounded-2xl">
                    <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Area</p>
                    <p className="font-black text-gray-900 dark:text-white text-lg">{calc.area} {calc.unit}</p>
                  </div>
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-2xl">
                    <p className="text-[10px] font-bold text-primary-700 dark:text-primary-400 uppercase tracking-wider mb-1">Urea</p>
                    <p className="font-black text-primary-700 dark:text-primary-300 text-lg">{calc.ureaRequired} kg</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-300">
                    {calc.bags} Bags <span className="text-gray-500 dark:text-gray-400 font-medium">({calc.bagSize}kg)</span>
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare(calc)}
                    className="text-primary-600 dark:text-primary-400 flex items-center text-sm font-bold bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-xl"
                  >
                    <Share2 className="w-4 h-4 mr-2" /> SHARE
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
