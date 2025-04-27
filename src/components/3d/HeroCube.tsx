import React, { useRef, useEffect, useState } from 'react';
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
  const lastUpdateRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  // Main animation effect
  useEffect(() => {
    if (!cubeRef.current) return;
    
    let rotateX = 0;
    let rotateY = 0;
    let baseRotation = 0;
    let isMounted = true;
    
    const animate = (timestamp: number) => {
      if (!isMounted || !cubeRef.current) return;
      
      // Throttle to ~30fps for better performance
      if (timestamp - lastUpdateRef.current < 33) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastUpdateRef.current = timestamp;
      
      // Calculate time delta to ensure consistent rotation speed regardless of framerate
      const deltaTime = timestamp - lastTimeRef.current || 16.67;
      lastTimeRef.current = timestamp;
      
      // Increased rotation speed with time-based movement
      baseRotation += 0.35 * (deltaTime / 16.67); // Even faster rotation
      
      // Use device orientation on mobile
      if (width < 768 && deviceOrientation.beta !== null && deviceOrientation.gamma !== null) {
        rotateX = deviceOrientation.beta * 0.6; // More responsive
        rotateY = deviceOrientation.gamma * 0.6; // More responsive
      } 
      // Use mouse position on desktop
      else if (mousePosition.x !== null && mousePosition.y !== null) {
        const mouseXPercentage = (mousePosition.x / width) * 2 - 1;
        const mouseYPercentage = (mousePosition.y / height) * 2 - 1;
        rotateX = mouseYPercentage * 18; // Even more responsive rotation
        rotateY = mouseXPercentage * 18; // Even more responsive rotation
      }
      
      cubeRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY + baseRotation}deg) rotateZ(0deg)`;
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start or stop animation based on visibility
    if (isVisible) {
      // Reset for smooth restart
      lastTimeRef.current = 0;
      // Clear any existing animation frame before starting a new one
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      // Cancel animation when not visible
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
    
    return () => {
      isMounted = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [mousePosition, deviceOrientation, width, height, isVisible]);
  
  const handleTap = () => {
    if (!cubeRef.current) return;
    
    // Add a quick spin animation on tap
    cubeRef.current.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    cubeRef.current.style.transform = 'rotateX(360deg) rotateY(360deg) rotateZ(0deg)';
    
    setTimeout(() => {
      if (cubeRef.current) {
        cubeRef.current.style.transition = 'transform 0.05s ease-out';
      }
    }, 600);
  };
  
  // Reduced number of grid cells
  const gridCells = React.useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => (
      <div 
        key={i} 
        className={`border transition-colors duration-300 ${
          metaMirrorMode ? 'border-metaEmerald-500/30' : 'border-metaEmerald-700/30'
        }`}
        style={{
          transitionDelay: `${i * 20}ms`,
          width: `${100 / 6}%`,
          height: `${100 / 6}%`,
          position: 'absolute',
          left: `${(i % 6) * (100 / 6)}%`,
          top: `${Math.floor(i / 6) * (100 / 6)}%`
        }}
      />
    ));
  }, [metaMirrorMode]);
  
  return (
    <div className="relative flex items-center justify-center w-full h-80 sm:h-96">
      {/* Simplified grid background */}
      <div className="absolute inset-0 opacity-20">
        {gridCells}
      </div>
      
      {/* Single optimized glow effect */}
      {isVisible && (
        <motion.div 
          className={`absolute w-48 h-48 rounded-full blur-3xl ${
            metaMirrorMode ? 'bg-metaEmerald-500/20' : 'bg-metaEmerald-500/15'
          }`}
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      
      {/* Cube wrapper */}
      <div 
        className="cube-wrapper w-48 h-48 perspective-500 cursor-pointer"
        onClick={handleTap}  
      >
        <div 
          ref={cubeRef}
          className="cube relative w-full h-full transform-style-3d will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Cube faces - using only essential styling */}
          {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
            <div
              key={face}
              className={`absolute w-full h-full flex items-center justify-center`}
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
              {/* Single line in each direction */}
              <div className="absolute w-full h-full">
                <div className="absolute top-1/2 w-full h-[1px]" style={{ 
                  background: metaMirrorMode 
                    ? 'linear-gradient(to right, rgba(26, 209, 181, 0), rgba(26, 209, 181, 0.6), rgba(26, 209, 181, 0))' 
                    : 'linear-gradient(to right, rgba(16, 185, 129, 0), rgba(16, 185, 129, 0.9), rgba(16, 185, 129, 0))'
                }}></div>
                <div className="absolute left-1/2 h-full w-[1px]" style={{ 
                  background: metaMirrorMode 
                    ? 'linear-gradient(to bottom, rgba(26, 209, 181, 0), rgba(26, 209, 181, 0.6), rgba(26, 209, 181, 0))' 
                    : 'linear-gradient(to bottom, rgba(16, 185, 129, 0), rgba(16, 185, 129, 0.9), rgba(16, 185, 129, 0))'
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

// Use React.memo to prevent unnecessary rerenders
export default React.memo(HeroCube);