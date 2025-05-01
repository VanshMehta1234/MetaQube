import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import ScheduleCallDialog from '../ui/ScheduleCallDialog';
import { Mail, Calendar } from 'lucide-react';

const ContactCTA: React.FC = () => {
  const { metaMirrorMode, easterEggFragments, findEasterEggFragment } = useAppStore();
  const fragment = easterEggFragments.find(f => f.id === 'fragment2');
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  
  const handleFragmentClick = () => {
    if (fragment && !fragment.found) {
      findEasterEggFragment('fragment2');
    }
  };
  
  return (
    <section 
      id="contact" 
      className={`py-16 sm:py-24 md:py-28 transition-colors relative overflow-hidden ${
        metaMirrorMode ? 'bg-deepCosmos-700' : 'bg-deepCosmos-900'
      }`}
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric shapes */}
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{
              width: `${Math.random() * 100 + 150}px`,
              height: `${Math.random() * 100 + 150}px`,
              border: '1px solid rgba(26, 209, 181, 0.2)',
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              borderRadius: Math.random() > 0.5 ? ['0%', '50%', '0%'] : ['50%', '0%', '50%'],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
        
        {/* Electric particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute bg-metaEmerald-500"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.7, 0.3],
              y: [0, -30 - Math.random() * 30, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
        
        {/* Subtle glow points */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-metaEmerald-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-metaEmerald-500/10 blur-3xl rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-4xl mx-auto bg-gradient-to-br from-deepCosmos-600/40 to-transparent backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl border border-metaEmerald-500/30 shadow-xl shadow-metaEmerald-500/5"
        >
          {/* Easter egg fragment */}
          {fragment && !fragment.found && (
            <motion.div 
              className="absolute top-4 right-4 w-3 h-3 cursor-pointer"
              whileHover={{ scale: 1.5 }}
              onClick={handleFragmentClick}
            >
              <div className="w-full h-full bg-metaEmerald-500 opacity-50 animate-pulse-glow rounded-full" />
            </motion.div>
          )}
            
          <div className="text-center py-2 sm:py-4">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-5 text-prismWhite"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to{" "}
              <motion.span 
                className="text-metaEmerald-500 bg-clip-text bg-gradient-to-r from-metaEmerald-400 to-metaEmerald-600 inline-block"
                animate={{ 
                  scale: [1, 1.05, 1],
                  textShadow: [
                    "0 0 0px rgba(26, 209, 181, 0.3)",
                    "0 0 8px rgba(26, 209, 181, 0.6)",
                    "0 0 0px rgba(26, 209, 181, 0.3)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Transcend
              </motion.span>?
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg text-quantumGrey-300 max-w-2xl mx-auto mb-5 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Let's build something extraordinary together.
            </motion.p>
          </div>
            
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 py-1 sm:py-2">
            <motion.a
              href="mailto:info@metaqube.xyz"
              className="bg-metaEmerald-700 text-deepCosmos-900 px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg text-center text-base font-bold hover:bg-metaEmerald-600 transition-all relative overflow-hidden group w-full sm:w-auto flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Email Us</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.a>
              
            <motion.button
              onClick={() => setScheduleDialogOpen(true)}
              className="bg-transparent border-2 border-metaEmerald-700 text-metaEmerald-700 px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg text-center text-base font-bold hover:bg-metaEmerald-700/10 transition-all relative overflow-hidden group w-full sm:w-auto flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Schedule a Call</span>
              <div className="absolute inset-0 bg-metaEmerald-700 opacity-0 group-hover:opacity-5 transition-opacity" />
            </motion.button>
          </div>
        </motion.div>
        
        {/* Subtle glow effect at the bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-metaEmerald-500/10 blur-3xl rounded-full pointer-events-none"></div>
      </div>
      
      <ScheduleCallDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
      />
    </section>
  );
};

export default ContactCTA;