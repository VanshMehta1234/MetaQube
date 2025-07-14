import React, { lazy, Suspense, memo } from "react";
import { motion } from "motion/react";

// Lazy load the JVectorWorldMap component for better performance
const JVectorWorldMap = lazy(() => import("../ui/JVectorWorldMap"));

const JVectorWorldMapSection: React.FC = () => {
  return (
    <div className="py-24 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="font-bold text-2xl md:text-5xl text-white mb-4">
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
        </p>
      </div>

      <div className="max-w-7xl mx-auto aspect-[2/1] rounded-lg overflow-hidden">
        <Suspense fallback={
          <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
            <div className="text-[#3fa7f5] text-lg">Loading global impact map...</div>
          </div>
        }>
          <JVectorWorldMap primaryColor="#3fa7f5" secondaryColor="#ffffff" />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(JVectorWorldMapSection); 