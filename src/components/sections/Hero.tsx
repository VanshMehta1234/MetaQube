import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import HeroCube from '../3d/HeroCube';
import { useAppStore } from '../../store/useAppStore';
import { useMousePosition } from '../../hooks/useMousePosition';
import ToggleGroup from '../ui/ToggleGroup';
import { Boxes } from '../ui/background-boxes';
import PickAnyTwo from '../ui/PickAnyTwo';
import PickAnyTwoGlowing from '../ui/PickAnyTwoGlowing';

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
      ease: [0.22, 1, 0.36, 1]
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
    
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [resetToggleOptions]);
  
  // Handle tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setIsVisible(visible);
      
      if (visible && sectionRef.current && mousePosition.x !== null && mousePosition.y !== null) {
        if (!visible && ctaIntervalRef.current) {
          clearInterval(ctaIntervalRef.current);
          ctaIntervalRef.current = null;
        } else if (!ctaIntervalRef.current) {
          ctaIntervalRef.current = window.setInterval(() => nextCTA(), 4000);
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [mousePosition, nextCTA]);
  
  // Handle mouse movement for localized hover effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (y > 100) {
      setHoverPosition({ x, y });
    } else {
      setHoverPosition(null);
    }
  };
  
  const handleMouseLeave = () => {
    setHoverPosition(null);
  };
  
  // CTA message rotation
  useEffect(() => {
    if (!isVisible) return;
    
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
    <>
      <section 
        ref={sectionRef}
        className={`relative min-h-screen flex flex-col items-center justify-center pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 overflow-hidden transition-colors duration-500 ${
          metaMirrorMode ? 'bg-deepCosmos-900' : 'bg-slate-900'
        }`}
        style={{ fontFamily: "'Inter', sans-serif" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background boxes with localized hover effect */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
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
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 z-20 flex flex-col md:flex-row items-center justify-between relative min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[75vh] xl:min-h-[80vh]">
          {/* Left: Headline and content */}
          <motion.div
            className="w-full md:w-1/2 lg:w-2/3 xl:w-1/2 text-center md:text-left mb-8 md:mb-0"
            variants={containerVariants}
            initial="hidden"
            animate={contentLoaded ? 'visible' : 'hidden'}
          >
            <motion.p 
              variants={itemVariants}
              className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold tracking-widest uppercase mb-4 text-metaEmerald-400"
            >
              METAQUBE
            </motion.p>
            <motion.h1 
              className="font-extrabold mb-6 sm:mb-8 tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-br from-white via-metaEmerald-400 to-metaEmerald-600 bg-clip-text text-transparent drop-shadow-xl whitespace-nowrap"
              variants={itemVariants}
            >
              Build the Future. <span className="hidden md:inline"><br /></span><span className="text-white/90">Web3, AI & Beyond</span>
            </motion.h1>
            <motion.div
              variants={itemVariants}
              className="inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold mb-6 bg-metaEmerald-500/10 text-metaEmerald-400 border border-metaEmerald-400/30 shadow-md backdrop-blur-sm"
            >
              🚀 Next-gen Blockchain & AI Solutions
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl px-2 sm:px-4 text-gray-200 mx-auto md:mx-0 mb-6 sm:mb-8"
            >
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white/80">
                Empowering enterprises to innovate, scale, and lead with secure, intelligent, and future-ready digital infrastructure.
              </p>
            </motion.div>
            <motion.div
              className="flex items-center justify-center md:justify-start mt-6 sm:mt-8"
              variants={itemVariants}
              initial="hidden"
              animate={contentLoaded ? 'visible' : 'hidden'}
              transition={{ delay: 1.2 }}
            >
              <motion.a
                href="#build-qube"
                className={`px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg text-base sm:text-lg md:text-xl font-bold shadow-xl transition-all focus:outline-none focus:ring-4 focus:ring-metaEmerald-400/40 ${
                  metaMirrorMode 
                    ? 'bg-gradient-to-r from-metaEmerald-500 to-metaEmerald-400 text-deepCosmos-900 shadow-metaEmerald-500/20 hover:from-metaEmerald-400 hover:to-metaEmerald-500'
                    : 'bg-white text-deepCosmos-900 shadow-black/10 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
              </motion.a>
            </motion.div>
          </motion.div>
          {/* Right: HeroCube */}
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/2 flex items-center justify-center mt-8 md:mt-0">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[450px] aspect-square flex items-center justify-end md:justify-center">
              <div className="relative z-10 scale-100 sm:scale-110 md:scale-120 lg:scale-130 xl:scale-140 drop-shadow-2xl md:scale-132 md:ml-4">
                {contentLoaded && <HeroCube />}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center bg-transparent">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={contentLoaded ? 'visible' : 'hidden'}
          transition={{ delay: 1.8 }}
          className="my-8 sm:my-10 md:my-12 lg:my-14 w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[440px] px-2 sm:px-4 mx-auto"
        >
          <ToggleGroup />
        </motion.div>
      </section>
    </>
  );
};

// Use React.memo for component memoization
export default React.memo(Hero);