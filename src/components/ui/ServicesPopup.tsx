import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bitcoin, Code, Palette, Rocket, 
  Cpu, Building2, BarChart, Activity,
  DatabaseIcon, Network, Users, PieChart, 
  Globe, Share2, UserPlus, ShoppingBag,
  Home, ImageIcon, Map, Key, Building, Wrench,
  Bot, LineChart, Webhook, BrainCircuit, BarChart3, Sparkles
} from 'lucide-react';

interface SubCategory {
  title: string;
  icon: React.ReactNode;
}

interface ServiceCategory {
  title: string;
  mainIcon: React.ReactNode;
  subCategories: SubCategory[];
}

const serviceCategories: ServiceCategory[] = [
  {
    title: 'Web3 Development',
    mainIcon: <Bitcoin className="w-5 h-5" />,
    subCategories: [
      { title: 'DeFi', icon: <BarChart className="w-4 h-4" /> },
      { title: 'CeFi', icon: <PieChart className="w-4 h-4" /> },
      { title: 'DePIN', icon: <Network className="w-4 h-4" /> },
      { title: 'SocialFi', icon: <Users className="w-4 h-4" /> },
      { title: 'Ethereum Dapps', icon: <DatabaseIcon className="w-4 h-4" /> },
      { title: 'Solana Dapps', icon: <Activity className="w-4 h-4" /> },
      { title: 'EVM Dapps', icon: <Code className="w-4 h-4" /> },
      { title: 'Blockchain', icon: <Bitcoin className="w-4 h-4" /> }
    ]
  },
  {
    title: 'Brand Consultation',
    mainIcon: <Palette className="w-5 h-5" />,
    subCategories: [
      { title: 'Community Building', icon: <Users className="w-4 h-4" /> },
      { title: 'Brand Communication', icon: <Globe className="w-4 h-4" /> },
      { title: 'Web3 Social Media', icon: <Share2 className="w-4 h-4" /> },
      { title: 'Penetration and Distribution', icon: <BarChart className="w-4 h-4" /> },
      { title: 'Onboarding', icon: <UserPlus className="w-4 h-4" /> },
      { title: 'Sales', icon: <ShoppingBag className="w-4 h-4" /> }
    ]
  },
  {
    title: 'Dev Sprint',
    mainIcon: <Rocket className="w-5 h-5" />,
    subCategories: [
      { title: 'Somebody left the tech job halfway? We will finish it!', icon: <Rocket className="w-4 h-4" /> }
    ]
  },
  {
    title: 'Metaverse Experience',
    mainIcon: <Building2 className="w-5 h-5" />,
    subCategories: [
      { title: 'On-chain Real Estate', icon: <Home className="w-4 h-4" /> },
      { title: 'NFT Integration', icon: <ImageIcon className="w-4 h-4" /> },
      { title: 'Virtual Tour', icon: <Map className="w-4 h-4" /> },
      { title: 'Digital Ownership', icon: <Key className="w-4 h-4" /> },
      { title: 'Metaverse Building', icon: <Building className="w-4 h-4" /> },
      { title: 'Metaverse Tools Building', icon: <Wrench className="w-4 h-4" /> }
    ]
  },
  {
    title: 'AI Development',
    mainIcon: <Cpu className="w-5 h-5" />,
    subCategories: [
      { title: 'AI Agents', icon: <Bot className="w-4 h-4" /> },
      { title: 'AI Tools for Optimization', icon: <LineChart className="w-4 h-4" /> },
      { title: 'AI Integration', icon: <Webhook className="w-4 h-4" /> },
      { title: 'LLM', icon: <BrainCircuit className="w-4 h-4" /> }
    ]
  },
  {
    title: 'Digital Transformation',
    mainIcon: <Sparkles className="w-5 h-5" />,
    subCategories: [
      { title: 'Transforming Existing Business Using Web3 and AI', icon: <BarChart3 className="w-4 h-4" /> }
    ]
  }
];

const ServicesPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleCategoryHover = (index: number) => {
    setActiveCategory(index);
  };
  
  return (
    <div className="relative" ref={popupRef}>
      <button
        className="relative font-medium text-lg hover:text-metaEmerald-500 transition-colors overflow-hidden text-prismWhite/90"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        Services
        <span className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 ease-in-out group-hover:w-full bg-metaEmerald-500"></span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 z-50 bg-deepCosmos-800 border border-deepCosmos-700 rounded-xl shadow-2xl shadow-black/50 w-[800px] flex overflow-hidden"
            onMouseLeave={() => setIsOpen(false)}
          >
            {/* Categories list */}
            <div className="w-1/3 border-r border-deepCosmos-700 bg-deepCosmos-900/30">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={index}
                  className={`px-4 py-3 flex items-center space-x-3 cursor-pointer ${
                    activeCategory === index 
                      ? 'bg-metaEmerald-500/10 text-metaEmerald-500' 
                      : 'text-prismWhite hover:bg-deepCosmos-700/50'
                  }`}
                  onMouseEnter={() => handleCategoryHover(index)}
                  onClick={() => handleCategoryHover(index)}
                  whileHover={{ x: 5 }}
                >
                  <div className={`${activeCategory === index ? 'text-metaEmerald-500' : 'text-metaEmerald-500/60'}`}>
                    {category.mainIcon}
                  </div>
                  <span className="font-medium">{category.title}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Subcategories */}
            <div className="w-2/3 p-6 bg-gradient-to-br from-deepCosmos-800 to-deepCosmos-900">
              {activeCategory !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-bold text-metaEmerald-500 mb-4 flex items-center gap-2">
                    {serviceCategories[activeCategory].mainIcon}
                    {serviceCategories[activeCategory].title}
                  </h3>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                    {serviceCategories[activeCategory].subCategories.map((subCategory, idx) => (
                      <motion.a
                        key={idx}
                        href={`#${serviceCategories[activeCategory].title.toLowerCase().replace(/\s+/g, '-')}-${subCategory.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-deepCosmos-700/50 group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-metaEmerald-500/10 flex items-center justify-center text-metaEmerald-500 group-hover:bg-metaEmerald-500/20">
                          {subCategory.icon}
                        </div>
                        <span className="text-quantumGrey-300 group-hover:text-prismWhite">{subCategory.title}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesPopup; 