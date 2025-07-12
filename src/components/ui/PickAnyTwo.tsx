import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OPTIONS = [
  { label: 'Fast', color: 'from-cyan-400 to-teal-300', key: 'fast' },
  { label: 'Cheap', color: 'from-green-400 to-cyan-500', key: 'cheap' },
  { label: 'Good', color: 'from-teal-400 to-cyan-300', key: 'good' },
];

const getTradeoffMessage = (selected: string[]) => {
  if (selected.length < 2) return 'Pick any two.';
  if (selected.includes('fast') && selected.includes('cheap')) return 'Fast & Cheap: Quality may be compromised.';
  if (selected.includes('fast') && selected.includes('good')) return 'Fast & Good: It won\'t be cheap.';
  if (selected.includes('cheap') && selected.includes('good')) return 'Cheap & Good: It won\'t be fast.';
  return '';
};

const PickAnyTwo: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (key: string) => {
    setSelected((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length === 2) return [prev[1], key];
      return [...prev, key];
    });
  };

  return (
    <section className="relative w-full flex justify-center items-center py-20 px-4 bg-[#0a1015] overflow-hidden">
      {/* Glowing grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.13 }}>
          {[...Array(32)].map((_, i) => (
            <line key={i} x1={i * 48} y1={0} x2={i * 48} y2={2000} stroke="#0fffd7" strokeWidth="1" />
          ))}
          {[...Array(18)].map((_, i) => (
            <line key={i} x1={0} y1={i * 48} x2={2000} y2={i * 48} stroke="#0fffd7" strokeWidth="1" />
          ))}
        </svg>
      </div>
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-4 bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400 bg-clip-text text-transparent drop-shadow-xl tracking-tight">
          Pick Any Two
        </h2>
        <p className="text-base sm:text-lg text-center text-white/80 mb-10 max-w-xl">
          In the world of innovation, you can only optimize for two. What matters most for your next AI + Web3 project?
        </p>
        {/* Triangle layout for buttons */}
        <div className="relative w-[320px] h-[280px] sm:w-[400px] sm:h-[340px] mx-auto flex items-center justify-center mb-8">
          {/* Triangle lines */}
          <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" width="100%" height="100%">
            <polygon points="200,30 370,290 30,290" fill="none" stroke="#0fffd7" strokeWidth="2" opacity="0.18" />
          </svg>
          {/* Buttons at triangle vertices */}
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: '0 0 24px #0fffd7' }}
            className={`absolute left-1/2 -translate-x-1/2 top-0 px-8 py-3 rounded-full font-bold text-lg bg-gradient-to-r ${OPTIONS[0].color} text-black shadow-lg border-2 border-cyan-300/40 focus:outline-none focus:ring-4 focus:ring-cyan-400/30 transition-all ${selected.includes('fast') ? 'ring-4 ring-cyan-300' : ''}`}
            onClick={() => handleSelect('fast')}
          >
            Fast
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: '0 0 24px #0fffd7' }}
            className={`absolute left-0 bottom-0 px-8 py-3 rounded-full font-bold text-lg bg-gradient-to-r ${OPTIONS[1].color} text-black shadow-lg border-2 border-green-300/40 focus:outline-none focus:ring-4 focus:ring-green-400/30 transition-all ${selected.includes('cheap') ? 'ring-4 ring-green-300' : ''}`}
            onClick={() => handleSelect('cheap')}
          >
            Cheap
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: '0 0 24px #0fffd7' }}
            className={`absolute right-0 bottom-0 px-8 py-3 rounded-full font-bold text-lg bg-gradient-to-r ${OPTIONS[2].color} text-black shadow-lg border-2 border-teal-300/40 focus:outline-none focus:ring-4 focus:ring-teal-400/30 transition-all ${selected.includes('good') ? 'ring-4 ring-teal-300' : ''}`}
            onClick={() => handleSelect('good')}
          >
            Good
          </motion.button>
        </div>
        {/* Dynamic tradeoff message */}
        <AnimatePresence>
          <motion.div
            key={selected.join('-')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl font-semibold text-cyan-300 text-center min-h-[2.5rem]"
          >
            {getTradeoffMessage(selected)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PickAnyTwo;
