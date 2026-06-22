"use client";

import { useState } from "react";
import { Calculator, Download, ChevronRight, TrendingUp, Server, Zap, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ROICalculator() {
  const t = useTranslations('ROI');
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    users: 500,
    currentCost: 100000,
    growthRate: 15,
  });
  const [calculating, setCalculating] = useState(false);

  const calculateROI = () => {
    // Basic simulation logic
    const fiveYearCostCurrent = data.currentCost * 5 * (1 + data.growthRate / 100);
    const fiveYearCostHybris = (data.currentCost * 0.6) * 5 * (1 + (data.growthRate * 0.5) / 100); // Hybris is 40% cheaper to maintain, scales better
    const savings = fiveYearCostCurrent - fiveYearCostHybris;
    const roi = (savings / (data.currentCost * 1.5)) * 100; // Assume 1.5x initial cost for migration
    return {
      savings: Math.round(savings),
      roi: Math.round(roi),
      payback: (12 / (roi / 100)).toFixed(1) // months
    };
  };

  const handleCalculate = () => {
    setCalculating(true);
    setTimeout(() => {
      setCalculating(false);
      setStep(2);
    }, 1500);
  };

  const results = calculateROI();

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden relative">
      {/* Decorative top bar */}
      <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />
      
      <div className="p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center border border-blue-100 dark:border-blue-800">
            <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title')}</h2>
            <p className="text-gray-500 text-sm mt-1">{t('desc')}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Server className="w-4 h-4 text-gray-400" /> {t('costLabel')}
                  </label>
                  <input 
                    type="number" 
                    value={data.currentCost} 
                    onChange={e => setData({...data, currentCost: Number(e.target.value)})}
                    className="w-full text-xl p-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 outline-none text-gray-900 dark:text-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" /> {t('growthLabel')}
                  </label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="5" max="100" step="5"
                      value={data.growthRate} 
                      onChange={e => setData({...data, growthRate: Number(e.target.value)})}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <span className="text-xl font-bold text-blue-600 w-16 text-right">%{data.growthRate}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleCalculate}
                disabled={calculating}
                className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 group shadow-xl shadow-blue-500/20"
              >
                {calculating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analiz Ediliyor...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-yellow-300" /> {t('generateBtn')} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-800/50">
                  <p className="text-sm font-bold text-green-800 dark:text-green-400 mb-2">{t('savingsTitle')}</p>
                  <p className="text-3xl font-black text-green-600 dark:text-green-500">${results.savings.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                  <p className="text-sm font-bold text-blue-800 dark:text-blue-400 mb-2">{t('roiTitle')}</p>
                  <p className="text-3xl font-black text-blue-600 dark:text-blue-500">%{results.roi}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/10 p-6 rounded-2xl border border-purple-100 dark:border-purple-800/50">
                  <p className="text-sm font-bold text-purple-800 dark:text-purple-400 mb-2">{t('paybackTitle')}</p>
                  <p className="text-3xl font-black text-purple-600 dark:text-purple-500">{results.payback}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">{t('expertAssessment')}</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t.rich('expertPoint1', { 
                        growthRate: data.growthRate, 
                        strong: (chunks) => <strong>{chunks}</strong> 
                      })}
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t.rich('expertPoint2', { 
                        payback: results.payback, 
                        strong: (chunks) => <strong>{chunks}</strong> 
                      })}
                    </p>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button 
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
                >
                  <Download className="w-4 h-4" /> {t('downloadPdf')}
                </button>
                <button 
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {t('recalculate')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
