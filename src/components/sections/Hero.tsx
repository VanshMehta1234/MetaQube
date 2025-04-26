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

const Hero: React.FC = () => {
  const { metaMirrorMode, currentCTA, nextCTA, resetToggleOptions } = useAppStore();
  const mousePosition = useMousePosition();
  const sectionRef = useRef<HTMLElement>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const mainOrbControls = useAnimation();
  const secondaryOrbControls = useAnimation();
  const pointerControls = useAnimation();
  
  // Reset toggle options on mount
  useEffect(() => {
    resetToggleOptions();
  }, [resetToggleOptions]);
  
  // Update normalized mouse coordinates and animate lighting
  useEffect(() => {
    if (!sectionRef.current || mousePosition.x === null || mousePosition.y === null) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((mousePosition.x - rect.left) / rect.width) * 2 - 1;
    const y = ((mousePosition.y - rect.top) / rect.height) * 2 - 1;
    
    setMouseCoords({ x, y });
    
    // Directly animate the orbs for better synchronization
    mainOrbControls.start({
      left: `calc(50% + ${x * 20}%)`,
      top: `calc(50% + ${y * 20}%)`,
    });
    
    secondaryOrbControls.start({
      left: `calc(50% - ${x * 15}%)`,
      top: `calc(50% - ${y * 15}%)`,
    });
    
    pointerControls.start({
      left: mousePosition.x,
      top: mousePosition.y,
      scale: 1,
      opacity: metaMirrorMode ? 0.08 : 0.05,
    });
  }, [mousePosition, mainOrbControls, secondaryOrbControls, pointerControls, metaMirrorMode]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextCTA();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [nextCTA]);
  
  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen flex flex-col items-center justify-center pt-8 sm:pt-10 md:pt-12 overflow-hidden transition-colors duration-500 ${
        metaMirrorMode ? 'bg-deepCosmos-900' : 'bg-gradient-to-b from-gray-50 via-white to-white'
      }`}
    >
      {/* Reactive background lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs that follow mouse movement */}
        <motion.div 
          className="absolute rounded-full blur-3xl"
          animate={mainOrbControls}
          initial={{
            left: "50%",
            top: "50%",
          }}
          transition={{ 
            type: "spring", 
            damping: 20, 
            stiffness: 200,
            mass: 0.8
          }}
          style={{
            background: metaMirrorMode 
              ? 'radial-gradient(circle, rgba(26, 209, 181, 0.15) 0%, rgba(26, 209, 181, 0) 70%)' 
              : 'radial-gradient(circle, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0) 70%)',
            width: '50vw',
            height: '50vw',
            transform: 'translate(-50%, -50%)',
            opacity: metaMirrorMode ? 0.7 : 1,
          }}
        />
        
        {/* Secondary glow that moves opposite to mouse */}
        <motion.div 
          className="absolute rounded-full blur-3xl"
          animate={secondaryOrbControls}
          initial={{
            left: "50%",
            top: "50%",
          }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 120,
            mass: 1.2
          }}
          style={{
            background: metaMirrorMode 
              ? 'radial-gradient(circle, rgba(120, 255, 214, 0.1) 0%, rgba(120, 255, 214, 0) 70%)' 
              : 'radial-gradient(circle, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0) 75%)',
            width: '60vw',
            height: '60vw',
            transform: 'translate(-50%, -50%)',
            opacity: metaMirrorMode ? 0.5 : 1,
          }}
        />
        
        {/* Grid background */}
        <div 
          className={`absolute top-0 left-0 w-full h-full grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 grid-rows-6 sm:grid-rows-8 md:grid-rows-12 transition-opacity duration-300 ${
            metaMirrorMode ? 'opacity-20' : 'opacity-15'
          }`}
        >
          {Array.from({ length: metaMirrorMode ? 144 : 144 }).map((_, i) => (
            <motion.div 
              key={i} 
              className={`border transition-colors duration-300 ${
                metaMirrorMode ? 'border-metaEmerald-500/10' : 'border-black/10'
              }`}
              animate={{
                opacity: Math.max(0.1, 
                  0.5 - (Math.abs(
                    (i % 12) / 12 - 0.5 + mouseCoords.x * 0.2
                  ) + Math.abs(
                    Math.floor(i / 12) / 12 - 0.5 + mouseCoords.y * 0.2
                  )) * 0.6
                )
              }}
              transition={{
                duration: 0.05,
                ease: "linear"
              }}
            />
          ))}
        </div>
        
        {/* Pointer highlight effect */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          animate={pointerControls}
          initial={{
            left: "50%",
            top: "50%",
            scale: 0,
            opacity: 0
          }}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 300,
            mass: 0.2
          }}
          style={{
            background: metaMirrorMode 
              ? 'radial-gradient(circle, rgba(26, 209, 181, 1) 0%, rgba(26, 209, 181, 0) 70%)'
              : 'radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 70%)',
            width: '12rem',
            height: '12rem',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 z-10 flex flex-col items-center">
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-10 mt-8 sm:mt-12 md:mt-16"
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
            className={`text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed px-2 sm:px-4 ${
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
          className="mb-8 sm:mb-12 md:mb-16 w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] mx-auto"
        >
          <HeroCube />
        </motion.div>
        
        {/* Add ToggleGroup component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-10 sm:mb-16 md:mb-20 w-full max-w-[340px] sm:max-w-lg md:max-w-xl px-2 sm:px-4"
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

export default Hero;