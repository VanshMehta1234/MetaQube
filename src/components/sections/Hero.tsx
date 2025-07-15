import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import HeroCube from '../3d/HeroCube';
import { useAppStore } from '../../store/useAppStore';
import { useMousePosition } from '../../hooks/useMousePosition';
import ToggleGroup from '../ui/ToggleGroup';
import { Boxes } from '../ui/background-boxes';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Hero = () => {
  const { metaMirrorMode, nextCTA, resetToggleOptions } = useAppStore();
  const mousePosition = useMousePosition();
  const sectionRef = useRef(null);
  const ctaIntervalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(null);

  useEffect(() => {
    resetToggleOptions();
    const timer = setTimeout(() => setContentLoaded(true), 300);
    return () => clearTimeout(timer);
  }, [resetToggleOptions]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setIsVisible(visible);
      if (visible && !ctaIntervalRef.current) {
        ctaIntervalRef.current = window.setInterval(() => nextCTA(), 4000);
      } else if (!visible && ctaIntervalRef.current) {
        clearInterval(ctaIntervalRef.current);
        ctaIntervalRef.current = null;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [nextCTA]);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverPosition(y > 100 ? { x, y } : null);
  };

  const handleMouseLeave = () => setHoverPosition(null);

  useEffect(() => {
    if (!isVisible) return;
    ctaIntervalRef.current = window.setInterval(() => nextCTA(), 4000);
    return () => ctaIntervalRef.current && clearInterval(ctaIntervalRef.current);
  }, [nextCTA, isVisible]);

  const spotlightMask = hoverPosition
    ? `radial-gradient(circle 250px at ${hoverPosition.x}px ${hoverPosition.y}px, white 0%, transparent 90%)`
    : 'none';

  return (
    <>
      <section
        ref={sectionRef}
        className={`relative min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-24 md:pt-28 overflow-hidden transition-colors duration-500 ${
          metaMirrorMode ? 'bg-deepCosmos-900' : 'bg-slate-900'
        }`}
        style={{ fontFamily: "'Inter', sans-serif" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
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

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-16 h-16 rounded-full"
            initial={{ x: '10%', y: '20%' }}
            animate={{ x: ['10%', '15%', '10%'], y: ['20%', '25%', '20%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: metaMirrorMode
                ? 'radial-gradient(circle, rgba(26, 209, 181, 0.3) 0%, rgba(26, 209, 181, 0) 70%)'
                : 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0) 70%)',
              filter: 'blur(8px)',
            }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-12 z-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-0 relative min-h-[70vh] lg:min-h-[80vh] xl:min-h-[90vh]">
          <motion.div
            className="w-full lg:w-3/5 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate={contentLoaded ? 'visible' : 'hidden'}
          >
            <motion.p
              variants={itemVariants}
              className="text-sm font-semibold tracking-widest uppercase mb-4 text-metaEmerald-400"
            >
              METAQUBE
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight bg-gradient-to-br from-white via-metaEmerald-400 to-metaEmerald-600 bg-clip-text text-transparent drop-shadow-xl mb-6"
            >
              Build the Future.<br className="hidden sm:block" /> Web3, AI & Beyond
            </motion.h1>
            <motion.div
              variants={itemVariants}
              className="inline-block px-6 py-2 rounded-full text-base font-semibold mb-6 bg-metaEmerald-500/10 text-metaEmerald-400 border border-metaEmerald-400/30 shadow-md backdrop-blur-sm"
            >
              🚀 Next-gen Blockchain & AI Solutions
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg sm:text-xl md:text-2xl font-medium max-w-2xl mb-6 mx-auto lg:mx-0"
            >
              Empowering enterprises to innovate, scale, and lead with secure, intelligent, and future-ready digital infrastructure.
            </motion.p>
            <motion.a
              href="#build-qube"
              className="inline-block px-8 py-4 text-lg sm:text-xl font-bold rounded-lg shadow-lg bg-gradient-to-r from-metaEmerald-500 to-metaEmerald-400 text-deepCosmos-900 hover:from-metaEmerald-400 hover:to-metaEmerald-500 transition-all focus:outline-none focus:ring-4 focus:ring-metaEmerald-400/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.a>
          </motion.div>

          <div className="w-full lg:w-2/5 flex items-center justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] xl:max-w-[500px] aspect-square">
              <div className="relative z-10 scale-110 sm:scale-125 drop-shadow-2xl">
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
          className="my-12 md:my-16 w-full max-w-[320px] sm:max-w-lg md:max-w-xl px-4 mx-auto"
        >
          <ToggleGroup />
        </motion.div>
      </section>
    </>
  );
};

export default React.memo(Hero);