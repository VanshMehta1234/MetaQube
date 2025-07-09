import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
// import HeroCube from '../3d/HeroCube';
import { useAppStore } from '../../store/useAppStore';
import { useMousePosition } from '../../hooks/useMousePosition';
// import ToggleGroup from '../ui/ToggleGroup';
import { Boxes } from '../ui/background-boxes';

// Animation variants for staggered loading
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] // Custom ease curve similar to Linear's
    }
  }
};

const Hero: React.FC = () => {
  const { metaMirrorMode, nextCTA, resetToggleOptions } = useAppStore();
  const mousePosition = useMousePosition();
  const sectionRef = useRef<HTMLElement>(null);
  const ctaIntervalRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<{ x: number, y: number } | null>(null);
  
  // Reset toggle options on mount
  useEffect(() => {
    resetToggleOptions();
    
    // Simulate content loading delay
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [resetToggleOptions]);
  
  // Handle tab visibility changes with a single listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setIsVisible(visible);
      
      // When tab becomes visible again, recalculate positions
      if (visible && sectionRef.current && mousePosition.x !== null && mousePosition.y !== null) {
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
  
  // Handle mouse movement for localized hover effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Only show spotlight if cursor is below the header area (roughly 100px from top)
    if (y > 100) {
      setHoverPosition({ x, y });
    } else {
      setHoverPosition(null);
    }
  };
  
  const handleMouseLeave = () => {
    setHoverPosition(null);
  };
  
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
  
  // Create SVG mask for spotlight effect
  const spotlightMask = hoverPosition ? `
    radial-gradient(
      circle 250px at ${hoverPosition.x}px ${hoverPosition.y}px,
      white 0%,
      transparent 90%
    )
  ` : 'none';
  
  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-24 md:pt-28 overflow-hidden transition-colors duration-500 ${
        metaMirrorMode ? 'bg-deepCosmos-900' : 'bg-slate-900'
      }`}
      style={{ fontFamily: "'Inter', sans-serif" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background boxes with localized hover effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Dark background to ensure boxes are only visible through the spotlight */}
        {/* <div className="absolute inset-0 bg-slate-900" /> */}
        
        <div 
          className="absolute inset-0 z-1"
          style={{
            maskImage: spotlightMask,
            WebkitMaskImage: spotlightMask,
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            backgroundColor: 'transparent',
          }}
        >
          <Boxes />
        </div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: metaMirrorMode 
              ? 'radial-gradient(circle at 20% 20%, rgba(26, 209, 181, 0.15) 0%, transparent 20%), radial-gradient(circle at 80% 60%, rgba(26, 209, 181, 0.1) 0%, transparent 20%)'
              : 'radial-gradient(circle at 20% 20%, rgba(0, 0, 0, 0.05) 0%, transparent 20%), radial-gradient(circle at 80% 60%, rgba(0, 0, 0, 0.03) 0%, transparent 20%)',
            backgroundSize: '120% 120%',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 opacity-30"
          style={{
            background: metaMirrorMode
              ? 'linear-gradient(135deg, rgba(26, 209, 181, 0.2) 0%, transparent 100%)'
              : 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, transparent 100%)'
          }}
        />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 opacity-20"
          style={{
            background: metaMirrorMode
              ? 'linear-gradient(45deg, rgba(26, 209, 181, 0.15) 0%, transparent 100%)'
              : 'linear-gradient(45deg, rgba(0, 0, 0, 0.03) 0%, transparent 100%)'
          }}
        />
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-16 h-16 rounded-full"
          initial={{ x: '10%', y: '20%' }}
          animate={{ 
            x: ['10%', '15%', '10%'], 
            y: ['20%', '25%', '20%'] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{
            background: metaMirrorMode
              ? 'radial-gradient(circle, rgba(26, 209, 181, 0.3) 0%, rgba(26, 209, 181, 0) 70%)'
              : 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0) 70%)',
            filter: 'blur(8px)'
          }}
        />
        <motion.div
          className="absolute w-24 h-24 rounded-full"
          initial={{ x: '80%', y: '70%' }}
          animate={{ 
            x: ['80%', '75%', '80%'], 
            y: ['70%', '65%', '70%'] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{
            background: metaMirrorMode
              ? 'radial-gradient(circle, rgba(26, 209, 181, 0.2) 0%, rgba(26, 209, 181, 0) 70%)'
              : 'radial-gradient(circle, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0) 70%)',
            filter: 'blur(10px)'
          }}
        />
      </div>
      
      {/* Container for main content */}
      <div className="container mx-auto px-4 sm:px-6 z-20 flex flex-col items-center relative">
        {/* Hero content with staggered loading animation */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16 mt-6 sm:mt-8 md:mt-10 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate={contentLoaded ? "visible" : "hidden"}
        >
          {/* Brand name */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg font-semibold tracking-wide uppercase mb-4 sm:mb-5 text-metaEmerald-400"
          >
            METAQUBE
          </motion.p>

          {/* Main headline with gradient text */}
          <motion.h1 
            className="font-extrabold mb-6 sm:mb-8 tracking-tight leading-tight"
            variants={itemVariants}
          >
            {/* First part with gradient */}
            <span className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-b from-gray-200 to-white bg-clip-text text-transparent">
              Powering Digital
            </span>
            <br/>
            {/* Second part in pure white */}
            <span className="inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white">
              Innovation with Web3 + AI
            </span>
          </motion.h1>
          
          {/* Animated highlight badge */}
          <motion.div
            variants={itemVariants}
            className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-8 ${
              metaMirrorMode 
                ? 'bg-metaEmerald-500/20 text-metaEmerald-400' 
                : 'bg-black/20 text-gray-100'
            }`}
          >
            <span className="mr-2">✨</span> Enterprise-grade blockchain solutions
          </motion.div>
          
          {/* Subheading with clearer value proposition */}
          <motion.div 
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto leading-relaxed px-2 sm:px-4 text-gray-200"
          >
            <p className="text-base sm:text-lg md:text-xl max-w-xl mx-auto font-medium">
              Enterprise-grade blockchain infrastructure with AI intelligence. Trusted by industry leaders for secure, scalable solutions that transform business operations.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Single CTA Button with enhanced styling - MOVED TO LAST */}
        <motion.div
          className="flex items-center justify-center mb-16 sm:mb-20 md:mb-24 mt-12"
          variants={itemVariants}
          initial="hidden"
          animate={contentLoaded ? "visible" : "hidden"}
          transition={{ delay: 2.2 }}
        >
          <motion.a
            href="#build-qube"
            className={`px-10 sm:px-12 py-5 sm:py-6 rounded-lg text-lg sm:text-xl font-bold shadow-xl transition-all ${
              metaMirrorMode 
                ? 'bg-gradient-to-r from-metaEmerald-500 to-metaEmerald-400 text-deepCosmos-900 shadow-metaEmerald-500/20 hover:from-metaEmerald-400 hover:to-metaEmerald-500' 
                : 'bg-black text-white shadow-black/15 hover:bg-gray-900'
            }`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: metaMirrorMode 
                ? '0 20px 40px -15px rgba(26, 209, 181, 0.5)'
                : '0 20px 40px -15px rgba(0, 0, 0, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Build Together
          </motion.a>
        </motion.div>
        
        {/* <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={contentLoaded ? "visible" : "hidden"}
          transition={{ delay: 1.1 }}
          className="mb-8 sm:mb-10 w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] mx-auto"
        >
          <HeroCube />
        </motion.div>

        
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={contentLoaded ? "visible" : "hidden"}
          transition={{ delay: 1.8 }}
          className="mb-10 sm:mb-12 md:mb-16 w-full max-w-[280px] sm:max-w-lg md:max-w-xl px-2 sm:px-4"
        >
          <ToggleGroup />
        </motion.div>  */}

        
      </div>
    </section>
  );
};

// Use React.memo for component memoization
export default React.memo(Hero);