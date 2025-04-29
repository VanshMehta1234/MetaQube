import React from "react";
import { Cuboid as Cube, MapPin, Phone, Mail, Twitter, Linkedin, Instagram, MessageSquare } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const Footer: React.FC = () => {
  const { metaMirrorMode, easterEggFragments, findEasterEggFragment, allFragmentsFound } = useAppStore();
  const fragment = easterEggFragments.find((f: { id: string }) => f.id === 'fragment3');
  
  // Easter egg fragment in footer
  const handleFragmentClick = () => {
    if (fragment && !fragment.found) {
      findEasterEggFragment('fragment3');
      
      // Check if all fragments are found
      if (allFragmentsFound()) {
        // Show easter egg reward
        alert('Congratulations! You found all the Meta fragments! You are now a Meta Explorer.');
      }
    }
  };
  
  return (
    <footer className={`pt-14 pb-8 transition-colors relative ${
      metaMirrorMode ? 'bg-deepCosmos-900' : 'bg-deepCosmos-950'
    }`}>
      {/* Background gradient with subtle glowing effect */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-metaEmerald-800/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-8 mb-8">
          {/* Column 1: Company info */}
          <div className="md:col-span-4">
            <div className="flex items-center space-x-3 text-xl font-bold text-prismWhite mb-4">
              <Cube className={metaMirrorMode ? "text-metaEmerald-600" : "text-metaEmerald-700"} size={28} />
              <span className="tracking-wide">METAQUBE</span>
            </div>
            
            <p className="text-quantumGrey-300 mb-4 text-base leading-relaxed">
              Transcending traditional spaces and accelerating next-generation digital experiences.
            </p>
            
            <p className="text-quantumGrey-300 text-base">
              Your journey into the metaverse begins here. Let's build a digital tomorrow, today.
            </p>
          </div>
          
          {/* Column 2: Contact information */}
          <div className="md:col-span-4">
            <h3 className="text-base uppercase font-bold tracking-wider text-prismWhite mb-4 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-metaEmerald-700/40 after:mt-1.5">Contact Us</h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3 group">
                <MapPin className={`${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'} flex-shrink-0 mt-0.5 group-hover:text-metaEmerald-500 transition-colors`} size={18} />
                <div className="text-quantumGrey-300 text-base leading-relaxed">
                  <p>123 Innovation Way, Tech District</p>
                  <p>San Francisco, CA 94105</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <Phone className={`${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'} flex-shrink-0 group-hover:text-metaEmerald-500 transition-colors`} size={18} />
                <a href="tel:+14155552671" className="text-quantumGrey-300 hover:text-metaEmerald-600 transition-colors text-base">
                  +1 (415) 555-2671
                </a>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <Mail className={`${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'} flex-shrink-0 group-hover:text-metaEmerald-500 transition-colors`} size={18} />
                <a href="mailto:hello@metaqube.com" className="text-quantumGrey-300 hover:text-metaEmerald-600 transition-colors text-base">
                  hello@metaqube.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Column 3: Social Media */}
          <div className="md:col-span-3">
            <h3 className="text-base uppercase font-bold tracking-wider text-prismWhite mb-4 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-metaEmerald-700/40 after:mt-1.5">Connect With Us</h3>
            
            <div className="space-y-3">
              <a href="#" className="text-quantumGrey-300 hover:text-metaEmerald-600 transition-colors flex items-center text-base group">
                <Twitter size={18} className={`mr-3 ${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'}`} />
                <span className="transition-transform duration-300 inline-block group-hover:translate-x-1">
                  Twitter
                </span>
              </a>
              
              <a href="#" className="text-quantumGrey-300 hover:text-metaEmerald-600 transition-colors flex items-center text-base group">
                <MessageSquare size={18} className={`mr-3 ${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'}`} />
                <span className="transition-transform duration-300 inline-block group-hover:translate-x-1">
                  Discord
                </span>
              </a>
              
              <a href="#" className="text-quantumGrey-300 hover:text-metaEmerald-600 transition-colors flex items-center text-base group">
                <Linkedin size={18} className={`mr-3 ${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'}`} />
                <span className="transition-transform duration-300 inline-block group-hover:translate-x-1">
                  LinkedIn
                </span>
              </a>
              
              <a href="#" className="text-quantumGrey-300 hover:text-metaEmerald-600 transition-colors flex items-center text-base group">
                <Instagram size={18} className={`mr-3 ${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'}`} />
                <span className="transition-transform duration-300 inline-block group-hover:translate-x-1">
                  Instagram
                </span>
              </a>
              
              <a 
                href="#" 
                className="text-quantumGrey-300 hover:text-metaEmerald-600 transition-colors relative flex items-center text-base group"
                onClick={fragment && !fragment.found ? handleFragmentClick : undefined}
              >
                <Mail size={18} className={`mr-3 ${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'}`} />
                {fragment && !fragment.found && (
                  <span className={`absolute w-2 h-2 ${metaMirrorMode ? 'bg-metaEmerald-600' : 'bg-metaEmerald-700'} rounded-full -top-1 right-1 shadow-glow-xs animate-pulse-glow`}></span>
                )}
                <span className="transition-transform duration-300 inline-block group-hover:translate-x-1">
                  Newsletter
                </span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-5 border-t border-deepCosmos-700/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-quantumGrey-500 text-base mb-4 md:mb-0 tracking-wide">
            © 2025 METAQUBE. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <a href="#" className="text-quantumGrey-500 hover:text-metaEmerald-600 text-base tracking-wide transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-quantumGrey-500 hover:text-metaEmerald-600 text-base tracking-wide transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-quantumGrey-500 hover:text-metaEmerald-600 text-base tracking-wide transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;