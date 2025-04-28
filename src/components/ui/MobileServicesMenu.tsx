import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bitcoin, Code, Palette, Rocket, 
  Cpu, Building2, BarChart, Activity,
  DatabaseIcon, Network, Users, PieChart, 
  Globe, Share2, UserPlus, ShoppingBag,
  Home, ImageIcon, Map, Key, Building, Wrench,
  Bot, LineChart, Webhook, BrainCircuit, BarChart3, Sparkles,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

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

interface MobileServicesMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileServicesMenu: React.FC<MobileServicesMenuProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { metaMirrorMode } = useAppStore();
  
  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };
  
  const handleCategoryClick = (index: number) => {
    setSelectedCategory(index);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-50 ${metaMirrorMode ? 'bg-deepCosmos-900' : 'bg-prismWhite'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pt-2">
              <motion.button
                onClick={selectedCategory !== null ? handleBackToCategories : onClose}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-metaEmerald-500"
              >
                <ChevronLeft size={24} />
              </motion.button>
              
              <h2 className={`text-xl font-bold ${metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'}`}>
                {selectedCategory !== null 
                  ? serviceCategories[selectedCategory].title 
                  : 'Our Services'}
              </h2>
              
              <motion.button
                onClick={onClose}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-metaEmerald-500"
              >
                {selectedCategory === null && <ChevronRight size={24} />}
              </motion.button>
            </div>
            
            {/* Content */}
            <div className="flex-grow overflow-y-auto">
              {selectedCategory === null ? (
                // Categories list
                <div className="space-y-2">
                  {serviceCategories.map((category, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 flex items-center justify-between rounded-xl cursor-pointer ${
                        metaMirrorMode 
                          ? 'bg-deepCosmos-800 hover:bg-deepCosmos-700' 
                          : 'bg-quantumGrey-50 hover:bg-quantumGrey-100'
                      }`}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategoryClick(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-metaEmerald-500/10 flex items-center justify-center text-metaEmerald-500">
                          {category.mainIcon}
                        </div>
                        <span className={`font-medium ${metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'}`}>
                          {category.title}
                        </span>
                      </div>
                      <ChevronRight size={20} className="text-metaEmerald-500" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                // Subcategories for selected category
                <div className="space-y-2">
                  {serviceCategories[selectedCategory].subCategories.map((subCategory, index) => (
                    <motion.a
                      key={index}
                      href={`#${serviceCategories[selectedCategory].title.toLowerCase().replace(/\s+/g, '-')}-${subCategory.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`p-4 flex items-center space-x-3 rounded-xl ${
                        metaMirrorMode 
                          ? 'bg-deepCosmos-800 hover:bg-deepCosmos-700' 
                          : 'bg-quantumGrey-50 hover:bg-quantumGrey-100'
                      }`}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                    >
                      <div className="w-10 h-10 rounded-full bg-metaEmerald-500/10 flex items-center justify-center text-metaEmerald-500">
                        {subCategory.icon}
                      </div>
                      <span className={`${metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'}`}>
                        {subCategory.title}
                      </span>
                    </motion.a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileServicesMenu; 