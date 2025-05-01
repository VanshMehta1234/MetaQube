import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useDeviceOrientation } from '../../hooks/useDeviceOrientation';
import { useWindowSize } from 'react-use';
import { useAppStore } from '../../store/useAppStore';

const HeroCube: React.FC = () => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const innerCubeRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const deviceOrientation = useDeviceOrientation();
  const { width, height } = useWindowSize();
  const { metaMirrorMode } = useAppStore();
  const lastUpdateRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isActive, setIsActive] = useState(false);
  
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
    if (!cubeRef.current || !innerCubeRef.current) return;
    
    let rotateX = 0;
    let rotateY = 0;
    let baseRotation = 0;
    let innerRotateX = 0;
    let innerRotateY = 0;
    let innerBaseRotation = 0;
    let isMounted = true;
    
    const animate = (timestamp: number) => {
      if (!isMounted || !cubeRef.current || !innerCubeRef.current) return;
      
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
      baseRotation += 0.25 * (deltaTime / 16.67); 
      innerBaseRotation -= 0.35 * (deltaTime / 16.67); // Inner cube rotates opposite direction
      
      // Use device orientation on mobile
      if (width < 768 && deviceOrientation.beta !== null && deviceOrientation.gamma !== null) {
        rotateX = deviceOrientation.beta * 0.6;
        rotateY = deviceOrientation.gamma * 0.6;
        innerRotateX = deviceOrientation.beta * -0.4; // Inner cube moves slightly counter to outer
        innerRotateY = deviceOrientation.gamma * -0.4;
      } 
      // Use mouse position on desktop
      else if (mousePosition.x !== null && mousePosition.y !== null) {
        const mouseXPercentage = (mousePosition.x / width) * 2 - 1;
        const mouseYPercentage = (mousePosition.y / height) * 2 - 1;
        rotateX = mouseYPercentage * 15;
        rotateY = mouseXPercentage * 15;
        innerRotateX = mouseYPercentage * -10; // Inner cube moves slightly counter to outer
        innerRotateY = mouseXPercentage * -10;
      }
      
      cubeRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY + baseRotation}deg) rotateZ(0deg)`;
      innerCubeRef.current.style.transform = `rotateX(${innerRotateX}deg) rotateY(${innerRotateY + innerBaseRotation}deg) rotateZ(0deg)`;
      
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
    
    // Add a quick pulse animation on tap
    setIsActive(true);
    
    // Add a quick spin animation on tap
    cubeRef.current.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    cubeRef.current.style.transform = 'rotateX(360deg) rotateY(360deg) rotateZ(0deg)';
    
    setTimeout(() => {
      if (cubeRef.current) {
        cubeRef.current.style.transition = 'transform 0.05s ease-out';
      }
      setIsActive(false);
    }, 600);
  };
  
  // Updated Tesseract color values to match Marvel's Tesseract
  const tesseractColors = {
    outerBorder: metaMirrorMode ? 'rgba(0, 162, 255, 0.9)' : 'rgba(0, 162, 255, 1.0)',
    outerGlow: metaMirrorMode ? 'rgba(64, 190, 255, 0.4)' : 'rgba(64, 190, 255, 0.5)',
    innerCore: metaMirrorMode ? 'rgba(140, 230, 255, 1.0)' : 'rgba(180, 240, 255, 1.0)',
    energyLines: metaMirrorMode ? 'rgba(0, 210, 255, 0.8)' : 'rgba(0, 220, 255, 0.9)',
    coreBright: metaMirrorMode ? 'rgba(200, 250, 255, 0.95)' : 'rgba(220, 250, 255, 1.0)',
    // New colors for improved inner cube
    innerEdge: metaMirrorMode ? 'rgba(220, 240, 255, 0.9)' : 'rgba(240, 250, 255, 0.9)',
    innerVertex: metaMirrorMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 1.0)',
    innerShadow: metaMirrorMode ? 'rgba(90, 180, 255, 0.5)' : 'rgba(120, 210, 255, 0.5)'
  };
  
  // Create reusable styles to reduce duplication
  const createCornerAccentStyle = (positionX: string, positionY: string) => ({
    background: tesseractColors.energyLines,
    boxShadow: `0 0 5px ${tesseractColors.energyLines}`,
    [positionY]: 0,
    [positionX]: 0
  });
  
  // Function to create inner cube face styles with proper 3D appearance
  const createInnerFaceStyle = (face: string) => {
    // Base style for all faces
    const baseStyle: React.CSSProperties = {
      backfaceVisibility: 'hidden',
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '2px',
      border: `1px solid ${tesseractColors.innerEdge}`
    };
    
    // Direction-specific lighting to create 3D effect
    let gradientDirection = '145deg';
    let gradientStart = 0.7;
    let gradientEnd = 0.9;
    
    // Adjust gradient based on face position to create lighting effect
    switch(face) {
      case 'front':
        gradientDirection = '145deg';
        gradientStart = 0.9;
        gradientEnd = 0.7;
        return {
          ...baseStyle,
          transform: 'translateZ(25px)',
          background: `linear-gradient(${gradientDirection}, rgba(255,255,255,${gradientStart}), ${tesseractColors.coreBright} ${gradientEnd * 100}%)`,
          boxShadow: `0 0 15px 2px ${tesseractColors.coreBright}`
        };
      case 'back':
        gradientDirection = '325deg';
        return {
          ...baseStyle,
          transform: 'rotateY(180deg) translateZ(25px)',
          background: `linear-gradient(${gradientDirection}, rgba(255,255,255,${gradientStart}), ${tesseractColors.innerCore} ${gradientEnd * 100}%)`,
          boxShadow: `0 0 15px 2px ${tesseractColors.innerCore}`
        };
      case 'right':
        gradientDirection = '235deg';
        return {
          ...baseStyle,
          transform: 'rotateY(90deg) translateZ(25px)',
          background: `linear-gradient(${gradientDirection}, rgba(255,255,255,${gradientStart}), ${tesseractColors.innerCore} ${gradientEnd * 100}%)`,
          boxShadow: `0 0 15px 2px ${tesseractColors.innerCore}`
        };
      case 'left':
        gradientDirection = '55deg';
        return {
          ...baseStyle,
          transform: 'rotateY(-90deg) translateZ(25px)',
          background: `linear-gradient(${gradientDirection}, rgba(255,255,255,${gradientStart}), ${tesseractColors.innerCore} ${gradientEnd * 100}%)`,
          boxShadow: `0 0 15px 2px ${tesseractColors.innerCore}`
        };
      case 'top':
        gradientDirection = '180deg';
        return {
          ...baseStyle,
          transform: 'rotateX(90deg) translateZ(25px)',
          background: `linear-gradient(${gradientDirection}, rgba(255,255,255,${gradientStart}), ${tesseractColors.innerCore} ${gradientEnd * 100}%)`,
          boxShadow: `0 0 15px 2px ${tesseractColors.innerCore}`
        };
      case 'bottom':
        gradientDirection = '0deg';
        return {
          ...baseStyle,
          transform: 'rotateX(-90deg) translateZ(25px)',
          background: `linear-gradient(${gradientDirection}, rgba(255,255,255,${gradientStart}), ${tesseractColors.innerCore} ${gradientEnd * 100}%)`,
          boxShadow: `0 0 15px 2px ${tesseractColors.innerCore}`
        };
      default:
        return baseStyle;
    }
  };
  
  return (
    <div className="relative flex items-center justify-center w-full h-80 sm:h-96">
      {/* Energy glow effect */}
      {isVisible && (
        <motion.div 
          className="absolute w-72 h-72 rounded-full blur-3xl"
          style={{ 
            background: `radial-gradient(circle, white 0%, ${tesseractColors.coreBright} 20%, ${tesseractColors.innerCore} 40%, ${tesseractColors.outerGlow} 70%, rgba(0, 150, 255, 0.05) 90%)`,
            opacity: isActive ? 0.9 : 0.8
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: isActive ? [0.9, 0.95, 0.9] : [0.8, 0.85, 0.8]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      
      {/* Cube wrapper */}
      <div 
        className="cube-wrapper w-48 h-48 perspective-500 cursor-pointer"
        onClick={handleTap}  
      >
        {/* Outer cube */}
        <div 
          ref={cubeRef}
          className="cube relative w-full h-full will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Outer cube faces */}
          {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
            <div
              key={face}
              className="absolute w-full h-full flex items-center justify-center"
              style={{
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
                background: `linear-gradient(145deg, rgba(0, 180, 255, 0.1), rgba(0, 180, 255, 0.2))`,
                boxShadow: `inset 0 0 15px ${tesseractColors.outerGlow}, 0 0 10px ${tesseractColors.outerGlow}`,
                border: `2px solid ${tesseractColors.outerBorder}`,
                borderRadius: '1px',
                ...(face === 'front' && { transform: 'translateZ(100px)' }),
                ...(face === 'back' && { transform: 'rotateY(180deg) translateZ(100px)' }),
                ...(face === 'right' && { transform: 'rotateY(90deg) translateZ(100px)' }),
                ...(face === 'left' && { transform: 'rotateY(-90deg) translateZ(100px)' }),
                ...(face === 'top' && { transform: 'rotateX(90deg) translateZ(100px)' }),
                ...(face === 'bottom' && { transform: 'rotateX(-90deg) translateZ(100px)' }),
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-5 h-5">
                <div className="absolute w-full h-[2px]" style={createCornerAccentStyle('left', 'top')}></div>
                <div className="absolute h-full w-[2px]" style={createCornerAccentStyle('left', 'top')}></div>
              </div>
              <div className="absolute top-2 right-2 w-5 h-5">
                <div className="absolute w-full h-[2px]" style={createCornerAccentStyle('right', 'top')}></div>
                <div className="absolute h-full w-[2px]" style={createCornerAccentStyle('right', 'top')}></div>
              </div>
              <div className="absolute bottom-2 left-2 w-5 h-5">
                <div className="absolute w-full h-[2px]" style={createCornerAccentStyle('left', 'bottom')}></div>
                <div className="absolute h-full w-[2px]" style={createCornerAccentStyle('left', 'bottom')}></div>
              </div>
              <div className="absolute bottom-2 right-2 w-5 h-5">
                <div className="absolute w-full h-[2px]" style={createCornerAccentStyle('right', 'bottom')}></div>
                <div className="absolute h-full w-[2px]" style={createCornerAccentStyle('right', 'bottom')}></div>
              </div>
            </div>
          ))}
          
          {/* Enhanced inner cube with 3D appearance */}
          <div 
            ref={innerCubeRef}
            className="absolute w-2/5 h-2/5"
            style={{ 
              transformStyle: 'preserve-3d',
              top: '30%',
              left: '30%',
            }}
          >
            {/* Inner cube faces with improved 3D appearance */}
            {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
              <div
                key={`inner-${face}`}
                className="flex items-center justify-center"
                style={createInnerFaceStyle(face)}
              >
                {/* Vertex points for 3D effect - only visible on corners */}
                <div className="absolute w-full h-full">
                  {/* Corner vertices to enhance the 3D appearance */}
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full" 
                    style={{ background: tesseractColors.innerVertex, boxShadow: `0 0 3px 1px ${tesseractColors.innerVertex}` }}></div>
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: tesseractColors.innerVertex, boxShadow: `0 0 3px 1px ${tesseractColors.innerVertex}` }}></div>
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: tesseractColors.innerVertex, boxShadow: `0 0 3px 1px ${tesseractColors.innerVertex}` }}></div>
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: tesseractColors.innerVertex, boxShadow: `0 0 3px 1px ${tesseractColors.innerVertex}` }}></div>
                  
                  {/* Inner pulsing energy core */}
                  <div className="absolute inset-3">
                    <motion.div 
                      className="w-full h-full rounded-sm"
                      style={{ 
                        background: `radial-gradient(circle, white 10%, ${tesseractColors.coreBright} 40%)`,
                        boxShadow: `0 0 8px ${tesseractColors.innerCore}`,
                        opacity: 0.7
                      }}
                      animate={{ 
                        opacity: [0.7, 0.9, 0.7],
                        scale: [0.95, 1.05, 0.95]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: Math.random() * 0.5
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Energy particles */}
      {isVisible && Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 3 === 0 ? 'white' : tesseractColors.innerCore,
            boxShadow: `0 0 8px ${tesseractColors.innerCore}`,
            top: '50%',
            left: '50%',
          }}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 220],
            y: [0, (Math.random() - 0.5) * 220],
            scale: [0, Math.random() * 0.8 + 0.3],
            opacity: [0, 0.9, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

// Use React.memo to prevent unnecessary rerenders
export default React.memo(HeroCube);