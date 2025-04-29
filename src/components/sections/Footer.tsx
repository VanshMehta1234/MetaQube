import React from "react";
import { Cuboid as Cube, MapPin, Phone, Mail, Twitter, Linkedin, Instagram, MessageSquare, ChevronRight } from 'lucide-react';
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
  
  // Service data
  const services = [
    { name: "Web3 Development", id: "web3" },
    { name: "Brand Design", id: "brand" },
    { name: "Dev Sprints", id: "sprints" },
    { name: "Metaverse Consulting", id: "metaverse" },
    { name: "AI Integration", id: "ai" }
  ];
  
  return (
    <footer className={`pt-14 pb-8 transition-colors relative ${
      metaMirrorMode ? 'bg-deepCosmos-900' : 'bg-deepCosmos-950'
    }`}>
      {/* Background gradient with subtle glowing effect */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-metaEmerald-800/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-8">
          {/* Company info and contact */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="flex items-center space-x-3 text-xl font-bold text-prismWhite mb-4">
              <Cube className={metaMirrorMode ? "text-metaEmerald-500" : "text-metaEmerald-600"} size={28} />
              <span className="tracking-wide">METAQUBE</span>
            </div>
            
            <p className="text-quantumGrey-300 mb-4 max-w-md text-sm leading-relaxed">
              Transcending traditional spaces and accelerating next-generation digital experiences.
            </p>
            
            <div className="space-y-2.5 mt-5">
              <div className="flex items-start space-x-4 group">
                <MapPin className={`${metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-600'} flex-shrink-0 mt-0.5 group-hover:text-metaEmerald-400 transition-colors`} size={16} />
                <div className="text-quantumGrey-300 text-sm leading-relaxed">
                  <p>123 Innovation Way, Tech District</p>
                  <p>San Francisco, CA 94105</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 group">
                <Phone className={`${metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-600'} flex-shrink-0 group-hover:text-metaEmerald-400 transition-colors`} size={16} />
                <a href="tel:+14155552671" className="text-quantumGrey-300 hover:text-metaEmerald-500 transition-colors text-sm">
                  +1 (415) 555-2671
                </a>
              </div>
              
              <div className="flex items-center space-x-4 group">
                <Mail className={`${metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-600'} flex-shrink-0 group-hover:text-metaEmerald-400 transition-colors`} size={16} />
                <a href="mailto:hello@metaqube.com" className="text-quantumGrey-300 hover:text-metaEmerald-500 transition-colors text-sm">
                  hello@metaqube.com
                </a>
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex space-x-3 mt-5">
              <a 
                href="#" 
                className={`p-2 rounded-full backdrop-blur-sm ${metaMirrorMode ? 
                'bg-deepCosmos-800/70 hover:bg-metaEmerald-800/30 hover:shadow-glow-sm' : 
                'bg-deepCosmos-800/70 hover:bg-metaEmerald-900/40 hover:shadow-glow-sm'} 
                transition-all duration-300`}
                aria-label="Twitter"
              >
                <Twitter size={14} className={`${metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-600'} group-hover:text-metaEmerald-400`} />
              </a>
              <a 
                href="#" 
                className={`p-2 rounded-full backdrop-blur-sm ${metaMirrorMode ? 
                'bg-deepCosmos-800/70 hover:bg-metaEmerald-800/30 hover:shadow-glow-sm' : 
                'bg-deepCosmos-800/70 hover:bg-metaEmerald-900/40 hover:shadow-glow-sm'} 
                transition-all duration-300`}
                aria-label="LinkedIn"
              >
                <Linkedin size={14} className={`${metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-600'} group-hover:text-metaEmerald-400`} />
              </a>
              <a 
                href="#" 
                className={`p-2 rounded-full backdrop-blur-sm ${metaMirrorMode ? 
                'bg-deepCosmos-800/70 hover:bg-metaEmerald-800/30 hover:shadow-glow-sm' : 
                'bg-deepCosmos-800/70 hover:bg-metaEmerald-900/40 hover:shadow-glow-sm'} 
                transition-all duration-300`}
                aria-label="Instagram"
              >
                <Instagram size={14} className={`${metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-600'} group-hover:text-metaEmerald-400`} />
              </a>
              <a 
                href="#" 
                className={`p-2 rounded-full backdrop-blur-sm ${metaMirrorMode ? 
                'bg-deepCosmos-800/70 hover:bg-metaEmerald-800/30 hover:shadow-glow-sm' : 
                'bg-deepCosmos-800/70 hover:bg-metaEmerald-900/40 hover:shadow-glow-sm'} 
                transition-all duration-300`}
                aria-label="Discord"
              >
                <MessageSquare size={14} className={`${metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-600'} group-hover:text-metaEmerald-400`} />
              </a>
            </div>
          </div>
          
          {/* Navigation links */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div>
              <h3 className="text-sm uppercase font-bold tracking-wider text-prismWhite mb-3 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-metaEmerald-600/40 after:mt-1.5">Services</h3>
              <ul className="space-y-1.5">
                {services.map(service => (
                  <li key={service.id}>
                    <a 
                      href={`/#services`}
                      className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors flex items-center text-sm group`}
                    >
                      <ChevronRight size={12} className="opacity-0 -ml-4 mr-0 group-hover:opacity-100 group-hover:mr-1 group-hover:-ml-0 transition-all duration-300 text-metaEmerald-600" />
                      <span className="transition-transform duration-300 inline-block">
                        {service.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm uppercase font-bold tracking-wider text-prismWhite mb-3 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-metaEmerald-600/40 after:mt-1.5">Company</h3>
              <ul className="space-y-1.5">
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors flex items-center text-sm group`}>
                    <ChevronRight size={12} className="opacity-0 -ml-4 mr-0 group-hover:opacity-100 group-hover:mr-1 group-hover:-ml-0 transition-all duration-300 text-metaEmerald-600" />
                    <span className="transition-transform duration-300 inline-block">
                      About Us
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors flex items-center text-sm group`}>
                    <ChevronRight size={12} className="opacity-0 -ml-4 mr-0 group-hover:opacity-100 group-hover:mr-1 group-hover:-ml-0 transition-all duration-300 text-metaEmerald-600" />
                    <span className="transition-transform duration-300 inline-block">
                      Team
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors flex items-center text-sm group`}>
                    <ChevronRight size={12} className="opacity-0 -ml-4 mr-0 group-hover:opacity-100 group-hover:mr-1 group-hover:-ml-0 transition-all duration-300 text-metaEmerald-600" />
                    <span className="transition-transform duration-300 inline-block">
                      Careers
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors flex items-center text-sm group`}>
                    <ChevronRight size={12} className="opacity-0 -ml-4 mr-0 group-hover:opacity-100 group-hover:mr-1 group-hover:-ml-0 transition-all duration-300 text-metaEmerald-600" />
                    <span className="transition-transform duration-300 inline-block">
                      Press
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors flex items-center text-sm group`}>
                    <ChevronRight size={12} className="opacity-0 -ml-4 mr-0 group-hover:opacity-100 group-hover:mr-1 group-hover:-ml-0 transition-all duration-300 text-metaEmerald-600" />
                    <span className="transition-transform duration-300 inline-block">
                      Blog
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm uppercase font-bold tracking-wider text-prismWhite mb-3 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-metaEmerald-600/40 after:mt-1.5">Connect</h3>
              <ul className="space-y-1.5">
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors flex items-center text-sm group`}>
                    <ChevronRight size={12} className="opacity-0 -ml-4 mr-0 group-hover:opacity-100 group-hover:mr-1 group-hover:-ml-0 transition-all duration-300 text-metaEmerald-600" />
                    <span className="transition-transform duration-300 inline-block">
                      Twitter
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors flex items-center text-sm group`}>
                    <ChevronRight size={12} className="opacity-0 -ml-4 mr-0 group-hover:opacity-100 group-hover:mr-1 group-hover:-ml-0 transition-all duration-300 text-metaEmerald-600" />
                    <span className="transition-transform duration-300 inline-block">
                      Discord
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors flex items-center text-sm group`}>
                    <ChevronRight size={12} className="opacity-0 -ml-4 mr-0 group-hover:opacity-100 group-hover:mr-1 group-hover:-ml-0 transition-all duration-300 text-metaEmerald-600" />
                    <span className="transition-transform duration-300 inline-block">
                      LinkedIn
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors flex items-center text-sm group`}>
                    <ChevronRight size={12} className="opacity-0 -ml-4 mr-0 group-hover:opacity-100 group-hover:mr-1 group-hover:-ml-0 transition-all duration-300 text-metaEmerald-600" />
                    <span className="transition-transform duration-300 inline-block">
                      Instagram
                    </span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors relative flex items-center text-sm group`}
                    onClick={fragment && !fragment.found ? handleFragmentClick : undefined}
                  >
                    <ChevronRight size={12} className="opacity-0 -ml-4 mr-0 group-hover:opacity-100 group-hover:mr-1 group-hover:-ml-0 transition-all duration-300 text-metaEmerald-600" />
                    {fragment && !fragment.found && (
                      <span className={`absolute w-1.5 h-1.5 ${metaMirrorMode ? 'bg-metaEmerald-500' : 'bg-metaEmerald-600'} rounded-full -top-1 -right-2 shadow-glow-xs animate-pulse-glow`}></span>
                    )}
                    <span className="transition-transform duration-300 inline-block">
                      Newsletter
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-5 border-t border-deepCosmos-700/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-quantumGrey-500 text-sm mb-4 md:mb-0 tracking-wide">
            © 2025 METAQUBE. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <a href="#" className={`text-quantumGrey-500 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} text-sm tracking-wide transition-colors`}>
              Privacy Policy
            </a>
            <a href="#" className={`text-quantumGrey-500 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} text-sm tracking-wide transition-colors`}>
              Terms of Service
            </a>
            <a href="#" className={`text-quantumGrey-500 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} text-sm tracking-wide transition-colors`}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;