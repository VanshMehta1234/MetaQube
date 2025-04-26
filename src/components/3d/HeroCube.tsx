import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useDeviceOrientation } from '../../hooks/useDeviceOrientation';
import { useWindowSize } from 'react-use';
import { useAppStore } from '../../store/useAppStore';

const HeroCube: React.FC = () => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const deviceOrientation = useDeviceOrientation();
  const { width, height } = useWindowSize();
  const { metaMirrorMode } = useAppStore();
  
  useEffect(() => {
    if (!cubeRef.current) return;
    
    let rotateX = 0;
    let rotateY = 0;
    let baseRotation = 0;
    
    const animate = () => {
      if (!cubeRef.current) return;
      
      baseRotation += 0.2;
      
      // Use device orientation on mobile
      if (width < 768 && deviceOrientation.beta !== null && deviceOrientation.gamma !== null) {
        rotateX = deviceOrientation.beta * 0.3;
        rotateY = deviceOrientation.gamma * 0.3;
      } 
      // Use mouse position on desktop
      else if (mousePosition.x !== null && mousePosition.y !== null) {
        const mouseXPercentage = (mousePosition.x / width) * 2 - 1;
        const mouseYPercentage = (mousePosition.y / height) * 2 - 1;
        rotateX = mouseYPercentage * 10;
        rotateY = mouseXPercentage * 10;
      }
      
      cubeRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY + baseRotation}deg) rotateZ(0deg)`;
      requestAnimationFrame(animate);
    };
    
    const animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [mousePosition, deviceOrientation, width, height]);
  
  const handleTap = () => {
    if (!cubeRef.current) return;
    
    // Add a quick spin animation on tap
    cubeRef.current.style.transition = 'transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    cubeRef.current.style.transform = 'rotateX(360deg) rotateY(360deg) rotateZ(0deg)';
    
    setTimeout(() => {
      if (cubeRef.current) {
        cubeRef.current.style.transition = 'transform 0.1s ease-out';
      }
    }, 1000);
  };
  
  return (
    <div className="relative flex items-center justify-center w-full h-80 sm:h-96">
      {/* Enhanced animated grid background */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20">
        {Array.from({ length: 64 }).map((_, i) => (
          <div 
            key={i} 
            className={`border transition-colors duration-300 ${
              metaMirrorMode ? 'border-metaEmerald-500/30' : 'border-metaEmerald-700/30'
            }`}
            style={{
              transitionDelay: `${i * 10}ms`,
            }}
          />
        ))}
      </div>
      
      {/* Enhanced glow effect behind cube */}
      <motion.div 
        className={`absolute w-48 h-48 rounded-full blur-3xl ${
          metaMirrorMode ? 'bg-metaEmerald-500/20' : 'bg-metaEmerald-500/15'
        }`}
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Additional ambient glow */}
      <motion.div
        className="absolute w-72 h-72 rounded-full"
        style={{
          background: metaMirrorMode
            ? 'radial-gradient(circle, rgba(26, 209, 181, 0.25) 0%, rgba(26, 209, 181, 0) 70%)'
            : 'radial-gradient(circle, rgba(26, 209, 181, 0.2) 0%, rgba(26, 209, 181, 0) 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Secondary glow pulse */}
      <motion.div
        className="absolute w-56 h-56 rounded-full"
        style={{
          background: metaMirrorMode
            ? 'radial-gradient(circle, rgba(120, 255, 214, 0.15) 0%, rgba(120, 255, 214, 0) 60%)'
            : 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0) 60%)'
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      
      {/* Cube wrapper */}
      <div 
        className="cube-wrapper w-48 h-48 perspective-500 cursor-pointer"
        onClick={handleTap}  
      >
        <div 
          ref={cubeRef}
          className="cube relative w-full h-full transform-style-3d transition-transform duration-100 ease-out"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Cube faces */}
          {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
            <div
              key={face}
              className={`absolute w-full h-full flex items-center justify-center backdrop-blur-sm
                ${face === 'front' ? 'transform translate-z-100px' : ''}
                ${face === 'back' ? 'transform translate-z-neg-100px rotate-y-180deg' : ''}
                ${face === 'right' ? 'transform translate-x-100px rotate-y-90deg' : ''}
                ${face === 'left' ? 'transform translate-x-neg-100px rotate-y-neg-90deg' : ''}
                ${face === 'top' ? 'transform translate-y-neg-100px rotate-x-90deg' : ''}
                ${face === 'bottom' ? 'transform translate-y-100px rotate-x-neg-90deg' : ''}
              `}
              style={{
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
                background: metaMirrorMode
                  ? 'linear-gradient(145deg, rgba(26, 209, 181, 0.02), rgba(26, 209, 181, 0.08))'
                  : 'linear-gradient(145deg, rgba(255, 255, 255, 0.7), rgba(240, 255, 250, 0.9))',
                boxShadow: metaMirrorMode
                  ? 'inset 0 0 15px rgba(26, 209, 181, 0.1)'
                  : 'inset 0 0 20px rgba(26, 209, 181, 0.15), 0 5px 15px rgba(0, 0, 0, 0.05)',
                border: metaMirrorMode
                  ? '1.5px solid rgba(26, 209, 181, 0.3)'
                  : '1.5px solid rgba(16, 185, 129, 0.8)',
                borderRadius: '6px',
                ...(face === 'front' && { transform: 'translateZ(100px)' }),
                ...(face === 'back' && { transform: 'rotateY(180deg) translateZ(100px)' }),
                ...(face === 'right' && { transform: 'rotateY(90deg) translateZ(100px)' }),
                ...(face === 'left' && { transform: 'rotateY(-90deg) translateZ(100px)' }),
                ...(face === 'top' && { transform: 'rotateX(90deg) translateZ(100px)' }),
                ...(face === 'bottom' && { transform: 'rotateX(-90deg) translateZ(100px)' }),
              }}
            >
              {/* Enhanced inner wireframe lines with glow */}
              <div className="absolute w-full h-full">
                <div className="absolute top-1/3 w-full h-[1px]" style={{ 
                  background: metaMirrorMode 
                    ? 'linear-gradient(to right, rgba(26, 209, 181, 0), rgba(26, 209, 181, 0.6), rgba(26, 209, 181, 0))' 
                    : 'linear-gradient(to right, rgba(16, 185, 129, 0), rgba(16, 185, 129, 0.9), rgba(16, 185, 129, 0))'
                }}></div>
                <div className="absolute top-2/3 w-full h-[1px]" style={{ 
                  background: metaMirrorMode 
                    ? 'linear-gradient(to right, rgba(26, 209, 181, 0), rgba(26, 209, 181, 0.6), rgba(26, 209, 181, 0))' 
                    : 'linear-gradient(to right, rgba(16, 185, 129, 0), rgba(16, 185, 129, 0.9), rgba(16, 185, 129, 0))'
                }}></div>
                <div className="absolute left-1/3 h-full w-[1px]" style={{ 
                  background: metaMirrorMode 
                    ? 'linear-gradient(to bottom, rgba(26, 209, 181, 0), rgba(26, 209, 181, 0.6), rgba(26, 209, 181, 0))' 
                    : 'linear-gradient(to bottom, rgba(16, 185, 129, 0), rgba(16, 185, 129, 0.9), rgba(16, 185, 129, 0))'
                }}></div>
                <div className="absolute left-2/3 h-full w-[1px]" style={{ 
                  background: metaMirrorMode 
                    ? 'linear-gradient(to bottom, rgba(26, 209, 181, 0), rgba(26, 209, 181, 0.6), rgba(26, 209, 181, 0))' 
                    : 'linear-gradient(to bottom, rgba(16, 185, 129, 0), rgba(16, 185, 129, 0.9), rgba(16, 185, 129, 0))'
                }}></div>
              </div>
              
              {/* Corner highlights */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-3 h-3 rounded-full" style={{ 
                  background: metaMirrorMode
                    ? 'radial-gradient(circle, rgba(26, 209, 181, 0.9) 0%, rgba(26, 209, 181, 0) 70%)'
                    : 'radial-gradient(circle, rgba(16, 185, 129, 1) 0%, rgba(16, 185, 129, 0) 70%)'
                }}></div>
                <div className="absolute top-0 right-0 w-3 h-3 rounded-full" style={{ 
                  background: metaMirrorMode
                    ? 'radial-gradient(circle, rgba(26, 209, 181, 0.9) 0%, rgba(26, 209, 181, 0) 70%)'
                    : 'radial-gradient(circle, rgba(16, 185, 129, 1) 0%, rgba(16, 185, 129, 0) 70%)'
                }}></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 rounded-full" style={{ 
                  background: metaMirrorMode
                    ? 'radial-gradient(circle, rgba(26, 209, 181, 0.9) 0%, rgba(26, 209, 181, 0) 70%)'
                    : 'radial-gradient(circle, rgba(16, 185, 129, 1) 0%, rgba(16, 185, 129, 0) 70%)'
                }}></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full" style={{ 
                  background: metaMirrorMode
                    ? 'radial-gradient(circle, rgba(26, 209, 181, 0.9) 0%, rgba(26, 209, 181, 0) 70%)'
                    : 'radial-gradient(circle, rgba(16, 185, 129, 1) 0%, rgba(16, 185, 129, 0) 70%)'
                }}></div>
              </div>
              
              {/* Center light dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full" style={{ 
                  background: metaMirrorMode
                    ? 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(26, 209, 181, 0.4) 70%, rgba(26, 209, 181, 0) 100%)'
                    : 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(16, 185, 129, 0.5) 70%, rgba(16, 185, 129, 0) 100%)'
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCube;