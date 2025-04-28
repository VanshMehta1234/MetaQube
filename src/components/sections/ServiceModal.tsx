import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

// Define SubCategory interface
interface SubCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
}

// Define ServiceDetails interface
export interface ServiceDetails {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  subcategories: SubCategory[];
}

// Define ServiceModalProps
interface ServiceModalProps {
  service: ServiceDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
  const { metaMirrorMode } = useAppStore();
  
  if (!service) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Container - ensures perfect centering */}
          <div className="fixed inset-0 overflow-auto z-50 flex items-center justify-center p-4">
            {/* Modal */}
            <motion.div 
              className={`w-full max-w-3xl rounded-xl shadow-2xl flex flex-col ${
                metaMirrorMode ? 'bg-deepCosmos-800' : 'bg-prismWhite'
              }`}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              style={{ maxHeight: 'calc(100vh - 2rem)' }}
            >
              {/* Modal header */}
              <div className={`flex-shrink-0 sticky top-0 z-10 p-4 sm:p-5 border-b ${
                metaMirrorMode ? 'border-deepCosmos-700 bg-deepCosmos-800' : 'border-quantumGrey-200 bg-prismWhite'
              }`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                      metaMirrorMode ? 'bg-deepCosmos-700' : 'bg-metaEmerald-100'
                    }`}>
                      <div className="text-metaEmerald-500">
                        {service.icon}
                      </div>
                    </div>
                    <h2 className={`text-lg sm:text-xl md:text-2xl font-bold truncate ${
                      metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
                    }`}>
                      {service.title}
                    </h2>
                  </div>
                  <button 
                    onClick={onClose}
                    className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ml-2 ${
                      metaMirrorMode 
                        ? 'hover:bg-deepCosmos-700 text-quantumGrey-300 hover:text-prismWhite' 
                        : 'hover:bg-quantumGrey-100 text-deepCosmos-600 hover:text-deepCosmos-900'
                    }`}
                  >
                    <X size={18} />
                  </button>
                </div>
                <p className={`mt-2 text-sm sm:text-base ${
                  metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
                }`}>
                  {service.description}
                </p>
              </div>
              
              {/* Modal body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                <h3 className={`text-base sm:text-lg md:text-xl font-semibold mb-4 ${
                  metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
                }`}>
                  Specialized Services
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {service.subcategories.map((subcat, idx) => (
                    <motion.div 
                      key={idx}
                      className={`p-3 sm:p-4 rounded-lg border ${
                        metaMirrorMode 
                          ? 'bg-deepCosmos-700 border-deepCosmos-600 hover:border-metaEmerald-700' 
                          : 'bg-quantumGrey-50 border-quantumGrey-200 hover:border-metaEmerald-300'
                      }`}
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                          metaMirrorMode ? 'bg-deepCosmos-800' : 'bg-metaEmerald-100'
                        }`}>
                          <div className="text-metaEmerald-500 scale-90 sm:scale-100">
                            {subcat.icon}
                          </div>
                        </div>
                        <h4 className={`font-medium text-sm sm:text-base ${
                          metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
                        }`}>
                          {subcat.title}
                        </h4>
                      </div>
                      <p className={`text-xs sm:text-sm ${
                        metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
                      }`}>
                        {subcat.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Modal footer */}
              <div className={`flex-shrink-0 sticky bottom-0 p-4 sm:p-5 border-t ${
                metaMirrorMode ? 'border-deepCosmos-700 bg-deepCosmos-800' : 'border-quantumGrey-200 bg-prismWhite'
              }`}>
                <div className="flex justify-end">
                  <button 
                    onClick={onClose}
                    className={`px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg font-medium transition-colors ${
                      metaMirrorMode
                        ? 'bg-metaEmerald-600 hover:bg-metaEmerald-700 text-prismWhite'
                        : 'bg-metaEmerald-500 hover:bg-metaEmerald-600 text-prismWhite'
                    }`}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal; 