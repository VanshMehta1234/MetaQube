"use client";
import React from 'react';
import { Box, Lock, Search, Settings, Sparkles, Shield } from "lucide-react";
import { GlowingEffect } from "../ui/glowing-effect";
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  isFeatured?: boolean;
}

export function GlowingFeatures() {
  const { metaMirrorMode } = useAppStore();
  
  return (
    <section 
      className={`py-24 transition-colors ${
        metaMirrorMode ? 'bg-deepCosmos-800' : 'bg-quantumGrey-50'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${
            metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
          }`}>
            Why Choose <span className="text-metaEmerald-500">METAQUBE</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
          }`}>
            Innovative solutions powered by cutting-edge technology
          </p>
        </div>
        
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-6 xl:max-h-[34rem] xl:grid-rows-2">
          <GridItem
            area="md:[grid-area:1/1/2/5]"
            icon={<Shield className="h-5 w-5 text-metaEmerald-500" />}
            title="No-Code Metaverse Builder"
            description="Build immersive, multiplayer experiences with our do-it-yourself, open-source-based metaverse builder."
          />

          <GridItem
            area="md:[grid-area:2/1/3/5]"
            icon={<Settings className="h-5 w-5 text-yellow-500" />}
            title="Cross-Device Compatibility"
            description="Your creations will be accessible across a wide range of devices, including mobile, PCs, tablets, and VR headsets."
          />

          <GridItem
            area="md:[grid-area:1/5/3/9]"
            isFeatured={true}
            icon={<Box className="h-8 w-8 text-green-400" />}
            title="Rich & Intelligent Worlds"
            description="Get a head start with our vast library of 3D templates and objects. Add intelligence and interactivity to your experiences with our AI-powered non-player characters."
          />

          <GridItem
            area="md:[grid-area:1/9/2/13]"
            icon={<Search className="h-5 w-5 text-purple-500" />}
            title="Enterprise-Grade Solutions"
            description="We have experience developing enterprise applications for global trade management and supply chain analytics."
          />
          
          <GridItem
            area="md:[grid-area:2/9/3/13]"
            icon={<Lock className="h-5 w-5 text-orange-500" />}
            title="Push Boundaries of Innovation"
            description="Unleash your creativity and engineer immersive digital experiences that explore the limitless possibilities of the Metaverse."
          />
        </ul>
      </div>
    </section>
  );
}

const GridItem = ({ area, icon, title, description, isFeatured = false }: GridItemProps) => {
  const { metaMirrorMode } = useAppStore();
  
  return (
    <li className={cn('list-none', area, isFeatured ? 'min-h-[28rem]' : 'min-h-[14rem]')}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={isFeatured ? 2 : 0}
          borderWidth={isFeatured ? 4 : 3}
          spread={isFeatured ? 150 : 100}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.7}
          variant={metaMirrorMode ? "default" : "white"}
          className={cn(
            "custom-gradient",
            isFeatured && metaMirrorMode && "from-metaEmerald-500/50 to-deepCosmos-700"
          )}
        />
        <div 
          className={cn(
            'relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]',
            metaMirrorMode 
              ? 'bg-deepCosmos-700 dark:shadow-[0px_0px_27px_0px_#2D2D2D]' 
              : 'bg-prismWhite',
            isFeatured && metaMirrorMode && 'bg-gradient-to-br from-deepCosmos-600 to-deepCosmos-700'
          )}
        >
          <div className="relative flex flex-1 flex-col justify-center gap-4 text-center">
            <div className={cn(
              "w-fit rounded-lg border border-gray-600 p-2 mx-auto",
              isFeatured && "p-3"
            )}>
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className={cn(
                'font-sans font-semibold',
                isFeatured ? 'text-3xl' : 'text-xl',
                metaMirrorMode ? 'text-white' : 'text-deepCosmos-900'
              )}>
                {title}
              </h3>
              <p className={cn(
                'font-sans',
                isFeatured ? 'text-base' : 'text-sm md:text-base',
                metaMirrorMode ? 'text-neutral-300' : 'text-deepCosmos-600'
              )}>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default GlowingFeatures;