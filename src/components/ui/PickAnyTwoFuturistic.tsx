import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OPTIONS = [
  { label: 'Fast', key: 'fast', color: 'from-cyan-400 to-teal-300', ring: 'ring-cyan-300' },
  { label: 'Cheap', key: 'cheap', color: 'from-blue-400 to-cyan-500', ring: 'ring-blue-300' },
  { label: 'Good', key: 'good', color: 'from-teal-400 to-cyan-300', ring: 'ring-teal-300' },
];

const getTradeoffMessage = (selected: string[]) => {
  if (selected.length < 2) return 'Pick any two.';
  if (selected.includes('fast') && selected.includes('cheap')) return 'Fast & Cheap: Quality may be compromised.';
  if (selected.includes('fast') && selected.includes('good')) return 'Fast & Good: It won\'t be cheap.';
  if (selected.includes('cheap') && selected.includes('good')) return 'Cheap & Good: It won\'t be fast.';
  return '';
};

const PickAnyTwoFuturistic: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (key: string) => {
    setSelected((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length === 2) return [prev[1], key];
      return [...prev, key];
    });
  };

  return (
    <section className="relative w-full flex justify-center items-center py-24 px-4 bg-[#0a1015] overflow-hidden min-h-[600px]">
      {/* Animated grid mesh background */}
      <div className="absolute inset-0 z-0 pointer-events-none animate-pulse">
        <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.14 }}>
          {[...Array(32)].map((_, i) => (
            <line key={i} x1={i * 48} y1={0} x2={i * 48} y2={2000} stroke="#00fff7" strokeWidth="1" />
          ))}
          {[...Array(18)].map((_, i) => (
            <line key={i} x1={0} y1={i * 48} x2={2000} y2={i * 48} stroke="#00fff7" strokeWidth="1" />
          ))}
        </svg>
        {/* Glowing particles */}
        <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.18 }}>
          {[...Array(18)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 1920}
              cy={Math.random() * 1080}
              r={Math.random() * 18 + 8}
              fill="#00fff7"
              fillOpacity={Math.random() * 0.12 + 0.04}
            />
          ))}
        </svg>
      </div>
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-4 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent drop-shadow-xl tracking-tight font-[Orbitron,sans-serif]">
          Pick Any Two
        </h2>
        <p className="text-base sm:text-lg text-center text-white/80 mb-10 max-w-xl font-[Orbitron,sans-serif]">
          In the world of innovation, you can only optimize for two. What matters most for your next AI + Web3 project?
        </p>
        {/* 3D Triangle with glowing lines and buttons */}
        <div className="relative w-[320px] h-[280px] sm:w-[400px] sm:h-[340px] mx-auto flex items-center justify-center mb-10">
          {/* Glowing triangle lines */}
          <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" width="100%" height="100%">
            <polygon points="200,30 370,290 30,290" fill="none" stroke="#00fff7" strokeWidth="4" filter="url(#glow)" />
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
          {/* Buttons at triangle vertices */}
          <motion.button
            whileHover={{ scale: 1.12, boxShadow: '0 0 32px #00fff7, 0 0 8px #00fff7' }}
            className={`absolute left-1/2 -translate-x-1/2 top-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full font-black text-lg sm:text-2xl bg-gradient-to-br ${OPTIONS[0].color} text-black shadow-2xl border-4 border-cyan-300/40 focus:outline-none focus:ring-4 focus:ring-cyan-400/30 transition-all font-[Orbitron,sans-serif] ${selected.includes('fast') ? OPTIONS[0].ring + ' ring-4' : ''}`}
            onClick={() => handleSelect('fast')}
            style={{ textShadow: '0 0 12px #00fff7' }}
          >
            Fast
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.12, boxShadow: '0 0 32px #00fff7, 0 0 8px #00fff7' }}
            className={`absolute left-0 bottom-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full font-black text-lg sm:text-2xl bg-gradient-to-br ${OPTIONS[1].color} text-black shadow-2xl border-4 border-blue-300/40 focus:outline-none focus:ring-4 focus:ring-blue-400/30 transition-all font-[Orbitron,sans-serif] ${selected.includes('cheap') ? OPTIONS[1].ring + ' ring-4' : ''}`}
            onClick={() => handleSelect('cheap')}
            style={{ textShadow: '0 0 12px #00fff7' }}
          >
            Cheap
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.12, boxShadow: '0 0 32px #00fff7, 0 0 8px #00fff7' }}
            className={`absolute right-0 bottom-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full font-black text-lg sm:text-2xl bg-gradient-to-br ${OPTIONS[2].color} text-black shadow-2xl border-4 border-teal-300/40 focus:outline-none focus:ring-4 focus:ring-teal-400/30 transition-all font-[Orbitron,sans-serif] ${selected.includes('good') ? OPTIONS[2].ring + ' ring-4' : ''}`}
            onClick={() => handleSelect('good')}
            style={{ textShadow: '0 0 12px #00fff7' }}
          >
            Good
          </motion.button>
        </div>
        {/* Futuristic info card for tradeoff result */}
        <AnimatePresence>
          <motion.div
            key={selected.join('-')}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg mx-auto bg-gradient-to-br from-[#0a1a1a]/80 to-[#0a1015]/90 border border-cyan-400/20 rounded-2xl shadow-2xl px-8 py-6 text-center mt-2 backdrop-blur-md"
          >
            <span className="text-2xl sm:text-3xl font-bold text-cyan-300 font-[Orbitron,sans-serif] tracking-wide drop-shadow-lg">
              {getTradeoffMessage(selected)}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PickAnyTwoFuturistic;
