import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import HeroCube from '../3d/HeroCube';
import { useAppStore } from '../../store/useAppStore';
import { useMousePosition } from '../../hooks/useMousePosition';
import ToggleGroup from '../ui/ToggleGroup';

const ctaMessages = [
  { id: 0, text: "Need a Qube that slaps?" },
  { id: 1, text: "Brand's mid? Let's fix that." },
  { id: 2, text: "Web3's boring. You aren't." },
  { id: 3, text: "Meta without the verse." },
  { id: 4, text: "Craft digital experiences that matter." },
  { id: 5, text: "Build beyond boundaries." },
  { id: 6, text: "Accelerate your digital transformation." },
];

// Further reduced grid size for better performance
const GRID_COLS = 4;
const GRID_ROWS = 4;
const TOTAL_GRID_CELLS = GRID_COLS * GRID_ROWS;

const Hero: React.FC = () => {
  const { metaMirrorMode, currentCTA, nextCTA, resetToggleOptions } = useAppStore();
  const mousePosition = useMousePosition();
  const sectionRef = useRef<HTMLElement>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const mainOrbControls = useAnimation();
  const secondaryOrbControls = useAnimation();
  const pointerControls = useAnimation();
  const lastUpdateTime = useRef(0);
  const ctaIntervalRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  
  // Reset toggle options on mount
  useEffect(() => {
    resetToggleOptions();
  }, [resetToggleOptions]);
  
  // Handle tab visibility changes with a single listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setIsVisible(visible);
      
      // When tab becomes visible again, recalculate positions
      if (visible && sectionRef.current && mousePosition.x !== null && mousePosition.y !== null) {
        const rect = sectionRef.current.getBoundingClientRect();
        const normalizedX = ((mousePosition.x - rect.left) / rect.width) * 2 - 1;
        const normalizedY = ((mousePosition.y - rect.top) / rect.height) * 2 - 1;
        
        setMouseCoords({ x: normalizedX, y: normalizedY });
        
        // Also pause/resume CTA rotation
        if (!visible) {
          if (ctaIntervalRef.current) {
            clearInterval(ctaIntervalRef.current);
            ctaIntervalRef.current = null;
          }
        } else {
          if (!ctaIntervalRef.current) {
            ctaIntervalRef.current = window.setInterval(() => nextCTA(), 4000);
          }
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [mousePosition, nextCTA]);
  
  // Process mouse movement with throttling
  useEffect(() => {
    if (!sectionRef.current || mousePosition.x === null || mousePosition.y === null || !isVisible) return;
    
    const now = Date.now();
    if (now - lastUpdateTime.current < 50) return; // 50ms throttle
    
    lastUpdateTime.current = now;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const normalizedX = ((mousePosition.x - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((mousePosition.y - rect.top) / rect.height) * 2 - 1;
    
    setMouseCoords({ x: normalizedX, y: normalizedY });
    
    // Animate elements - only when tab is visible
    if (isVisible) {
      mainOrbControls.start({
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transition: { 
          type: "spring", 
          damping: 15, 
          stiffness: 150,
          mass: 0.6
        }
      });
      
      secondaryOrbControls.start({
        right: `${window.innerWidth - mousePosition.x}px`,
        bottom: `${window.innerHeight - mousePosition.y}px`,
        transition: { 
          type: "spring", 
          damping: 20, 
          stiffness: 100,
          mass: 0.9
        }
      });
      
      pointerControls.start({
        left: mousePosition.x,
        top: mousePosition.y,
        scale: 1,
        opacity: metaMirrorMode ? 0.15 : 0.08,
        transition: {
          type: "spring",
          damping: 8,
          stiffness: 250,
          mass: 0.2
        }
      });
    }
  }, [mousePosition, mainOrbControls, secondaryOrbControls, pointerControls, metaMirrorMode, isVisible]);
  
  // CTA message rotation with improved handling
  useEffect(() => {
    if (!isVisible) return;
    
    // Start the interval
    ctaIntervalRef.current = window.setInterval(() => nextCTA(), 4000);
    
    return () => {
      if (ctaIntervalRef.current) {
        clearInterval(ctaIntervalRef.current);
        ctaIntervalRef.current = null;
      }
    };
  }, [nextCTA, isVisible]);
  
  // Memoize the grid cells to avoid recreating them on every render
  const gridCells = React.useMemo(() => {
    return Array.from({ length: TOTAL_GRID_CELLS }).map((_, i) => {
      const colIndex = i % GRID_COLS;
      const rowIndex = Math.floor(i / GRID_COLS);
      
      return (
        <motion.div 
          key={i} 
          className={`border transition-colors duration-300 ${
            metaMirrorMode ? 'border-metaEmerald-500/10' : 'border-black/10'
          }`}
          style={{
            width: `${100 / GRID_COLS}%`,
            height: `${100 / GRID_ROWS}%`,
            position: 'absolute',
            left: `${(colIndex / GRID_COLS) * 100}%`,
            top: `${(rowIndex / GRID_ROWS) * 100}%`,
            opacity: Math.max(0.1, 
              0.8 - (Math.abs(
                colIndex / GRID_COLS - 0.5 + mouseCoords.x * 0.3
              ) + Math.abs(
                rowIndex / GRID_ROWS - 0.5 + mouseCoords.y * 0.3
              )) * 0.8
            )
          }}
        />
      );
    });
  }, [mouseCoords.x, mouseCoords.y, metaMirrorMode]);
  
  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-24 md:pt-28 overflow-hidden transition-colors duration-500 ${
        metaMirrorMode ? 'bg-deepCosmos-900' : 'bg-gradient-to-b from-gray-50 via-white to-white'
      }`}
    >
      {/* Only render animations when tab is visible */}
      {isVisible && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orbs that follow mouse movement */}
          <motion.div 
            className="absolute rounded-full blur-3xl will-change-transform"
            animate={mainOrbControls}
            initial={{
              left: "50%",
              top: "50%",
            }}
            style={{
              background: metaMirrorMode 
                ? 'radial-gradient(circle, rgba(26, 209, 181, 0.25) 0%, rgba(26, 209, 181, 0) 70%)' 
                : 'radial-gradient(circle, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0) 70%)',
              width: '60vw',
              height: '60vw',
              transform: 'translate(-50%, -50%)',
              opacity: metaMirrorMode ? 0.9 : 1,
              transformOrigin: 'center center',
              position: 'absolute'
            }}
          />
          
          {/* Secondary glow that moves opposite to mouse */}
          <motion.div 
            className="absolute rounded-full blur-3xl will-change-transform"
            animate={secondaryOrbControls}
            initial={{
              right: "50%",
              bottom: "50%",
            }}
            style={{
              background: metaMirrorMode 
                ? 'radial-gradient(circle, rgba(120, 255, 214, 0.15) 0%, rgba(120, 255, 214, 0) 70%)' 
                : 'radial-gradient(circle, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0) 75%)',
              width: '70vw',
              height: '70vw',
              transform: 'translate(50%, 50%)',
              opacity: metaMirrorMode ? 0.7 : 1,
              transformOrigin: 'center center',
              position: 'absolute'
            }}
          />
          
          {/* Simplified grid background with optimized rendering */}
          <div className="absolute inset-0 opacity-10">
            {gridCells}
          </div>
          
          {/* Pointer highlight effect */}
          <motion.div
            className="absolute rounded-full pointer-events-none will-change-transform"
            animate={pointerControls}
            initial={{
              left: "50%",
              top: "50%",
              scale: 0,
              opacity: 0
            }}
            style={{
              background: metaMirrorMode 
                ? 'radial-gradient(circle, rgba(26, 209, 181, 1) 0%, rgba(26, 209, 181, 0) 70%)'
                : 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 70%)',
              width: '15rem',
              height: '15rem',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 sm:px-6 z-10 flex flex-col items-center">
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-10 mt-4 sm:mt-6 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="font-extrabold mb-4 sm:mb-6 tracking-tight"
          >
            <span className={`inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${
              metaMirrorMode 
                ? 'bg-clip-text text-transparent bg-gradient-to-r from-metaEmerald-500 to-metaEmerald-400' 
                : 'bg-clip-text text-transparent bg-gradient-to-r from-black via-black to-gray-900'
            }`}>METAQUBE</span>
          </motion.h1>
          <motion.p 
            className={`text-base sm:text-lg md:text-xl max-w-md sm:max-w-2xl mx-auto leading-relaxed px-2 sm:px-4 ${
              metaMirrorMode ? 'text-quantumGrey-200' : 'text-gray-800'
            }`}
          >
            Crafting digital experiences that <span className={`font-semibold ${
              metaMirrorMode ? 'text-metaEmerald-500' : 'text-black'
            }`}>transcend</span> boundaries and <span className={`font-semibold ${
              metaMirrorMode ? 'text-metaEmerald-500' : 'text-black'
            }`}>accelerate</span> innovation.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 sm:mb-12 md:mb-16 w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] mx-auto"
        >
          <HeroCube />
        </motion.div>
        
        {/* Add ToggleGroup component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 sm:mb-12 md:mb-16 w-full max-w-[280px] sm:max-w-lg md:max-w-xl px-2 sm:px-4"
        >
          <ToggleGroup />
        </motion.div>
        
        <motion.div
          className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 mb-6 sm:mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className={`text-base sm:text-lg md:text-xl font-medium px-4 text-center ${
            metaMirrorMode ? 'text-metaEmerald-400' : 'text-gray-900'
          }`}>
            {ctaMessages[currentCTA].text}
          </p>
          
          <motion.a
            href="#build-qube"
            className={`px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg text-base sm:text-lg md:text-xl font-bold shadow-xl transition-all ${
              metaMirrorMode 
                ? 'bg-gradient-to-r from-metaEmerald-500 to-metaEmerald-400 text-deepCosmos-900 shadow-metaEmerald-500/20 hover:from-metaEmerald-400 hover:to-metaEmerald-500' 
                : 'bg-black text-white shadow-black/15 hover:bg-gray-900'
            }`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: metaMirrorMode 
                ? '0 15px 30px -10px rgba(26, 209, 181, 0.3)'
                : '0 15px 30px -10px rgba(0, 0, 0, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Build Your Qube
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// Use React.memo for component memoization
export default React.memo(Hero);