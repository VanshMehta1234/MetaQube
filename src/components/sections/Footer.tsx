import React from "react";
import { Cuboid as Cube } from 'lucide-react';
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
    <footer className={`py-16 transition-colors ${
      metaMirrorMode ? 'bg-deepCosmos-800' : 'bg-deepCosmos-900'
    }`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 text-2xl font-bold text-prismWhite mb-4">
              <Cube className={metaMirrorMode ? "text-metaEmerald-600" : "text-metaEmerald-900"} size={32} />
              <span>METAQUBE</span>
            </div>
            <p className="text-quantumGrey-300 max-w-xs">
              Transcending traditional spaces and accelerate next-generation digital experiences.
            </p>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-prismWhite mb-4">Services</h3>
              <ul className="space-y-2">
                {services.map(service => (
                  <li key={service.id}>
                    <a 
                      href={`/#services`}
                      className={`text-quantumGrey-300 hover:${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-800'} transition-colors`}
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-prismWhite mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-800'} transition-colors`}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-800'} transition-colors`}>
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-800'} transition-colors`}>
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-800'} transition-colors`}>
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-800'} transition-colors`}>
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-prismWhite mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-800'} transition-colors`}>
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-800'} transition-colors`}>
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-800'} transition-colors`}>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-quantumGrey-300 hover:${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-800'} transition-colors`}>
                    Instagram
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className={`text-quantumGrey-300 hover:${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-800'} transition-colors relative inline-block`}
                    onClick={fragment && !fragment.found ? handleFragmentClick : undefined}
                  >
                    {fragment && !fragment.found && (
                      <span className={`absolute w-2 h-2 ${metaMirrorMode ? 'bg-metaEmerald-600' : 'bg-metaEmerald-800'} rounded-full -top-1 -right-1 animate-pulse-glow`}></span>
                    )}
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-deepCosmos-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-quantumGrey-400 text-sm mb-4 md:mb-0">
            © 2025 METAQUBE. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className={`text-quantumGrey-400 hover:${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-800'} text-sm transition-colors`}>
              Privacy Policy
            </a>
            <a href="#" className={`text-quantumGrey-400 hover:${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-800'} text-sm transition-colors`}>
              Terms of Service
            </a>
            <a href="#" className={`text-quantumGrey-400 hover:${metaMirrorMode ? 'text-metaEmerald-600' : 'text-metaEmerald-800'} text-sm transition-colors`}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;