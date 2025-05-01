import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import ServicesPopup from '../ui/ServicesPopup';
import MobileServicesMenu from '../ui/MobileServicesMenu';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { metaMirrorMode } = useAppStore();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  const navLinks = [
    { name: 'Build', href: '#build-qube' },
    { name: 'Work', href: '#frens' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleOpenMobileServices = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(true);
  };
  
  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileMenuOpen 
            ? metaMirrorMode 
              ? 'bg-deepCosmos-900/90 backdrop-blur-md border-b border-metaEmerald-500/40' 
              : 'bg-prismWhite/90 backdrop-blur-md border-b border-metaEmerald-500/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Glowing border effect */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1px] ${
          scrolled || mobileMenuOpen ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500`}>
          <div className={`h-full w-full ${
            metaMirrorMode 
              ? 'bg-gradient-to-r from-transparent via-metaEmerald-500/60 to-transparent' 
              : 'bg-gradient-to-r from-transparent via-metaEmerald-500/40 to-transparent'
          }`}></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.a 
              href="#" 
              className="flex items-center space-x-3 group"
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative">
                <img 
                  src="/logos/METAQUBE ICON PNG.png" 
                  alt="METAQUBE"
                  width={36}
                  height={36} 
                  className="object-contain" 
                />
                <div className={`absolute inset-0 rounded-full blur-lg transition-opacity group-hover:opacity-100 ${
                  metaMirrorMode ? 'bg-metaEmerald-500/30 opacity-50' : 'bg-metaEmerald-500/20 opacity-0'
                }`}></div>
              </div>
              <span className={`text-2xl font-bold tracking-tight ${
                metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
              }`}>METAQUBE</span>
            </motion.a>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-8">
                <ServicesPopup />
                
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={`relative font-medium text-lg transition-colors overflow-hidden ${
                      metaMirrorMode ? 'text-prismWhite/90' : 'text-deepCosmos-900/90'
                    } hover:text-metaEmerald-500`}
                    whileHover={{ y: -2 }}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 ease-in-out group-hover:w-full ${
                      metaMirrorMode ? 'bg-metaEmerald-500' : 'bg-metaEmerald-700'
                    }`}></span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-3 rounded-lg transition-colors ${
                  metaMirrorMode 
                    ? 'text-prismWhite hover:bg-deepCosmos-800' 
                    : 'text-deepCosmos-900 hover:bg-quantumGrey-100'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {mobileMenuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <path d="M4 8h16M4 16h16" />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className={`md:hidden absolute w-full ${
                metaMirrorMode 
                  ? 'bg-deepCosmos-900 border-b border-metaEmerald-500/20' 
                  : 'bg-prismWhite border-b border-quantumGrey-200'
              }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col space-y-4">
                  <motion.button
                    className={`text-left font-medium py-3 px-4 rounded-lg transition-all ${
                      metaMirrorMode 
                        ? 'text-prismWhite/90 hover:bg-metaEmerald-500/10 hover:text-metaEmerald-500' 
                        : 'text-deepCosmos-900/90 hover:bg-metaEmerald-500/5 hover:text-metaEmerald-700'
                    }`}
                    onClick={handleOpenMobileServices}
                    whileHover={{ x: 5 }}
                  >
                    Services
                  </motion.button>
                  
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className={`font-medium py-3 px-4 rounded-lg transition-all ${
                        metaMirrorMode 
                          ? 'text-prismWhite/90 hover:bg-metaEmerald-500/10 hover:text-metaEmerald-500' 
                          : 'text-deepCosmos-900/90 hover:bg-metaEmerald-500/5 hover:text-metaEmerald-700'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Services Menu */}
      <MobileServicesMenu 
        isOpen={mobileServicesOpen} 
        onClose={() => setMobileServicesOpen(false)} 
      />
    </>
  );
};

export default Navbar;