// Hero.tsx
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import HeroCube from '../3d/HeroCube';
import { useAppStore } from '../../store/useAppStore';
import { useMousePosition } from '../../hooks/useMousePosition';
import { Boxes } from '../ui/background-boxes';
import { useMediaQuery } from 'react-responsive';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const Hero: React.FC = () => {
  const { metaMirrorMode, nextCTA, resetToggleOptions } = useAppStore();
  const mousePosition = useMousePosition();
  const sectionRef = useRef<HTMLElement>(null);
  const ctaIntervalRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Existing desktop logic (unchanged)
  useEffect(() => {
    resetToggleOptions();
    const timer = setTimeout(() => setContentLoaded(true), 300);
    return () => clearTimeout(timer);
  }, [resetToggleOptions]);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current || isMobile) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverPosition(y > 100 ? { x, y } : null);
  };
  const handleMouseLeave = () => !isMobile && setHoverPosition(null);

  useEffect(() => {
    if (!isVisible) return;
    ctaIntervalRef.current = window.setInterval(() => nextCTA(), 4000);
    return () => {
      if (ctaIntervalRef.current) clearInterval(ctaIntervalRef.current);
    };
  }, [nextCTA, isVisible]);

  const spotlightMask = !isMobile && hoverPosition
    ? `radial-gradient(circle 250px at ${hoverPosition.x}px ${hoverPosition.y}px, white 0%, transparent 90%)`
    : 'none';

  /* --------------------------------------------------
     DESKTOP  (your original masterpiece)
  -------------------------------------------------- */
  if (!isMobile) {
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
          {/* Background boxes with spotlight */}
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

          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {/* decorative gradients */}
          </div>

          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 z-20 flex flex-col md:flex-row items-center justify-between relative min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[75vh] xl:min-h-[80vh]">
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
                Build the Future. <span className="hidden md:inline"><br /></span>
                <span className="text-white/90">Web3, AI & Beyond</span>
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
                  className={`mt-18 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg text-base sm:text-lg md:text-xl font-bold shadow-xl transition-all focus:outline-none focus:ring-4 focus:ring-metaEmerald-400/40 ${
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

            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/2 flex items-center justify-center mt-8 md:mt-0">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[450px] aspect-square flex items-center justify-end md:justify-center">
                <div className="relative z-10 scale-100 sm:scale-110 md:scale-120 lg:scale-130 xl:scale-140 drop-shadow-2xl md:scale-132 md:ml-4">
                  {contentLoaded && <HeroCube />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* --------------------------------------------------
     MOBILE – scrollable one-pager
  -------------------------------------------------- */
  /* ---------- MOBILE 10/10 ---------- */
return (
  <section
    className={`relative flex flex-col items-center justify-start min-h-screen px-6 py-10 overflow-y-auto
      ${metaMirrorMode ? 'bg-slate-950' : 'bg-slate-900'}`}
  >
    {/* subtle radial gradient only on top half */}
    <div
      className="absolute top-0 left-0 w-full h-2/3 opacity-30"
      style={{
        backgroundImage: metaMirrorMode
          ? 'radial-gradient(circle at 50% 30%, rgba(26,209,181,.2) 0%, transparent 60%)'
          : 'radial-gradient(circle at 50% 30%, rgba(255,255,255,.05) 0%, transparent 60%)',
      }}
    />

    <main className="relative z-10 flex flex-col items-center text-center w-full max-w-xs pt-14">
  {/* 1️⃣ Hero Title */}
  <motion.h1
    className="text-4xl sm:text-5xl font-extrabold leading-[1.2] tracking-tight bg-gradient-to-r from-white via-metaEmerald-300 to-metaEmerald-500 bg-clip-text text-transparent"
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7 }}
    style={{ fontFamily: 'Poppins, sans-serif' }}
  >
    Build the Future
  </motion.h1>

  {/* 2️⃣ Sub-title */}
  <motion.p
    className="text-white/90 text-lg sm:text-xl mt-3 font-medium"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.15, duration: 0.7 }}
    style={{ fontFamily: 'Inter, sans-serif' }}
  >
    Web3, AI & Beyond
  </motion.p>

  {/* 3️⃣ Info Blurb */}
  <motion.p
    className="text-slate-300 text-sm sm:text-base mt-5 max-w-[90%] leading-relaxed"
    initial={{ y: -10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.25, duration: 0.7 }}
  >
    Next-gen Blockchain & AI solutions for enterprises to innovate, scale, and lead with confidence.
  </motion.p>

  {/* 4️⃣ HeroCube */}
  <motion.div
    className="relative w-[55vmin] max-w-[240px] aspect-square my-10"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.03 }}
    transition={{ delay: 0.35, duration: 0.8 }}
  >
    <div className="absolute inset-0 rounded-full bg-gradient-radial from-metaEmerald-500/20 via-transparent to-transparent blur-2xl scale-110" />
    {contentLoaded && <HeroCube />}
  </motion.div>

  {/* 5️⃣ CTA Button */}
  <div className="mt-6 mb-10 w-full flex justify-center">
    <motion.a
      href="#build-qube"
      className={`group relative overflow-hidden px-8 py-3 rounded-xl font-semibold sm:font-bold text-sm sm:text-base shadow-xl
        ${metaMirrorMode
          ? 'bg-gradient-to-r from-metaEmerald-500 to-metaEmerald-400 text-deepCosmos-900'
          : 'bg-white text-slate-900'}`}
      whileTap={{ scale: 0.96 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.45, duration: 0.7 }}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <span className="relative z-10">Start Your Journey</span>
      <span
        className="absolute top-0 left-[-150%] w-[150%] h-full bg-white/40 skew-x-[-20deg]
          group-hover:left-[150%] transition-all duration-700"
      />
    </motion.a>
  </div>
</main>

  </section>
);
};

export default Hero;