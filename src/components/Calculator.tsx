import React, { useState } from 'react';
import { CROPS, Crop, SavedCalculation } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowLeft, Save, Share2, Calculator as CalcIcon } from 'lucide-react';

interface CalculatorProps {
  onSave: (calc: SavedCalculation) => void;
  onNavigate: (view: any) => void;
}

export default function Calculator({ onSave, onNavigate }: CalculatorProps) {
  const [step, setStep] = useState(1);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [area, setArea] = useState<string>('5.0');
  const [unit, setUnit] = useState<'Acre' | 'Hectare'>('Acre');
  const [bagSize, setBagSize] = useState<number>(45);
  const [pricePerBag, setPricePerBag] = useState<string>('');

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => {
    if (step === 1) onNavigate('home');
    else setStep((s) => s - 1);
  };

  const areaValue = parseFloat(area) || 0;
  const areaInHectares = unit === 'Acre' ? areaValue / 2.47105 : areaValue;
  const nitrogenRequired = selectedCrop ? selectedCrop.nitrogenPerHectare * areaInHectares : 0;
  const ureaRequired = nitrogenRequired / 0.46;
  const bags = Math.floor(ureaRequired / bagSize);
  const remainingKg = Math.round(ureaRequired % bagSize);
  const priceValue = parseFloat(pricePerBag) || 0;
  const totalCost = (ureaRequired / bagSize) * priceValue;

  const handleSave = () => {
    if (!selectedCrop) return;
    const calc: SavedCalculation = {
      id: crypto.randomUUID(),
      name: `${selectedCrop.name} Field`,
      date: new Date().toISOString(),
      cropName: selectedCrop.name,
      area: areaValue,
      unit,
      nitrogenRequired: Math.round(nitrogenRequired),
      ureaRequired: Math.round(ureaRequired),
      bags,
      bagSize,
      remainingKg,
      totalCost: priceValue > 0 ? totalCost : null,
    };
    onSave(calc);
    onNavigate('saved');
  };

  const handleShare = () => {
    if (!selectedCrop) return;
    const text = `Bhumi Urea Report\nCrop: ${selectedCrop.name}\nArea: ${areaValue} ${unit}\nUrea Required: ${Math.round(ureaRequired)} kg\nBags (${bagSize}kg): ${bags} bags + ${remainingKg} kg\nCost: ₹${Math.round(totalCost)}`;
    if (navigator.share) {
      navigator.share({ title: 'Urea Calculation', text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Report copied to clipboard!');
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 300, damping: 24 } },
    exit: { opacity: 0, x: -20, filter: 'blur(4px)', transition: { duration: 0.2 } }
  };

  return (
    <div className="flex flex-col h-full bg-primary-50 dark:bg-gray-900 pb-20 font-sans">
      <header className="flex items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-sm shrink-0 z-10 rounded-b-3xl">
        <motion.button whileTap={{ scale: 0.9 }} onClick={handleBack} className="w-10 h-10 rounded-full bg-primary-50 dark:bg-gray-700 flex items-center justify-center mr-4">
          <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
        </motion.button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Urea Calculator</h1>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What crop are you planting?</h2>
              <div className="grid grid-cols-2 gap-4">
                {CROPS.map((crop, i) => (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={crop.id}
                    onClick={() => { setSelectedCrop(crop); setTimeout(handleNext, 150); }}
                    className={`p-5 rounded-3xl border-2 flex flex-col items-center justify-center gap-2 transition-colors ${selectedCrop?.id === crop.id ? 'border-primary-500 bg-primary-100 dark:bg-primary-900/40 shadow-inner' : 'border-transparent bg-white dark:bg-gray-800 shadow-sm'}`}
                  >
                    <span className={`text-lg font-bold ${selectedCrop?.id === crop.id ? 'text-primary-800 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>{crop.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Cultivated Land Area</h2>
              <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Area Value</label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. 5"
                    className="w-full bg-primary-50 dark:bg-gray-700 border-none rounded-2xl py-5 px-6 text-2xl font-black text-gray-900 dark:text-white focus:ring-4 focus:ring-primary-500/20 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Unit</label>
                  <div className="flex gap-3 bg-gray-50 dark:bg-gray-900 p-1.5 rounded-2xl">
                    {(['Acre', 'Hectare'] as const).map(u => (
                      <button
                        key={u}
                        onClick={() => setUnit(u)}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${unit === u ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!areaValue || areaValue <= 0}
                onClick={handleNext}
                className="w-full bg-primary-600 text-white rounded-3xl py-5 font-bold text-lg shadow-[0_8px_16px_rgba(22,163,74,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                Calculate <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Calculation Result</h2>
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <CalcIcon className="w-32 h-32" />
                </div>
                <span className="text-primary-100 font-semibold uppercase tracking-wider text-sm relative z-10">Total Urea Required</span>
                <div className="my-4 relative z-10">
                  <span className="text-7xl font-black">{Math.round(ureaRequired).toLocaleString()}</span>
                  <span className="text-2xl font-bold text-primary-200 ml-2">kg</span>
                </div>
                <p className="text-primary-100 font-medium relative z-10 bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
                  Based on {Math.round(nitrogenRequired)}kg N requirement for {area} {unit} of {selectedCrop?.name}
                </p>
              </motion.div>

              <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex justify-between items-center">
                  Split Application
                  <span className="text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 px-3 py-1 rounded-full">3 Doses</span>
                </h3>
                <div className="space-y-3">
                  {[
                    { pct: 40, label: 'Basal', amount: ureaRequired * 0.4 },
                    { pct: 30, label: 'Tillering', amount: ureaRequired * 0.3 },
                    { pct: 30, label: 'Flowering', amount: ureaRequired * 0.3 }
                  ].map((phase, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center font-bold text-primary-600 dark:text-primary-400">
                          {phase.pct}%
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">{phase.label}</span>
                      </div>
                      <span className="font-black text-gray-700 dark:text-gray-300">{Math.round(phase.amount)} kg</span>
                    </div>
                  ))}
                </div>
              </section>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-3xl py-5 font-bold text-lg shadow-lg flex items-center justify-center gap-2"
              >
                Plan Bags & Cost <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Bag & Cost Estimation</h2>
              
              <div className="bg-primary-600 rounded-3xl p-6 text-white shadow-lg flex justify-between items-center">
                <div>
                  <span className="text-primary-100 font-semibold uppercase tracking-wider text-xs">Total Bags</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-5xl font-black">{bags}</span>
                    <span className="text-lg font-bold opacity-80">Full Bags</span>
                  </div>
                </div>
                {remainingKg > 0 && (
                  <div className="bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-sm text-center">
                    <span className="block text-xs text-primary-100 font-bold uppercase">Loose</span>
                    <span className="block text-xl font-bold">+{remainingKg}kg</span>
                  </div>
                )}
              </div>

              <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="mb-6">
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

                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Price per bag (Optional)</label>
                  <input
                    type="number"
                    value={pricePerBag}
                    onChange={(e) => setPricePerBag(e.target.value)}
                    placeholder="e.g. 266"
                    className="w-full bg-primary-50 dark:bg-gray-700 border-none rounded-2xl py-4 px-5 text-lg font-bold text-gray-900 dark:text-white focus:ring-4 focus:ring-primary-500/20 outline-none transition-shadow"
                  />
                  <AnimatePresence>
                    {priceValue > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl border border-green-200 dark:border-green-800/30 flex justify-between items-center overflow-hidden"
                      >
                        <span className="font-bold text-green-800 dark:text-green-300">Total Cost</span>
                        <span className="text-2xl font-black text-green-600 dark:text-green-400">₹ {Math.round(totalCost).toLocaleString()}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="flex-1 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-3xl py-4 font-bold shadow-sm flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" /> SAVE
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex-1 bg-primary-600 text-white rounded-3xl py-4 font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" /> SHARE
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
