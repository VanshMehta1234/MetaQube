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
  const [dropdownPosition, setDropdownPosition] = useState<'left' | 'right'>('left');
  const popupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  
  // Calculate dropdown position based on viewport
  const calculatePosition = () => {
    if (!triggerRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownWidth = 800; // Fixed dropdown width
    const viewportWidth = window.innerWidth;
    const spacing = 16; // Minimum spacing from edge
    
    // Check if dropdown would overflow on the right
    const wouldOverflowRight = triggerRect.left + dropdownWidth + spacing > viewportWidth;
    
    // Position dropdown to the right if it would overflow on the left side
    setDropdownPosition(wouldOverflowRight ? 'right' : 'left');
  };
  
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
  
  // Recalculate position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        calculatePosition();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);
  
  const handleCategoryHover = (index: number) => {
    setActiveCategory(index);
  };
  
  const handleOpen = () => {
    calculatePosition();
    setIsOpen(true);
  };
  
  // Get responsive dropdown width based on viewport
  const getDropdownClasses = () => {
    const baseClasses = "absolute mt-2 z-50 bg-deepCosmos-800 border border-deepCosmos-700 rounded-xl shadow-2xl shadow-black/50 flex overflow-hidden";
    const widthClasses = "w-[800px] max-w-[95vw] lg:w-[800px] md:w-[700px] sm:w-[90vw]";
    const positionClasses = dropdownPosition === 'right' ? 'right-0' : 'left-0';
    
    return `${baseClasses} ${widthClasses} ${positionClasses}`;
  };
  
  return (
    <div className="relative" ref={popupRef}>
      <button
        ref={triggerRef}
        className="relative font-medium text-lg hover:text-metaEmerald-500 transition-colors overflow-hidden text-prismWhite/90"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleOpen}
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
            className={getDropdownClasses()}
            onMouseLeave={() => setIsOpen(false)}
          >
            {/* Categories list */}
            <div className="w-1/3 min-w-[200px] border-r border-deepCosmos-700 bg-deepCosmos-900/30">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={index}
                  className={`px-4 py-3 flex items-center space-x-3 cursor-pointer text-sm lg:text-base ${
                    activeCategory === index 
                      ? 'bg-metaEmerald-500/10 text-metaEmerald-500' 
                      : 'text-prismWhite hover:bg-deepCosmos-700/50'
                  }`}
                  onMouseEnter={() => handleCategoryHover(index)}
                  onClick={() => handleCategoryHover(index)}
                  whileHover={{ x: 5 }}
                >
                  <div className={`flex-shrink-0 ${activeCategory === index ? 'text-metaEmerald-500' : 'text-metaEmerald-500/60'}`}>
                    {category.mainIcon}
                  </div>
                  <span className="font-medium truncate">{category.title}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Subcategories */}
            <div className="w-2/3 p-4 lg:p-6 bg-gradient-to-br from-deepCosmos-800 to-deepCosmos-900">
              {activeCategory !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg lg:text-xl font-bold text-metaEmerald-500 mb-4 flex items-center gap-2">
                    {serviceCategories[activeCategory].mainIcon}
                    <span className="truncate">{serviceCategories[activeCategory].title}</span>
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-4 lg:gap-x-6">
                    {serviceCategories[activeCategory].subCategories.map((subCategory, idx) => (
                      <motion.a
                        key={idx}
                        href={`#${serviceCategories[activeCategory].title.toLowerCase().replace(/\s+/g, '-')}-${subCategory.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-deepCosmos-700/50 group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-metaEmerald-500/10 flex items-center justify-center text-metaEmerald-500 group-hover:bg-metaEmerald-500/20 flex-shrink-0">
                          {subCategory.icon}
                        </div>
                        <span className="text-sm lg:text-base text-quantumGrey-300 group-hover:text-prismWhite break-words">
                          {subCategory.title}
                        </span>
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