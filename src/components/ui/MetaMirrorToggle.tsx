import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

const MetaMirrorToggle: React.FC = () => {
  const { metaMirrorMode, toggleMetaMirrorMode } = useAppStore();
  
  const handleToggle = () => {
    // Play glitch sound effect if available
    // const audio = new Audio('/sounds/glitch.mp3');
    // audio.play();
    
    toggleMetaMirrorMode();
  };
  
  return (
    <motion.button
      className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg transition-all duration-300 ${
        metaMirrorMode 
          ? 'bg-metaEmerald-500 text-deepCosmos-900 shadow-lg shadow-metaEmerald-500/20' 
          : 'bg-gradient-to-br from-deepCosmos-700 to-deepCosmos-800 text-quantumGrey-100 shadow-lg shadow-deepCosmos-900/10 hover:from-deepCosmos-600 hover:to-deepCosmos-700'
      }`}
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="font-medium relative">
        <span className="relative z-10">{metaMirrorMode ? 'Exit MetaMirror' : 'Enter MetaMirror'}</span>
        {metaMirrorMode && (
          <motion.span 
            className="absolute inset-0 bg-metaEmerald-400/20 blur-sm rounded-full" 
            animate={{ opacity: [0.2, 0.6, 0.2] }} 
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </span>
      
      <div className="relative">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="relative z-10"
        >
          <path d="M2 12h5"></path>
          <path d="M17 12h5"></path>
          <path d="M9 6v12"></path>
          <path d="M15 6v12"></path>
        </svg>
        
        {metaMirrorMode && (
          <motion.div 
            className="absolute inset-0 bg-metaEmerald-400/30 blur-sm rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </motion.button>
  );
};

export default MetaMirrorToggle;