import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const BuildYourQube: React.FC = () => {
  const { qubeOptions, selectQubeOption, resetQubeOptions, assembling, setAssembling, metaMirrorMode } = useAppStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  const selectedCount = qubeOptions.filter(option => option.selected).length;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    setTimeout(() => {
      setDialogOpen(false);
      setFormData({
        name: '',
        email: '',
        country: '',
        description: ''
      });
      resetQubeOptions();
      setSubmitted(false);
    }, 2000);
  };
  
  const startAssembly = () => {
    if (selectedCount === 0) return;
    setAssembling(true);
    
    setTimeout(() => {
      setAssembling(false);
      setDialogOpen(true);
    }, 2000);
  };
  
  return (
    <section id="build-qube" className={`pt-24 ${
      metaMirrorMode 
        ? 'bg-deepCosmos-900' 
        : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
    } relative overflow-hidden transition-colors duration-300`}>
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing orbs */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: metaMirrorMode 
                ? `radial-gradient(circle, rgba(26, 209, 181, 0.15) 0%, rgba(26, 209, 181, 0) 70%)`
                : `radial-gradient(circle, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0) 70%)`,
              left: `${25 + i * 25}%`,
              top: `${20 + i * 30}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Grid overlay */}
        <div className={`absolute inset-0 grid grid-cols-12 grid-rows-12 ${
          metaMirrorMode ? 'opacity-10' : 'opacity-5'
        }`}>
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className={`border ${
              metaMirrorMode ? 'border-metaEmerald-500/10' : 'border-black/10'
            }`} />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold mb-6 ${
            metaMirrorMode 
              ? 'text-prismWhite' 
              : 'bg-clip-text text-transparent bg-gradient-to-r from-black via-black to-gray-900'
          }`}>
            Build Your Own <span className={"text-[#3fa7f5]"}>Qube</span>
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            metaMirrorMode ? 'text-quantumGrey-300' : 'text-gray-700'
          }`}>
            Select the use cases that match your needs, and we'll craft a custom solution that transcends traditional spaces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {qubeOptions.map((option) => (
            <motion.button
              key={option.id}
              className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all group overflow-hidden h-full ${
                option.selected 
                  ? metaMirrorMode
                    ? 'border-metaEmerald-500 bg-metaEmerald-500/10 shadow-lg shadow-metaEmerald-500/20' 
                    : 'border-metaEmerald-700 bg-gradient-to-br from-metaEmerald-50 to-white shadow-lg shadow-metaEmerald-700/10'
                  : metaMirrorMode
                    ? 'border-deepCosmos-700 bg-deepCosmos-800/80 hover:border-metaEmerald-800'
                    : 'border-gray-200 bg-white hover:border-metaEmerald-600 hover:shadow-md'
              }`}
              onClick={() => selectQubeOption(option.id)}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: metaMirrorMode 
                  ? '0 10px 25px -5px rgba(26, 209, 181, 0.2)' 
                  : '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Top corner glow */}
              <div className={`absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 rounded-full blur-xl transition-opacity duration-300 ${
                option.selected 
                  ? metaMirrorMode 
                    ? 'bg-metaEmerald-500/30' 
                    : 'bg-metaEmerald-700/20'
                  : 'bg-metaEmerald-500/0'
              }`}
              />
              
              {/* Option icon */}
              <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                option.selected 
                  ? metaMirrorMode
                    ? 'bg-metaEmerald-500'
                    : 'bg-metaEmerald-700'
                  : metaMirrorMode
                    ? 'bg-deepCosmos-700'
                    : 'bg-gray-100'
              }`}>
                {option.id === 'web3' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={
                    option.selected 
                      ? metaMirrorMode ? 'text-deepCosmos-900' : 'text-white' 
                      : metaMirrorMode ? 'text-metaEmerald-500' : 'text-gray-900'
                  }>
                    <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.216-6.893m-1.216 6.893-3.94-.694m5.157-6.2L11.18 2.5m-1.698 16.919c-4.924-.868-6.14 6.025-1.216 6.894m1.216-6.894 6.878 1.213m-8.094 5.68.346-1.97m1.563-8.863c-4.924-.868-6.14 6.025-1.216 6.893m1.216-6.893 3.94.694m-5.156 6.2 3.025 2.694" />
                  </svg>
                )}
                {option.id === 'brand' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={
                    option.selected 
                      ? metaMirrorMode ? 'text-deepCosmos-900' : 'text-white' 
                      : metaMirrorMode ? 'text-metaEmerald-500' : 'text-gray-900'
                  }>
                    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"></path>
                    <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2"></path>
                    <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"></path>
                    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"></path>
                    <path d="M8.65 22c.21-.66.45-1.32.57-2"></path>
                    <path d="M14 13.12c0 2.38 0 6.38-1 8.88"></path>
                    <path d="M2 16h.01"></path>
                    <path d="M21.8 16c.2-2 .131-5.354 0-6"></path>
                    <path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2"></path>
                  </svg>
                )}
                {option.id === 'dev' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={
                    option.selected 
                      ? metaMirrorMode ? 'text-deepCosmos-900' : 'text-white' 
                      : metaMirrorMode ? 'text-metaEmerald-500' : 'text-gray-900'
                  }>
                    <path d="M13 18L21.5 9.5a2.83 2.83 0 1 0-4-4L8 15"></path>
                    <path d="M16 18l2-2"></path>
                    <path d="M8 6l-3.76 1.27a2 2 0 0 0-1.24 2.26l2.76 15.43a1 1 0 0 0 .2.39 1 1 0 0 0 1.47.1c.02-.02.21-.2.4-.4l1.53-1.53 1.2-1.2"></path>
                    <path d="M5.14 18.5L8 15l-1.5-3-1.5-3-2.76 5.77"></path>
                  </svg>
                )}
                {option.id === 'metaverse' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={
                    option.selected 
                      ? metaMirrorMode ? 'text-deepCosmos-900' : 'text-white' 
                      : metaMirrorMode ? 'text-metaEmerald-500' : 'text-gray-900'
                  }>
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.2 7 12 8 12s8-6.8 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                  </svg>
                )}
                {option.id === 'ai' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={
                    option.selected 
                      ? metaMirrorMode ? 'text-deepCosmos-900' : 'text-white' 
                      : metaMirrorMode ? 'text-metaEmerald-500' : 'text-gray-900'
                  }>
                    <rect x="3" y="11" width="8" height="10" rx="2" ry="2"></rect>
                    <rect x="13" y="11" width="8" height="10" rx="2" ry="2"></rect>
                    <path d="M9 11V9a5 5 0 0 1 5.17-5C16.95 4 19 6.34 19 9v2"></path>
                    <path d="M12 17v4"></path>
                  </svg>
                )}
                {option.id === 'digital' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={
                    option.selected 
                      ? metaMirrorMode ? 'text-deepCosmos-900' : 'text-white' 
                      : metaMirrorMode ? 'text-metaEmerald-500' : 'text-gray-900'
                  }>
                    <path d="m6 9 6 6 6-6"></path>
                    <path d="M4 4h16"></path>
                    <path d="M4 16h4"></path>
                    <path d="M4 20h12"></path>
                    <path d="M20 16h-4"></path>
                  </svg>
                )}
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className={`text-xl font-bold mb-3 text-left transition-colors duration-300 ${
                  option.selected
                    ? metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-700'
                    : metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
                }`}>
                  {option.label}
                </h3>
                <p className={`text-left text-sm leading-relaxed min-h-[60px] ${
                  metaMirrorMode 
                    ? 'text-quantumGrey-300' 
                    : option.selected ? 'text-gray-800' : 'text-deepCosmos-800'
                }`}>
                  {option.description}
                </p>
                
                {/* Selected indicator */}
                {option.selected && (
                  <motion.div 
                    className="mt-4 flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className={`h-px w-full mr-3 ${
                      metaMirrorMode ? 'bg-metaEmerald-500/50' : 'bg-metaEmerald-700/70'
                    }`}></div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      metaMirrorMode ? 'bg-metaEmerald-500' : 'bg-metaEmerald-700'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={
                        metaMirrorMode ? 'text-deepCosmos-900' : 'text-white'
                      }>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Selection indicator */}
              {option.selected && (
                <motion.div
                  className={`absolute inset-0 border-2 rounded-xl ${
                    metaMirrorMode ? 'border-metaEmerald-500' : 'border-metaEmerald-700'
                  }`}
                  layoutId="selection"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        
        <div className="flex flex-col items-center justify-center relative z-20 pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <p className={`text-lg ${
              metaMirrorMode ? 'text-quantumGrey-300' : 'text-gray-700'
            }`}>
              <span className={`font-bold ${
                metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-700'
              }`}>{selectedCount}</span> options selected
            </p>
          </motion.div>
          
          <motion.button
            className={`btn-meta px-10 py-5 rounded-lg text-xl font-bold mb-8 transition-all relative overflow-hidden ${
              selectedCount > 0 
                ? metaMirrorMode
                  ? 'bg-metaEmerald-500 text-deepCosmos-900 hover:bg-metaEmerald-400 shadow-xl shadow-metaEmerald-500/20'
                  : 'bg-gradient-to-r from-black to-gray-900 text-white hover:from-gray-900 hover:to-black shadow-xl shadow-black/10'
                : metaMirrorMode
                  ? 'bg-deepCosmos-700 text-quantumGrey-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            disabled={selectedCount === 0}
            onClick={startAssembly}
            whileHover={selectedCount > 0 ? { 
              scale: 1.05,
              boxShadow: metaMirrorMode 
                ? '0 20px 30px -10px rgba(26, 209, 181, 0.3)'
                : '0 20px 30px -10px rgba(0, 0, 0, 0.2)'
            } : {}}
            whileTap={selectedCount > 0 ? { scale: 0.95 } : {}}
          >
            {/* Button glow effect */}
            {selectedCount > 0 && (
              <motion.div
                className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"
                initial={false}
                animate={{ scale: assembling ? 1.2 : 1 }}
              />
            )}
            <span className="relative z-10">
              {assembling ? 'Assembling...' : 'Assemble Your Qube'}
            </span>
          </motion.button>
          
          <AnimatePresence>
            {assembling && (
              <motion.div 
                className="relative w-48 h-48 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className={`absolute inset-0 border-2 ${
                    metaMirrorMode ? 'border-metaEmerald-500' : 'border-metaEmerald-700'
                  }`}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ 
                    scale: [0, 1, 1], 
                    rotate: [0, 180, 360],
                    borderRadius: ["50%", "0%"],
                  }}
                  transition={{ duration: 1.5 }}
                />
                
                {/* Glow effect */}
                <motion.div
                  className={`absolute inset-0 rounded-full filter blur-xl ${
                    metaMirrorMode ? 'bg-metaEmerald-500' : 'bg-metaEmerald-700 opacity-70'
                  }`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: [0, 0.2, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {selectedCount > 0 && (
                  <motion.div 
                    className={`absolute inset-0 flex items-center justify-center font-bold text-2xl ${
                      metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-700'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.8] }}
                    transition={{ delay: 1, duration: 1 }}
                  >
                    QUBE BUILT
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" />
          <Dialog.Content className={`fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[calc(100%-2rem)] max-w-lg rounded-xl shadow-xl p-6 z-[101] max-h-[90vh] overflow-y-auto ${
            metaMirrorMode ? 'bg-deepCosmos-800 text-prismWhite' : 'bg-white text-black'
          }`}>
            <Dialog.Title className={`text-2xl font-bold mb-4 ${
              metaMirrorMode ? 'text-prismWhite' : 'text-black'
            }`}>
              Complete Your Qube
            </Dialog.Title>
            
            <Dialog.Description className={`mb-6 ${
              metaMirrorMode ? 'text-quantumGrey-300' : 'text-gray-600'
            }`}>
              Fill in your details to get started with your custom Qube solution.
            </Dialog.Description>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`text-sm font-medium mb-1 block ${
                  metaMirrorMode ? 'text-quantumGrey-300' : 'text-gray-700'
                }`}>
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full rounded-lg px-4 py-2 transition-colors ${
                    metaMirrorMode 
                      ? 'bg-deepCosmos-700 border border-deepCosmos-600 text-prismWhite focus:border-metaEmerald-500' 
                      : 'bg-gray-50 border border-gray-200 text-black focus:border-metaEmerald-600 focus:ring-1 focus:ring-metaEmerald-600/20'
                  }`}
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className={`text-sm font-medium mb-1 block ${
                  metaMirrorMode ? 'text-quantumGrey-300' : 'text-gray-700'
                }`}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full rounded-lg px-4 py-2 transition-colors ${
                    metaMirrorMode 
                      ? 'bg-deepCosmos-700 border border-deepCosmos-600 text-prismWhite focus:border-metaEmerald-500' 
                      : 'bg-gray-50 border border-gray-200 text-black focus:border-metaEmerald-600 focus:ring-1 focus:ring-metaEmerald-600/20'
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className={`text-sm font-medium mb-1 block ${
                  metaMirrorMode ? 'text-quantumGrey-300' : 'text-gray-700'
                }`}>
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className={`w-full rounded-lg px-4 py-2 transition-colors ${
                    metaMirrorMode 
                      ? 'bg-deepCosmos-700 border border-deepCosmos-600 text-prismWhite focus:border-metaEmerald-500' 
                      : 'bg-gray-50 border border-gray-200 text-black focus:border-metaEmerald-600 focus:ring-1 focus:ring-metaEmerald-600/20'
                  }`}
                  placeholder="Your country"
                />
              </div>
              
              <div>
                <label className={`text-sm font-medium mb-1 block ${
                  metaMirrorMode ? 'text-quantumGrey-300' : 'text-gray-700'
                }`}>
                  Project Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full rounded-lg px-4 py-2 transition-colors ${
                    metaMirrorMode 
                      ? 'bg-deepCosmos-700 border border-deepCosmos-600 text-prismWhite focus:border-metaEmerald-500' 
                      : 'bg-gray-50 border border-gray-200 text-black focus:border-metaEmerald-600 focus:ring-1 focus:ring-metaEmerald-600/20'
                  }`}
                  placeholder="Tell us more about your project"
                  rows={4}
                />
              </div>
              
              <button
                type="submit"
                className={`w-full font-bold py-3 px-4 rounded-lg mt-6 relative overflow-hidden group ${
                  metaMirrorMode 
                    ? 'bg-metaEmerald-500 text-deepCosmos-900 hover:bg-metaEmerald-400' 
                    : 'bg-gradient-to-r from-black to-gray-900 text-white hover:from-gray-900 hover:to-black'
                }`}
              >
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                />
                <span className="relative z-10">
                  {submitted ? 'Submitted!' : 'Submit'}
                </span>
              </button>
            </form>
            
            <Dialog.Close asChild>
              <button
                className={`absolute top-4 right-4 transition-colors ${
                  metaMirrorMode ? 'text-quantumGrey-300 hover:text-prismWhite' : 'text-gray-500 hover:text-black'
                }`}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};

export default BuildYourQube;