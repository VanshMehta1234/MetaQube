import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import ToggleGroup from '../components/ui/ToggleGroup';

const ContactPage = () => {
  const { metaMirrorMode, resetToggleOptions } = useAppStore();
  
  // Reset toggle options on component mount
  useEffect(() => {
    resetToggleOptions();
  }, [resetToggleOptions]);

  return (
    <main className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      metaMirrorMode ? 'bg-deepCosmos-900 text-white' : 'bg-white text-black'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.h1 
            className={`text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 ${
              metaMirrorMode ? 'text-prismWhite' : 'text-black'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            className={`mt-3 max-w-2xl mx-auto text-xl mb-16 ${
              metaMirrorMode ? 'text-quantumGrey-300' : 'text-gray-700'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>

        {/* Project Parameters */}
        <motion.div
          className="max-w-xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ToggleGroup />
        </motion.div>

        <motion.div 
          className="mt-16 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${
                metaMirrorMode ? 'text-quantumGrey-300' : 'text-gray-700'
              }`}>
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`shadow-sm block w-full sm:text-sm rounded-lg px-4 py-3 ${
                    metaMirrorMode 
                      ? 'bg-deepCosmos-700 border border-deepCosmos-600 text-prismWhite focus:border-metaEmerald-500' 
                      : 'bg-gray-50 border border-gray-200 text-black focus:border-black focus:ring-1 focus:ring-black/20'
                  }`}
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${
                metaMirrorMode ? 'text-quantumGrey-300' : 'text-gray-700'
              }`}>
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`shadow-sm block w-full sm:text-sm rounded-lg px-4 py-3 ${
                    metaMirrorMode 
                      ? 'bg-deepCosmos-700 border border-deepCosmos-600 text-prismWhite focus:border-metaEmerald-500' 
                      : 'bg-gray-50 border border-gray-200 text-black focus:border-black focus:ring-1 focus:ring-black/20'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className={`block text-sm font-medium ${
                metaMirrorMode ? 'text-quantumGrey-300' : 'text-gray-700'
              }`}>
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`shadow-sm block w-full sm:text-sm rounded-lg px-4 py-3 ${
                    metaMirrorMode 
                      ? 'bg-deepCosmos-700 border border-deepCosmos-600 text-prismWhite focus:border-metaEmerald-500' 
                      : 'bg-gray-50 border border-gray-200 text-black focus:border-black focus:ring-1 focus:ring-black/20'
                  }`}
                  placeholder="Your message"
                />
              </div>
            </div>

            <div>
              <motion.button
                type="submit"
                className={`w-full flex justify-center py-4 px-8 rounded-lg text-lg font-bold shadow-lg transition-all ${
                  metaMirrorMode 
                    ? 'bg-metaEmerald-500 text-deepCosmos-900 shadow-metaEmerald-500/20 hover:bg-metaEmerald-400' 
                    : 'bg-black text-white shadow-black/15 hover:bg-gray-900'
                }`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: metaMirrorMode 
                    ? '0 15px 30px -10px rgba(26, 209, 181, 0.3)'
                    : '0 15px 30px -10px rgba(0, 0, 0, 0.2)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
};

export default ContactPage;