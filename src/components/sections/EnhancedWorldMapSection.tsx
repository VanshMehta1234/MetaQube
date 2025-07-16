"use client";
import { lazy, Suspense, memo } from "react";
import { motion } from "motion/react";

// Lazy load the EnhancedWorldMap component for better performance
const EnhancedWorldMap = lazy(() => import("../ui/enhanced-world-map"));

const EnhancedWorldMapSection = () => {
  return (
    <div className="py-40 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto text-center mb-16 pt-20">
        

        {/* <h2 className="font-bold text-2xl md:text-5xl text-white mb-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Global&nbsp;
          </motion.span>
          <motion.span
            className="text-[#3fa7f5]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Reach&nbsp;
          </motion.span>
          <motion.span
            className="text-[#3fa7f5]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            & Impact
          </motion.span>
        </h2>

        <p className="text-md md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Helping businesses across continents build cutting-edge solutions in Web Development,
          Artificial Intelligence, and Cloud Infrastructure. Our network spans industries and borders — powering tomorrow's tech, today.
        </p> */}
        <h2 className={`font-bold text-3xl sm:text-4xl md:text-5xl mb-3 ${
            metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
          }`}>
            Global <span className="text-[#3fa7f5]">Reach & Impact</span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${
            metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
          }`}>
            Helping businesses across continents build cutting-edge solutions in Web Development,
            Artificial Intelligence, and Cloud Infrastructure. Our network spans industries and borders — powering tomorrow's tech, today.
          </p>
      
      <Suspense fallback={
        <div className="w-full aspect-[2/1] bg-black rounded-lg relative font-sans pt-24 mt-20 flex items-center justify-center">
          <div className="text-[#3fa7f5] text-lg">Loading global impact map...</div>
        </div>
      }>
        <EnhancedWorldMap />
      </Suspense>
    </div>
  );
}

export default memo(EnhancedWorldMapSection); 