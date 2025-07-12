"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlowingEffect } from './glowing-effect';
import { useAppStore } from '../../store/useAppStore';

interface GlowingServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

export const GlowingServiceCard: React.FC<GlowingServiceCardProps> = ({
  icon,
  title,
  description,
  onClick
}) => {
  const { metaMirrorMode } = useAppStore();
  
  return (
    <div className="min-h-[14rem] list-none">
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          variant={metaMirrorMode ? "default" : "white"}
        />
        <motion.div 
          className={`relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 ${
            metaMirrorMode 
              ? 'bg-deepCosmos-800 dark:shadow-[0px_0px_27px_0px_#2D2D2D]' 
              : 'bg-prismWhite'
          }`}
          whileHover={{ y: -5 }}
          onClick={onClick}
        >
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-12 h-12 rounded-full bg-metaEmerald-500 bg-opacity-20 flex items-center justify-center">
              <div className="text-metaEmerald-500">
                {icon}
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className={`font-sans text-xl font-semibold ${
                metaMirrorMode ? 'text-white' : 'text-deepCosmos-900'
              }`}>
                {title}
              </h3>
              
              <p className={`font-sans text-sm md:text-base ${
                metaMirrorMode ? 'text-neutral-400' : 'text-deepCosmos-600'
              }`}>
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GlowingServiceCard; 