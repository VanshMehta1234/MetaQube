import React from "react";
import { MapPin, Phone, Mail, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

// Custom Twitter/X icon component
const TwitterXIcon = ({ size = 22, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

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
    <footer className={`py-12 transition-colors relative ${
      metaMirrorMode ? 'bg-deepCosmos-900' : 'bg-deepCosmos-950'
    }`}>
      {/* Background gradient with subtle glowing effect */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-metaEmerald-800/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Column 1: Contact Information */}
          <div>
            <h3 className="text-base uppercase font-bold tracking-wider text-prismWhite mb-6 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-metaEmerald-700/40 after:mt-1.5">
              Contact Us
            </h3>
            
            <div className="space-y-5">
              <div className="flex items-start space-x-3 group">
                <MapPin className={`${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'} flex-shrink-0 mt-1 group-hover:text-metaEmerald-500 transition-colors`} size={18} />
                <div className="text-quantumGrey-300">
                  <p className="text-base font-medium mb-1">India Address</p>
                  <p className="text-base leading-relaxed">
                  7th floor, Shri kamal Heights, Aerodram Road
                  </p>
                  <p className="text-base leading-relaxed">
                   Near Muni dery, Bhavnagar 364001, Gujarat, India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 group">
                <MapPin className={`${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'} flex-shrink-0 mt-1 group-hover:text-metaEmerald-500 transition-colors`} size={18} />
                <div className="text-quantumGrey-300">
                  <p className="text-base font-medium mb-1">USA Address</p>
                  <p className="text-base leading-relaxed">
                   550 S hill st, STE 605, Los Angeles, CA, 90013
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <Phone className={`${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'} flex-shrink-0 group-hover:text-metaEmerald-500 transition-colors`} size={18} />
                <a href="tel:+919054907333" className="text-quantumGrey-300 hover:text-metaEmerald-600 transition-colors text-base">
                  +91 905 490 7333
                </a>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <Mail className={`${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'} flex-shrink-0 group-hover:text-metaEmerald-500 transition-colors`} size={18} />
                <a href="mailto:info@metaqube.xyz" className="text-quantumGrey-300 hover:text-metaEmerald-600 transition-colors text-base">
                  info@metaqube.xyz
                </a>
              </div>
            </div>
          </div>
          
          {/* Column 2: Social Media */}
          <div className="md:flex md:flex-col">
            <h3 className="text-base uppercase font-bold tracking-wider text-prismWhite mb-6 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-metaEmerald-700/40 after:mt-1.5 text-center md:text-center">
              Connect With Us
            </h3>
            
            {/* Social Media Icons - Horizontal Display */}
            <div className="grid grid-cols-3 gap-6 justify-items-center">
              <a 
                href="https://instagram.com/metaqubexyz" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center transition-all duration-300"
                aria-label="Instagram"
              >
                <div className="bg-deepCosmos-800/50 hover:bg-metaEmerald-900/20 p-3 rounded-full mb-2 transition-all duration-300 shadow-sm">
                  <Instagram 
                    size={22} 
                    className={`${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'} group-hover:text-metaEmerald-500 transition-all duration-300`} 
                  />
                </div>
                <span className="text-quantumGrey-300 text-sm group-hover:text-metaEmerald-500 transition-colors">
                  Instagram
                </span>
              </a>
              
              <a 
                href="https://x.com/metaqubexyz" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center transition-all duration-300"
                aria-label="Twitter/X"
                onClick={fragment && !fragment.found ? handleFragmentClick : undefined}
              >
                <div className="bg-deepCosmos-800/50 hover:bg-metaEmerald-900/20 p-3 rounded-full mb-2 relative transition-all duration-300 shadow-sm">
                  <TwitterXIcon
                    size={22} 
                    className={`${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'} group-hover:text-metaEmerald-500 transition-all duration-300`} 
                  />
                  {fragment && !fragment.found && (
                    <span className={`absolute w-2 h-2 ${metaMirrorMode ? 'bg-metaEmerald-600' : 'bg-metaEmerald-700'} rounded-full -top-1 -right-1 shadow-glow-xs animate-pulse-glow`}></span>
                  )}
                </div>
                <span className="text-quantumGrey-300 text-sm group-hover:text-metaEmerald-500 transition-colors">
                  Twitter/X
                </span>
              </a>
              
              <a 
                href="https://linkedin.com/company/metaqubexyz" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center transition-all duration-300"
                aria-label="LinkedIn"
              >
                <div className="bg-deepCosmos-800/50 hover:bg-metaEmerald-900/20 p-3 rounded-full mb-2 transition-all duration-300 shadow-sm">
                  <Linkedin 
                    size={22} 
                    className={`${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-700'} group-hover:text-metaEmerald-500 transition-all duration-300`} 
                  />
                </div>
                <span className="text-quantumGrey-300 text-sm group-hover:text-metaEmerald-500 transition-colors">
                  LinkedIn
                </span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 mt-6 border-t border-deepCosmos-700/30 text-center">
          <p className="text-quantumGrey-500 text-sm tracking-wide">
            © 2025 METAQUBE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;