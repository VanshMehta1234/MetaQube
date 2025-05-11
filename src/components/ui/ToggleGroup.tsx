import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

const ToggleGroup: React.FC = () => {
  const { toggleOptions, updateToggleOption, metaMirrorMode } = useAppStore();
  const [message, setMessage] = useState<string>('Pick any two');
  
  useEffect(() => {
    const fast = toggleOptions.find(o => o.id === 'fast')?.active || false;
    const cheap = toggleOptions.find(o => o.id === 'cheap')?.active || false;
    const good = toggleOptions.find(o => o.id === 'good')?.active || false;
    
    const activeCount = toggleOptions.filter(o => o.active).length;
    
    if (activeCount < 2) {
      setMessage('Pick any two');
    } else if (fast && cheap) {
      setMessage("You get what you get. 🤷‍♂️");
    } else if (cheap && good) {
      setMessage("It's gonna take time. ⏳");
    } else if (fast && good) {
      setMessage("The best choice of them all! 🌟");
    }
  }, [toggleOptions]);
  
  return (
    <div className={`relative p-3 sm:p-5 md:p-6 rounded-xl backdrop-blur-sm ${
      metaMirrorMode 
        ? 'border-deepCosmos-700' 
        : 'border-gray-100'
    }`}>
      <div className="flex flex-col items-center space-y-4 md:space-y-5">
        <h2 className={`text-lg sm:text-xl md:text-2xl font-bold ${
          metaMirrorMode ? 'text-prismWhite' : 'text-black'
        }`}>Pick any two</h2>
        
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
          {toggleOptions.map((option) => {
            const isActive = option.active;
            return (
              <motion.button
                key={option.id}
                onClick={() => updateToggleOption(option.id, !isActive)}
                className={`relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg text-sm sm:text-base md:text-lg font-semibold transition-all overflow-hidden w-[90px] sm:w-[100px] md:w-[110px]
                  ${isActive 
                    ? metaMirrorMode
                      ? 'bg-metaEmerald-500 text-deepCosmos-900 shadow-lg' 
                      : 'bg-black text-white shadow-md' 
                    : metaMirrorMode
                      ? 'bg-deepCosmos-600 text-quantumGrey-300'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: isActive
                    ? metaMirrorMode 
                      ? '0 10px 20px -5px rgba(26, 209, 181, 0.3)' 
                      : '0 10px 20px -5px rgba(0, 0, 0, 0.2)'
                    : '0 5px 10px -5px rgba(0, 0, 0, 0.1)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow effect */}
                {isActive && (
                  <motion.div
                    className={`absolute inset-0 ${
                      metaMirrorMode ? 'bg-metaEmerald-500' : 'bg-black'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0.05, 0.1, 0.05],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                
                {/* Button content */}
                <span className="relative z-10">{option.label}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className={`absolute right-2 top-1/2 -translate-y-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${
                      metaMirrorMode ? 'bg-deepCosmos-900' : 'bg-white'
                    }`}
                    layoutId={`indicator-${option.id}`}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className={`text-center text-sm sm:text-base md:text-lg font-medium mt-1 ${
              metaMirrorMode ? 'text-metaEmerald-400' : 'text-gray-900'
            }`}
          >
            {message}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ToggleGroup;