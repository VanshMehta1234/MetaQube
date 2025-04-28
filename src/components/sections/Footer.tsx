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
  
  // Service data
  const services = [
    { name: "Web3 Development", id: "web3" },
    { name: "Brand Design", id: "brand" },
    { name: "Dev Sprints", id: "sprints" },
    { name: "Metaverse Consulting", id: "metaverse" },
    { name: "AI Integration", id: "ai" }
  ];
  
  return (
    <footer className={`pt-16 pb-10 transition-colors relative ${
      metaMirrorMode ? 'bg-deepCosmos-800' : 'bg-deepCosmos-900'
    }`}>
      {/* Background gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Company info and contact */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="flex items-center space-x-2 text-2xl font-bold text-prismWhite mb-4">
              <Cube className={metaMirrorMode ? "text-metaEmerald-500" : "text-metaEmerald-600"} size={32} />
              <span>METAQUBE</span>
            </div>
            
            <p className="text-quantumGrey-300 mb-5 max-w-md">
              Transcending traditional spaces and accelerating next-generation digital experiences.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className={`${metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-600'} flex-shrink-0 mt-1`} size={18} />
                <div className="text-quantumGrey-300">
                  <p>123 Innovation Way,</p>
                  <p>Tech District, San Francisco,</p>
                  <p>CA 94105, United States</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className={`${metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-600'} flex-shrink-0`} size={18} />
                <a href="tel:+14155552671" className="text-quantumGrey-300 hover:text-metaEmerald-500 transition-colors">
                  +1 (415) 555-2671
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className={`${metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-600'} flex-shrink-0`} size={18} />
                <a href="mailto:hello@metaqube.com" className="text-quantumGrey-300 hover:text-metaEmerald-500 transition-colors">
                  hello@metaqube.com
                </a>
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex space-x-3 mt-6">
              <a 
                href="#" 
                className={`p-2 rounded-full ${metaMirrorMode ? 'bg-deepCosmos-700 hover:bg-deepCosmos-600' : 'bg-deepCosmos-800 hover:bg-deepCosmos-700'} transition-colors`}
                aria-label="Twitter"
              >
                <Twitter size={16} className={metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-600'} />
              </a>
              <a 
                href="#" 
                className={`p-2 rounded-full ${metaMirrorMode ? 'bg-deepCosmos-700 hover:bg-deepCosmos-600' : 'bg-deepCosmos-800 hover:bg-deepCosmos-700'} transition-colors`}
                aria-label="LinkedIn"
              >
                <Linkedin size={16} className={metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-600'} />
              </a>
              <a 
                href="#" 
                className={`p-2 rounded-full ${metaMirrorMode ? 'bg-deepCosmos-700 hover:bg-deepCosmos-600' : 'bg-deepCosmos-800 hover:bg-deepCosmos-700'} transition-colors`}
                aria-label="Instagram"
              >
                <Instagram size={16} className={metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-600'} />
              </a>
              <a 
                href="#" 
                className={`p-2 rounded-full ${metaMirrorMode ? 'bg-deepCosmos-700 hover:bg-deepCosmos-600' : 'bg-deepCosmos-800 hover:bg-deepCosmos-700'} transition-colors`}
                aria-label="Discord"
              >
                <MessageSquare size={16} className={metaMirrorMode ? 'text-metaEmerald-500' : 'text-metaEmerald-600'} />
              </a>
            </div>
          </div>
          
          {/* Navigation links */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-base font-bold text-prismWhite mb-4 pb-2 border-b border-deepCosmos-700">Services</h3>
              <ul className="space-y-2.5">
                {services.map(service => (
                  <li key={service.id}>
                    <a 
                      href={`/#services`}
                      className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors flex items-center`}
                    >
                      <span className="hover:translate-x-1 transition-transform inline-block">
                        {service.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-base font-bold text-prismWhite mb-4 pb-2 border-b border-deepCosmos-700">Company</h3>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors`}>
                    <span className="hover:translate-x-1 transition-transform inline-block">
                      About Us
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors`}>
                    <span className="hover:translate-x-1 transition-transform inline-block">
                      Team
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors`}>
                    <span className="hover:translate-x-1 transition-transform inline-block">
                      Careers
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors`}>
                    <span className="hover:translate-x-1 transition-transform inline-block">
                      Press
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors`}>
                    <span className="hover:translate-x-1 transition-transform inline-block">
                      Blog
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base font-bold text-prismWhite mb-4 pb-2 border-b border-deepCosmos-700">Connect</h3>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors`}>
                    <span className="hover:translate-x-1 transition-transform inline-block">
                      Twitter
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors`}>
                    <span className="hover:translate-x-1 transition-transform inline-block">
                      Discord
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors`}>
                    <span className="hover:translate-x-1 transition-transform inline-block">
                      LinkedIn
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors`}>
                    <span className="hover:translate-x-1 transition-transform inline-block">
                      Instagram
                    </span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className={`text-quantumGrey-300 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} transition-colors relative inline-block`}
                    onClick={fragment && !fragment.found ? handleFragmentClick : undefined}
                  >
                    {fragment && !fragment.found && (
                      <span className={`absolute w-2 h-2 ${metaMirrorMode ? 'bg-metaEmerald-500' : 'bg-metaEmerald-600'} rounded-full -top-1 -right-1 animate-pulse-glow`}></span>
                    )}
                    <span className="hover:translate-x-1 transition-transform inline-block">
                      Newsletter
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-deepCosmos-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-quantumGrey-400 text-sm mb-4 md:mb-0">
            © 2025 METAQUBE. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-5">
            <a href="#" className={`text-quantumGrey-400 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} text-sm transition-colors`}>
              Privacy Policy
            </a>
            <a href="#" className={`text-quantumGrey-400 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} text-sm transition-colors`}>
              Terms of Service
            </a>
            <a href="#" className={`text-quantumGrey-400 hover:text-metaEmerald-${metaMirrorMode ? '500' : '600'} text-sm transition-colors`}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;