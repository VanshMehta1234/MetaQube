import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import ScheduleCallDialog from '../ui/ScheduleCallDialog';

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
      className={`py-24 transition-colors relative overflow-hidden ${
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
        <div className="relative z-10 max-w-4xl mx-auto bg-gradient-to-br from-metaEmerald-500/20 to-transparent p-12 rounded-2xl border border-metaEmerald-500/30">
          <div className="text-center mb-8">
            <motion.h2 
              className="text-4xl font-bold mb-4 text-prismWhite"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to <span className="text-metaEmerald-500">Transcend</span>?
            </motion.h2>
            <motion.p 
              className="text-lg text-quantumGrey-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Let's build something extraordinary together. Reach out and let's start the conversation.
            </motion.p>
            
            {fragment && !fragment.found && (
              <motion.div 
                className="absolute top-12 right-12 w-3 h-3 cursor-pointer"
                whileHover={{ scale: 1.5 }}
                onClick={handleFragmentClick}
              >
                <div className="w-full h-full bg-metaEmerald-500 opacity-50 animate-pulse-glow" />
              </motion.div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.a
              href="mailto:hello@metaqube.com"
              className="bg-metaEmerald-500 text-deepCosmos-900 px-8 py-4 rounded-lg text-center text-lg font-bold hover:bg-metaEmerald-400 transition-all relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              Email Us
            </motion.a>
            
            <motion.button
              onClick={() => setScheduleDialogOpen(true)}
              className="bg-transparent border-2 border-metaEmerald-500 text-metaEmerald-500 px-8 py-4 rounded-lg text-center text-lg font-bold hover:bg-metaEmerald-500/10 transition-all relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-metaEmerald-500 opacity-0 group-hover:opacity-5 transition-opacity" />
              Schedule a Call
            </motion.button>
          </div>
        </div>
      </div>
      
      <ScheduleCallDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
      />
    </section>
  );
};

export default ContactCTA;