import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRightIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '../../store/useAppStore';

const Features: React.FC = () => {
  const controls = useAnimation();
  const { metaMirrorMode } = useAppStore();
  const features = [
    {
      icon: <div className="h-12 w-12 text-metaEmerald-400">🚀</div>,
      title: 'Advanced AI',
      description: 'Utilize cutting-edge AI technology for enhanced creativity and productivity.',
      url: '#'
    },
    {
      icon: <div className="h-12 w-12 text-metaEmerald-400">��</div>,
      title: 'Web3 Integration',
      description: 'Integrate with the blockchain for secure and transparent transactions.',
      url: '#'
    },
    {
      icon: <div className="h-12 w-12 text-metaEmerald-400">🎨</div>,
      title: 'Artistic Tools',
      description: 'Access a wide range of artistic tools for digital creation.',
      url: '#'
    },
    {
      icon: <div className="h-12 w-12 text-metaEmerald-400">��</div>,
      title: 'Search and Discovery',
      description: 'Efficiently search and discover content across the platform.',
      url: '#'
    },
    {
      icon: <div className="h-12 w-12 text-metaEmerald-400">🤖</div>,
      title: 'AI-Powered Assistants',
      description: 'Get personalized assistance from AI-powered assistants.',
      url: '#'
    },
    {
      icon: <div className="h-12 w-12 text-metaEmerald-400">🌐</div>,
      title: 'Web3 Integration',
      description: 'Integrate with the blockchain for secure and transparent transactions.',
      url: '#'
    }
  ];

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <section 
      id="features"
      className={`relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden transition-colors duration-500 ${
        metaMirrorMode ? 'bg-deepCosmos-950 text-quantumGrey-200' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.h2 
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight ${
              metaMirrorMode ? 'text-white' : 'text-black'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The Future of Digital Creation
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Unlock unprecedented capabilities with our suite of next-generation tools
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`rounded-xl p-6 sm:p-8 transition-all ${
                metaMirrorMode 
                  ? 'bg-deepCosmos-900 hover:bg-deepCosmos-800 border border-metaEmerald-900' 
                  : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 + (index * 0.1),
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
            >
              <div className={`mb-4 rounded-lg p-3 inline-block ${
                metaMirrorMode 
                  ? 'bg-deepCosmos-800' 
                  : 'bg-gray-100'
              }`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold mb-3 ${
                metaMirrorMode ? 'text-white' : 'text-black'
              }`}>{feature.title}</h3>
              <p className={`text-base sm:text-lg leading-relaxed ${
                metaMirrorMode ? 'text-quantumGrey-300' : 'text-gray-800'
              }`}>{feature.description}</p>
              <div className="mt-4">
                <motion.a 
                  href={feature.url} 
                  className={`inline-flex items-center text-sm sm:text-base font-medium ${
                    metaMirrorMode ? 'text-metaEmerald-400 hover:text-metaEmerald-300' : 'text-black hover:text-gray-700'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  Learn more
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 sm:mt-20 md:mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a 
            href="#use-cases" 
            className={`inline-flex items-center text-lg sm:text-xl font-medium ${
              metaMirrorMode ? 'text-metaEmerald-400 hover:text-metaEmerald-300' : 'text-black hover:text-gray-700'
            }`}
          >
            Explore use cases
            <ArrowDownIcon className="w-5 h-5 ml-2" />
          </a>
        </motion.div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Abstract Shapes */}
        <div className={`absolute top-20 -right-24 w-96 h-96 rounded-full opacity-10 blur-3xl ${
          metaMirrorMode ? 'bg-metaEmerald-700' : 'bg-black'
        }`} />
        <div className={`absolute bottom-40 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl ${
          metaMirrorMode ? 'bg-metaEmerald-500' : 'bg-black'
        }`} />
        
        {/* Grid Pattern */}
        <div className={`absolute inset-0 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 grid-rows-6 sm:grid-rows-8 md:grid-rows-12 opacity-30 ${
          metaMirrorMode ? 'opacity-20' : 'opacity-15'
        }`}>
          {Array.from({ length: 144 }).map((_, i) => (
            <div 
              key={i} 
              className={`border ${
                metaMirrorMode ? 'border-metaEmerald-800/10' : 'border-black/5'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 