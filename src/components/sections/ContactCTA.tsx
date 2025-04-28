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
      className={`py-16 sm:py-20 transition-colors relative overflow-hidden ${
        metaMirrorMode ? 'bg-deepCosmos-700' : 'bg-deepCosmos-900'
      }`}
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric shapes */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{
              width: '200px',
              height: '200px',
              border: '1px solid rgba(26, 209, 181, 0.2)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
        
        {/* Electric particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-metaEmerald-500"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.7, 0.3],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-4xl mx-auto bg-gradient-to-br from-deepCosmos-600/40 to-transparent backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-metaEmerald-500/30 shadow-xl shadow-metaEmerald-500/5"
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
            
          <div className="text-center">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold mb-3 text-prismWhite"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to <span className="text-metaEmerald-500 bg-clip-text bg-gradient-to-r from-metaEmerald-400 to-metaEmerald-600">Transcend</span>?
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg text-quantumGrey-300 max-w-2xl mx-auto mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Let's build something extraordinary together.
            </motion.p>
          </div>
            
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <motion.a
              href="mailto:hello@metaqube.com"
              className="bg-metaEmerald-500 text-deepCosmos-900 px-5 sm:px-6 py-2.5 rounded-lg text-center text-base font-bold hover:bg-metaEmerald-400 transition-all relative overflow-hidden group w-full sm:w-auto flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail className="w-4 h-4" />
              <span>Email Us</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.a>
              
            <motion.button
              onClick={() => setScheduleDialogOpen(true)}
              className="bg-transparent border-2 border-metaEmerald-500 text-metaEmerald-500 px-5 sm:px-6 py-2.5 rounded-lg text-center text-base font-bold hover:bg-metaEmerald-500/10 transition-all relative overflow-hidden group w-full sm:w-auto flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule a Call</span>
              <div className="absolute inset-0 bg-metaEmerald-500 opacity-0 group-hover:opacity-5 transition-opacity" />
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