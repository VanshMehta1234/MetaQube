import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

// Use local logos instead of external URLs to avoid CORS issues
const backupLogos = {
  'Buildspace': '/logos/building-logo.png',
  'Coinbase': '/logos/coinbase-logo.png',
  'Paradigm': '/logos/bitcoin-btc-logo.png', // Changed to local file
  'Uniswap': '/logos/uniswap-logo.png',
  'Opensea': '/logos/opensea-logo.png',
  'Foundation': '/logos/nft-logo.png', // Changed to local file
  'MetaMask': '/logos/metamask-logo.png',
  'Polygon': '/logos/polygon-logo.png'
};

// Primary logo URLs with alternatives for better loading
const primaryLogos = {
  'Buildspace': 'http://upload.wikimedia.org/wikipedia/commons/1/1a/Coinbase.svg',
  'Coinbase': 'http://upload.wikimedia.org/wikipedia/commons/1/1a/Coinbase.svg',
  'Paradigm': 'http://upload.wikimedia.org/wikipedia/commons/1/1a/Coinbase.svg', // Changed to local file
  'Uniswap': 'http://upload.wikimedia.org/wikipedia/commons/1/1a/Coinbase.svg',
  'Opensea': 'http://upload.wikimedia.org/wikipedia/commons/1/1a/Coinbase.svg',
  'Foundation': 'http://upload.wikimedia.org/wikipedia/commons/1/1a/Coinbase.svg', // Changed to local file
  'MetaMask': 'http://upload.wikimedia.org/wikipedia/commons/1/1a/Coinbase.svg',
  'Polygon': 'http://upload.wikimedia.org/wikipedia/commons/1/1a/Coinbase.svg'
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
    logo: primaryLogos.Buildspace || 'https://pbs.twimg.com/profile_images/1597722660778713091/xs2vcEwG_400x400.jpg',
    description: 'Web3 educational platform',
    category: 'Education'
  },
  { 
    id: 2, 
    name: 'Coinbase', 
    logo: primaryLogos.Coinbase || 'https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg',
    description: 'Cryptocurrency exchange',
    category: 'Exchange'
  },
  { 
    id: 3, 
    name: 'Paradigm', 
    logo: primaryLogos.Paradigm || 'https://pbs.twimg.com/profile_images/1455877348584677380/JbAFThFU_400x400.jpg',
    description: 'Crypto/Web3 investment firm',
    category: 'Investment'
  },
  { 
    id: 4, 
    name: 'Uniswap', 
    logo: primaryLogos.Uniswap || 'https://pbs.twimg.com/profile_images/1668966382064771072/AtPAyYR7_400x400.jpg',
    description: 'Decentralized exchange protocol',
    category: 'DeFi'
  },
  { 
    id: 5, 
    name: 'Opensea', 
    logo: primaryLogos.Opensea || 'https://pbs.twimg.com/profile_images/1544105652330631168/ZuvjfGkT_400x400.jpg',
    description: 'NFT marketplace',
    category: 'NFT'
  },
  { 
    id: 6, 
    name: 'Foundation', 
    logo: primaryLogos.Foundation || 'https://pbs.twimg.com/profile_images/1566716087489298432/QdcE-0K6_400x400.jpg',
    description: 'Creative platform for NFTs',
    category: 'NFT'
  },
  { 
    id: 7, 
    name: 'MetaMask', 
    logo: primaryLogos.MetaMask || 'https://pbs.twimg.com/profile_images/1649367870122852352/QqR3SmPn_400x400.png',
    description: 'Web3 wallet and gateway',
    category: 'Wallet'
  },
  { 
    id: 8, 
    name: 'Polygon', 
    logo: primaryLogos.Polygon || 'https://pbs.twimg.com/profile_images/1726642545989861376/OFTLCe4c_400x400.jpg', 
    description: 'Ethereum scaling platform',
    category: 'Infrastructure'
  },
];

const categories = Array.from(new Set(frens.map(fren => fren.category)));

const FrensMap: React.FC = () => {
  const { metaMirrorMode } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredFrens = frens.filter(fren => 
    (!selectedCategory || fren.category === selectedCategory)
  );
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };
  
  return (
    <section id="frens" className={`py-24 transition-colors relative overflow-hidden ${
      metaMirrorMode ? 'bg-deepCosmos-900' : 'bg-quantumGrey-50'
    }`}>
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute inset-0"
              style={{
                border: '1px solid rgba(26, 209, 181, 0.3)',
                borderRadius: '40%',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.1, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10,
                delay: i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 ${
            metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
          }`}>
            Our <span className="text-metaEmerald-500">Frens</span>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${
            metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-700'
          }`}>
            Building alongside the best in the industry to create the future of digital experiences.
          </p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? metaMirrorMode
                      ? 'bg-metaEmerald-500 text-deepCosmos-900'
                      : 'bg-black text-white'
                    : metaMirrorMode
                      ? 'bg-deepCosmos-700 text-quantumGrey-300 hover:bg-deepCosmos-600'
                      : 'bg-prismWhite text-deepCosmos-700 hover:bg-quantumGrey-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
        
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {filteredFrens.map((fren, index) => (
            <motion.div
              key={fren.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`${
                metaMirrorMode ? 'bg-deepCosmos-800' : 'bg-prismWhite'
              } p-5 sm:p-6 rounded-lg shadow-lg border ${
                metaMirrorMode ? 'border-deepCosmos-700' : 'border-quantumGrey-200'
              } hover:border-metaEmerald-500 transition-all relative group`}
              whileHover={{ 
                y: -5,
                boxShadow: metaMirrorMode 
                  ? '0 15px 30px -10px rgba(0, 0, 0, 0.5)'
                  : '0 15px 30px -10px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="absolute inset-0 bg-metaEmerald-500 opacity-0 group-hover:opacity-5 transition-opacity rounded-lg" />
              
              <motion.div 
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 relative"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-metaEmerald-500 rounded-full opacity-10 animate-pulse" />
                <div className={`w-full h-full relative z-10 rounded-full ${
                  logoStyles[fren.name as keyof typeof logoStyles] || 'bg-white'
                } p-2 flex items-center justify-center overflow-hidden border border-gray-100`}>
                  <img 
                    src={fren.logo} 
                    alt={fren.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      // Try backup logo first
                      if (backupLogos[fren.name as keyof typeof backupLogos]) {
                        // Add public path prefix if not already present
                        const backupSrc = backupLogos[fren.name as keyof typeof backupLogos];
                        e.currentTarget.src = backupSrc.startsWith('/') ? backupSrc : `/${backupSrc}`;
                      } else {
                        // If backup fails, hide the image and show the icon
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('show-icon');
                      }
                    }}
                  />
                  <div className={`absolute inset-0 items-center justify-center ${
                    metaMirrorMode ? "text-metaEmerald-500" : "text-metaEmerald-700"
                  } hidden show-icon:flex`}>
                    {getLogoIcon(fren.id)}
                  </div>
                </div>
              </motion.div>
              
              <div className="text-center relative z-10">
                <motion.h3 
                  className={`text-lg sm:text-xl font-bold mb-2 ${
                    metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {fren.name}
                </motion.h3>
                <p className={`text-sm mb-3 ${
                  metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-700'
                }`}>
                  {fren.description}
                </p>
                <div className="flex items-center justify-center">
                  <motion.span 
                    className={`px-2 py-1 text-xs rounded-full ${
                      metaMirrorMode ? 'bg-metaEmerald-500/20 text-metaEmerald-500' : 'bg-metaEmerald-700/20 text-metaEmerald-700'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {fren.category}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FrensMap;