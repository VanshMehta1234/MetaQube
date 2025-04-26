import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

const frens = [
  { 
    id: 1, 
    name: 'Buildspace', 
    logo: 'https://pbs.twimg.com/profile_images/1597722660778713091/xs2vcEwG_400x400.jpg',
    year: '2023',
    description: 'Web3 educational platform',
    category: 'Education'
  },
  { 
    id: 2, 
    name: 'Coinbase', 
    logo: 'https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg',
    year: '2022',
    description: 'Cryptocurrency exchange',
    category: 'Exchange'
  },
  { 
    id: 3, 
    name: 'Paradigm', 
    logo: 'https://pbs.twimg.com/profile_images/1455877348584677380/JbAFThFU_400x400.jpg',
    year: '2022',
    description: 'Crypto/Web3 investment firm',
    category: 'Investment'
  },
  { 
    id: 4, 
    name: 'Uniswap', 
    logo: 'https://pbs.twimg.com/profile_images/1668966382064771072/AtPAyYR7_400x400.jpg',
    year: '2021',
    description: 'Decentralized exchange protocol',
    category: 'DeFi'
  },
  { 
    id: 5, 
    name: 'Opensea', 
    logo: 'https://pbs.twimg.com/profile_images/1544105652330631168/ZuvjfGkT_400x400.jpg',
    year: '2021',
    description: 'NFT marketplace',
    category: 'NFT'
  },
  { 
    id: 6, 
    name: 'Foundation', 
    logo: 'https://pbs.twimg.com/profile_images/1566716087489298432/QdcE-0K6_400x400.jpg',
    year: '2020',
    description: 'Creative platform for NFTs',
    category: 'NFT'
  },
  { 
    id: 7, 
    name: 'MetaMask', 
    logo: 'https://pbs.twimg.com/profile_images/1649367870122852352/QqR3SmPn_400x400.png',
    year: '2023',
    description: 'Web3 wallet and gateway',
    category: 'Wallet'
  },
  { 
    id: 8, 
    name: 'Polygon', 
    logo: 'https://pbs.twimg.com/profile_images/1726642545989861376/OFTLCe4c_400x400.jpg', 
    year: '2023',
    description: 'Ethereum scaling platform',
    category: 'Infrastructure'
  },
];

const categories = Array.from(new Set(frens.map(fren => fren.category)));
const years = Array.from(new Set(frens.map(fren => fren.year))).sort().reverse();

const FrensMap: React.FC = () => {
  const { metaMirrorMode } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  
  const filteredFrens = frens.filter(fren => 
    (!selectedCategory || fren.category === selectedCategory) &&
    (!selectedYear || fren.year === selectedYear)
  );
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };
  
  const handleYearClick = (year: string) => {
    setSelectedYear(selectedYear === year ? null : year);
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
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${
            metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
          }`}>
            Our <span className="text-metaEmerald-500">Frens</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
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
                    ? 'bg-metaEmerald-500 text-deepCosmos-900'
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
          
          {/* Year Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => handleYearClick(year)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedYear === year
                    ? 'bg-metaEmerald-500 text-deepCosmos-900'
                    : metaMirrorMode
                      ? 'bg-deepCosmos-700 text-quantumGrey-300 hover:bg-deepCosmos-600'
                      : 'bg-prismWhite text-deepCosmos-700 hover:bg-quantumGrey-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </div>
        
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
              } p-6 rounded-lg shadow-lg border ${
                metaMirrorMode ? 'border-deepCosmos-700' : 'border-quantumGrey-200'
              } hover:border-metaEmerald-500 transition-all relative group`}
            >
              <div className="absolute inset-0 bg-metaEmerald-500 opacity-0 group-hover:opacity-5 transition-opacity rounded-lg" />
              
              <motion.div 
                className="w-20 h-20 mx-auto mb-4 relative"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-metaEmerald-500 rounded-full opacity-10 animate-pulse" />
                <img 
                  src={fren.logo} 
                  alt={fren.name} 
                  className="w-full h-full object-contain relative z-10 rounded-full bg-white p-2"
                />
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
                <p className={`text-sm mb-3 ${
                  metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
                }`}>
                  {fren.description}
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <motion.span 
                    className="px-2 py-1 text-xs rounded-full bg-metaEmerald-500/20 text-metaEmerald-500"
                    whileHover={{ scale: 1.1 }}
                  >
                    {fren.category}
                  </motion.span>
                  <motion.span 
                    className="px-2 py-1 text-xs rounded-full bg-metaEmerald-500/10 text-metaEmerald-500"
                    whileHover={{ scale: 1.1 }}
                  >
                    {fren.year}
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