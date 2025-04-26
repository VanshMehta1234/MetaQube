import React from 'react';
import { motion } from 'framer-motion';
import { Cuboid as Cube, Cpu, Brush, Rocket, Building, Gem } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceProps> = ({ icon, title, description }) => {
  const { metaMirrorMode } = useAppStore();
  
  return (
    <motion.div 
      className={`p-6 rounded-lg border transition-all ${
        metaMirrorMode 
          ? 'bg-deepCosmos-800 border-deepCosmos-700 hover:border-metaEmerald-700' 
          : 'bg-prismWhite border-quantumGrey-200 hover:border-metaEmerald-300'
      }`}
      whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
    >
      <div className="w-12 h-12 rounded-full bg-metaEmerald-500 bg-opacity-20 flex items-center justify-center mb-4">
        <div className="text-metaEmerald-500">
          {icon}
        </div>
      </div>
      
      <h3 className={`text-xl font-bold mb-2 ${
        metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
      }`}>
        {title}
      </h3>
      
      <p className={`${
        metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
      }`}>
        {description}
      </p>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const { metaMirrorMode, easterEggFragments, findEasterEggFragment } = useAppStore();
  const fragment = easterEggFragments.find(f => f.id === 'fragment1');
  
  // Easter egg fragment
  const handleFragmentClick = () => {
    if (fragment && !fragment.found) {
      findEasterEggFragment('fragment1');
    }
  };
  
  return (
    <section 
      id="services" 
      className={`py-24 transition-colors ${
        metaMirrorMode ? 'bg-deepCosmos-800' : 'bg-quantumGrey-50'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <h2 className={`text-4xl font-bold mb-4 ${
            metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
          }`}>
            Our <span className="text-metaEmerald-500">Services</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
          }`}>
            We help brands and creators accelerate next-generation digital experiences.
          </p>
          
          {/* Hidden easter egg fragment */}
          {fragment && !fragment.found && (
            <motion.div 
              className="absolute top-0 right-0 w-3 h-3 cursor-pointer"
              whileHover={{ scale: 1.5 }}
              onClick={handleFragmentClick}
            >
              <div className="w-full h-full bg-metaEmerald-500 opacity-50 animate-pulse-glow"></div>
            </motion.div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Cube size={24} />}
            title="Web3 Development"
            description="Build decentralized applications, smart contracts, and blockchain solutions that redefine digital ownership and interaction."
          />
          
          <ServiceCard 
            icon={<Brush size={24} />}
            title="Brand Consultation"
            description="Create a cohesive digital identity that transcends traditional spaces and resonates with your audience across platforms."
          />
          
          <ServiceCard 
            icon={<Rocket size={24} />}
            title="Dev Sprints"
            description="Accelerate your development cycle with our expert team of engineers and designers to launch your product faster."
          />
          
          <ServiceCard 
            icon={<Building size={24} />}
            title="Metaverse Experiences"
            description="Design and develop immersive digital experiences that bridge the gap between the physical and virtual worlds. AR/VR , Sandbox, Decentraland, Realestate etc"
          />
          
          <ServiceCard 
            icon={<Cpu size={24} />}
            title="AI Development"
            description="Implement cutting-edge AI technologies to enhance user experiences and automate complex processes."
          />
          
          <ServiceCard 
            icon={<Gem size={24} />}
            title="Digital Transformation"
            description="Transform your business with Blockchain and AI solutions that drive growth and operational efficiency."
          />
        </div>
      </div>
    </section>
  );
};

export default Services;