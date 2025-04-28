import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { BookOpen, Coins, Briefcase, ArrowRightLeft, Image, Palette, Wallet, Layers } from 'lucide-react';

// Generate custom SVG logo for each partner
const getLogoIcon = (id: number) => {
  switch(id) {
    case 1: return <BookOpen size={32} className="text-inherit" />;
    case 2: return <Coins size={32} className="text-inherit" />;
    case 3: return <Briefcase size={32} className="text-inherit" />;
    case 4: return <ArrowRightLeft size={32} className="text-inherit" />;
    case 5: return <Image size={32} className="text-inherit" />;
    case 6: return <Palette size={32} className="text-inherit" />;
    case 7: return <Wallet size={32} className="text-inherit" />;
    case 8: return <Layers size={32} className="text-inherit" />;
    default: return <div className="text-inherit">Logo</div>;
  }
};

// Company-specific logo styles
const logoStyles = {
  'Buildspace': 'bg-emerald-100',
  'Coinbase': 'bg-blue-50',
  'Paradigm': 'bg-gray-50',
  'Uniswap': 'bg-pink-50',
  'Opensea': 'bg-blue-50',
  'Foundation': 'bg-gray-50',
  'MetaMask': 'bg-orange-50',
  'Polygon': 'bg-purple-50'
};

const frens = [
  { 
    id: 1, 
    name: 'Buildspace', 
    description: 'Web3 educational platform',
    category: 'Education'
  },
  { 
    id: 2, 
    name: 'Coinbase', 
    description: 'Cryptocurrency exchange',
    category: 'Exchange'
  },
  { 
    id: 3, 
    name: 'Paradigm', 
    description: 'Crypto/Web3 investment firm',
    category: 'Investment'
  },
  { 
    id: 4, 
    name: 'Uniswap', 
    description: 'Decentralized exchange protocol',
    category: 'DeFi'
  },
  { 
    id: 5, 
    name: 'Opensea', 
    description: 'NFT marketplace',
    category: 'NFT'
  },
  { 
    id: 6, 
    name: 'Foundation', 
    description: 'Creative platform for NFTs',
    category: 'NFT'
  },
  { 
    id: 7, 
    name: 'MetaMask', 
    description: 'Web3 wallet and gateway',
    category: 'Wallet'
  },
  { 
    id: 8, 
    name: 'Polygon', 
    description: 'Ethereum scaling platform',
    category: 'Infrastructure'
  },
];

const categories = Array.from(new Set(frens.map(fren => fren.category)));

const FrensMap: React.FC = () => {
  const { metaMirrorMode } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  const filteredFrens = selectedCategory 
    ? frens.filter(fren => fren.category === selectedCategory)
    : frens;
  
  // Create duplicated arrays for more seamless infinite scroll
  const duplicatedFrens = [...filteredFrens, ...filteredFrens, ...filteredFrens];
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };
  
  // Start the automatic animation with reset functionality
  useEffect(() => {
    // Reset animation when filteredFrens changes
    controls.set({ x: "0%" });
    
    const startAutoScroll = async () => {
      controls.start({
        x: "-66.66%",
        transition: {
          x: {
            duration: 40, // Slower animation for smoother effect
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }
        }
      });
    };
    
    startAutoScroll();
  }, [controls, filteredFrens.length]); // Only depend on the length to prevent re-renders
  
  return (
    <section id="frens" className={`py-24 transition-colors relative overflow-hidden ${
      metaMirrorMode ? 'bg-deepCosmos-900' : 'bg-quantumGrey-50'
    }`}>
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute inset-0"
              style={{
                border: `1px solid ${metaMirrorMode ? 'rgba(26, 209, 181, 0.3)' : 'rgba(26, 209, 181, 0.5)'}`,
                borderRadius: '40%',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.1, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15,
                delay: i * 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-5xl font-bold mb-4 ${
            metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
          }`}>
            Our <span className="text-metaEmerald-600 bg-clip-text bg-gradient-to-r from-metaEmerald-500 to-metaEmerald-700">Work</span>
          </h2>
          <p className={`text-base sm:text-xl max-w-2xl mx-auto ${
            metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-800'
          }`}>
            Building alongside the best in the industry to create the future of digital experiences.
          </p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 mb-10">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? metaMirrorMode
                      ? 'bg-metaEmerald-500 text-deepCosmos-900 shadow-glow-sm'
                      : 'bg-metaEmerald-600 text-white shadow-lg'
                    : metaMirrorMode
                      ? 'bg-deepCosmos-700 text-quantumGrey-300 hover:bg-deepCosmos-600'
                      : 'bg-white text-deepCosmos-800 hover:bg-quantumGrey-100 border border-quantumGrey-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Auto-scrolling carousel */}
        <div 
          ref={carouselRef}
          className="overflow-hidden relative"
          style={{ willChange: 'transform' }} // Performance optimization
        >
          <motion.div
            className="flex"
            animate={controls}
            style={{ 
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
          >
            {duplicatedFrens.map((fren, index) => (
              <motion.div
                key={`${fren.id}-${index}`}
                className="px-3 pb-12 pt-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0"
                initial={{ opacity: 1 }} // Start fully visible
                style={{ willChange: 'transform' }}
              >
            <motion.div
              className={`${
                    metaMirrorMode ? 'bg-deepCosmos-800' : 'bg-white'
                  } p-6 rounded-2xl shadow-xl border ${
                metaMirrorMode ? 'border-deepCosmos-700' : 'border-quantumGrey-200'
                  } hover:border-metaEmerald-500 transition-all h-full relative group overflow-visible`}
                  whileHover={{ 
                    y: -10,
                    boxShadow: metaMirrorMode 
                      ? '0 20px 40px -15px rgba(0, 0, 0, 0.6)'
                      : '0 20px 40px -15px rgba(0, 0, 0, 0.15)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-metaEmerald-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
              
              <motion.div 
                    className="w-24 h-24 mx-auto mb-6 relative"
                whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.7 }}
              >
                <div className="absolute inset-0 bg-metaEmerald-500 rounded-full opacity-10 animate-pulse" />
                    <div className={`w-full h-full relative z-10 rounded-full ${
                      logoStyles[fren.name as keyof typeof logoStyles] || 'bg-white'
                    } p-3 flex items-center justify-center overflow-hidden border ${metaMirrorMode ? 'border-deepCosmos-600' : 'border-gray-100'} shadow-lg`}>
                      <div className={`flex items-center justify-center inset-0 ${
                        metaMirrorMode ? "text-metaEmerald-500" : "text-metaEmerald-800"
                      }`}>
                        {getLogoIcon(fren.id)}
                      </div>
                    </div>
              </motion.div>
              
              <div className="text-center relative z-10">
                <motion.h3 
                  className={`text-xl font-bold mb-2 ${
                    metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {fren.name}
                </motion.h3>
                    <p className={`text-sm mb-4 ${
                      metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-700'
                }`}>
                  {fren.description}
                </p>
                    <div className="flex items-center justify-center">
                  <motion.span 
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          metaMirrorMode ? 'bg-metaEmerald-500/20 text-metaEmerald-500' : 'bg-metaEmerald-800/20 text-metaEmerald-800'
                        }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {fren.category}
                  </motion.span>
                </div>
              </div>
                </motion.div>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FrensMap;