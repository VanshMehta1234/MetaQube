import React, { lazy, Suspense, memo } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store/useAppStore";

// Lazy load the JVectorWorldMap component for better performance
const JVectorWorldMap = lazy(() => import("../ui/JVectorWorldMap"));

const JVectorWorldMapSection: React.FC = () => {
  const metaMirrorMode = useAppStore();
  return (
    <section id="global-reach">
      <div className="py-24 dark:bg-black bg-white w-full">
        <div className="text-center mb-16 relative">
          <h2 className={`font-bold text-3xl sm:text-4xl md:text-5xl mb-3 ${
            metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
          }`}>
            Global <span className="text-metaEmerald-500">Reach & Impact</span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${
            metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
          }`}>
             Powering global innovation in Web, AI, and Cloud — one solution at a time.
          </p>
        </div>
        <div className="max-w-7xl mx-auto aspect-[2/1] rounded-lg overflow-hidden">
          <Suspense
            fallback={
              <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                <div className="text-[#3fa7f5] text-lg">
                  Loading global impact map...
                </div>
              </div>
            }
          >
            <JVectorWorldMap primaryColor="#3fa7f5" secondaryColor="#ffffff" />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default memo(JVectorWorldMapSection);
