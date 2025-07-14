import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cuboid as Cube, Cpu, Brush, Rocket, Building, Gem,
  Bitcoin, Code, Network, Users, BarChart, Activity,
  DatabaseIcon, PieChart, Globe, Share2, UserPlus, ShoppingBag,
  Home, ImageIcon, Map, Key, Wrench, Bot, LineChart, Webhook,
  BrainCircuit, BarChart3, Sparkles
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import ServiceModal, { ServiceDetails } from './ServiceModal';

interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

// Service data with subcategories
const serviceData: ServiceDetails[] = [
  {
    id: 'web3',
    title: 'Web3 Development',
    icon: <Cube size={24} />,
    description: 'Build decentralized applications, smart contracts, and blockchain solutions that redefine digital ownership and interaction.',
    subcategories: [
      { title: 'DeFi', icon: <BarChart size={20} />, description: 'Develop decentralized finance applications including lending, trading, and yield optimization platforms.' },
      { title: 'CeFi', icon: <PieChart size={20} />, description: 'Build centralized finance solutions with blockchain integration for traditional financial services.' },
      { title: 'DePIN', icon: <Network size={20} />, description: 'Create decentralized physical infrastructure networks connecting blockchain to the physical world.' },
      { title: 'SocialFi', icon: <Users size={20} />, description: 'Develop social platforms with token incentives and decentralized governance.' },
      { title: 'Ethereum Dapps', icon: <DatabaseIcon size={20} />, description: 'Build applications on Ethereum with smart contracts, tokens, and web3 integration.' },
      { title: 'Solana Dapps', icon: <Activity size={20} />, description: 'Develop high-performance applications leveraging Solana\'s speed and efficiency.' },
      { title: 'EVM Dapps', icon: <Code size={20} />, description: 'Create applications compatible with EVM chains like Polygon, Arbitrum, and Optimism.' },
      { title: 'Blockchain', icon: <Bitcoin size={20} />, description: 'Develop custom blockchain solutions with advanced consensus mechanisms.' }
    ]
  },
  {
    id: 'brand',
    title: 'Brand Consultation',
    icon: <Brush size={24} />,
    description: 'Are you trying to build a web3 or AI brand and don’t know where to start? we can help you from beginning to end. our team is expert in building web3 and AI brands having experience of building 50+ brands.',
    subcategories: [
      { title: 'Community Building', icon: <Users size={20} />, description: 'Develop and nurture engaged communities around your brand or project.' },
      { title: 'Brand Communication', icon: <Globe size={20} />, description: 'Craft consistent messaging that reflects your brand values and resonates with your audience.' },
      { title: 'Web3 Social Media', icon: <Share2 size={20} />, description: 'Leverage decentralized social platforms to build brand presence and engagement.' },
      { title: 'Penetration and Distribution', icon: <BarChart size={20} />, description: 'Develop strategies to expand your brand reach and market presence.' },
      { title: 'Onboarding', icon: <UserPlus size={20} />, description: 'Create seamless user experiences to welcome and guide new users to your platform.' },
      { title: 'Sales', icon: <ShoppingBag size={20} />, description: 'Implement effective sales strategies optimized for web3 and digital products.' }
    ]
  },
  {
    id: 'sprints',
    title: 'Dev Sprints',
    icon: <Rocket size={24} />,
    description: 'Somebody left your work undone? or do you want to accelerate your development cycle? Our expert team of engineers can take the worries off of your hands.',
    subcategories: [
      { title: 'Rapid Prototyping', icon: <Rocket size={20} />, description: 'Quickly build functional prototypes to validate ideas and gather feedback.' },
      { title: 'MVP Development', icon: <Code size={20} />, description: 'Develop minimum viable products to test market fit and attract early users.' },
      { title: 'Code Rescue', icon: <Wrench size={20} />, description: 'Take over and complete projects that have been abandoned or need rescue.' },
      { title: 'Performance Optimization', icon: <Activity size={20} />, description: 'Improve application speed, efficiency, and resource utilization.' }
    ]
  },
  {
    id: 'metaverse',
    title: 'Metaverse Experiences',
    icon: <Building size={24} />,
    description: 'Design and develop immersive digital experiences that bridge the gap between the physical and virtual worlds. AR/VR, Sandbox, Decentraland, Realestate etc.',
    subcategories: [
      { title: 'On-chain Real Estate', icon: <Home size={20} />, description: 'Develop virtual property platforms with blockchain-verified ownership.' },
      { title: 'NFT Integration', icon: <ImageIcon size={20} />, description: 'Incorporate NFTs as access passes, collectibles, or utility tokens in metaverse spaces.' },
      { title: 'Virtual Tour', icon: <Map size={20} />, description: 'Create immersive guided experiences through virtual environments and digital twins.' },
      { title: 'Digital Ownership', icon: <Key size={20} />, description: 'Implement systems for verifiable ownership of digital assets and virtual spaces.' },
      { title: 'Metaverse Building', icon: <Building size={20} />, description: 'Design and construct virtual spaces, buildings, and environments for various platforms.' },
      { title: 'Metaverse Tools', icon: <Wrench size={20} />, description: 'Develop tools and utilities that enhance metaverse creation and interaction.' }
    ]
  },
  {
    id: 'ai',
    title: 'AI Development',
    icon: <Cpu size={24} />,
    description: 'Implement cutting-edge AI technologies to enhance user experiences and automate complex processes.',
    subcategories: [
      { title: 'AI Agents', icon: <Bot size={20} />, description: 'Build autonomous agents that perform tasks and make decisions based on specified parameters.' },
      { title: 'AI Tools for Optimization', icon: <LineChart size={20} />, description: 'Develop AI systems that improve efficiency and performance across business processes.' },
      { title: 'AI Integration', icon: <Webhook size={20} />, description: 'Incorporate AI capabilities into existing applications and workflows.' },
      { title: 'LLMs', icon: <BrainCircuit size={20} />, description: 'Implement and fine-tune large language models for specific use cases and industries.' }
    ]
  },
  {
    id: 'digital',
    title: 'Digital Transformation',
    icon: <Gem size={24} />,
    description: 'Transform your business with Blockchain and AI solutions that drive growth and operational efficiency.',
    subcategories: [
      { title: 'Business Process Automation', icon: <BarChart3 size={20} />, description: 'Streamline operations with AI and blockchain-powered automation.' },
      { title: 'Legacy System Integration', icon: <Webhook size={20} />, description: 'Connect traditional systems with modern web3 and AI technologies.' },
      { title: 'Digital Strategy', icon: <Sparkles size={20} />, description: 'Develop comprehensive plans for technological adoption and implementation.' }
    ]
  }
];
const services = [
  {
    title: "Web3 Development",
    icon: "🧱",
    description: "Build decentralized apps, smart contracts, and blockchain solutions.",
    size: "md:col-span-3",
  },
  {
    title: "Brand Consultation",
    icon: "💡",
    description: "We help launch successful AI/Web3 brands. 50+ brands scaled.",
    size: "md:col-span-3",
  },
  {
    title: "AI Development",
    icon: "🤖",
    description: "Smart systems with NLP, computer vision, and generative AI.",
    size: "md:col-span-4 md:row-span-2",
  },
  {
    title: "Metaverse Experiences",
    icon: "🌐",
    description: "AR/VR environments with Sandbox, Decentraland, and more.",
    size: "md:col-span-2",
  },
  {
    title: "Dev Sprints",
    icon: "⚡",
    description: "Accelerate delivery with dedicated product engineering pods.",
    size: "md:col-span-2",
  },
];


// Service Card Component
const ServiceCard: React.FC<ServiceProps> = ({ icon, title, description, onClick }) => {
  const { metaMirrorMode } = useAppStore();

  return (
    <motion.div
      className={`p-6 rounded-lg border transition-all cursor-pointer ${metaMirrorMode
          ? 'bg-deepCosmos-800 border-deepCosmos-700 hover:border-metaEmerald-700'
          : 'bg-prismWhite border-quantumGrey-200 hover:border-metaEmerald-300'
        }`}
      whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-full bg-metaEmerald-500 bg-opacity-20 flex items-center justify-center mb-4">
        <div className="text-metaEmerald-500">
          {icon}
        </div>
      </div>

      <h3 className={`text-xl font-bold mb-2 ${metaMirrorMode ? 'text-prismWhite' : 'text-deepCosmos-900'
        }`}>
        {title}
      </h3>

      <p className={`${metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
        }`}>
        {description}
      </p>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const { metaMirrorMode, easterEggFragments, findEasterEggFragment } = useAppStore();
  const fragment = easterEggFragments.find(f => f.id === 'fragment1');
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Easter egg fragment
  const handleFragmentClick = () => {
    if (fragment && !fragment.found) {
      findEasterEggFragment('fragment1');
    }
  };

  // Handle service card click
  const handleServiceClick = (serviceId: string) => {
    const service = serviceData.find(s => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      setIsModalOpen(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id="services"
      className={`py-24 transition-colors ${metaMirrorMode ? 'bg-deepCosmos-800' : 'bg-quantumGrey-50'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <h2 className="font-bold text-3xl md:text-5xl text-white mb-4">
            Our <span className="text-[#3fa7f5]">Services</span>
          </h2>

          <p className={`text-lg max-w-2xl mx-auto ${metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
            }`}>
            We help businesses to get equipped with latest tech efficiency.
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

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service) => (
          <ServiceCard 
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              onClick={() => handleServiceClick(service.id)}
            />
          ))}
        </div> */}
        {/* <div className="px-6 py-20 bg-black text-white">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold">Our <span className="text-green-400">Services</span></h2>
    <p className="text-gray-400 mt-3 max-w-xl mx-auto">
      Discover how we empower startups & enterprises with AI, Web3, and immersive digital solutions.
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-6 auto-rows-[minmax(180px,_auto)]">
    
    <div className="md:col-span-2 bg-[#101010] p-6 rounded-2xl border border-[#1a1a1a] hover:border-green-400 hover:shadow-green-500/20 transition shadow-md">
      <div className="text-3xl mb-3">🧱</div>
      <h3 className="text-xl font-bold mb-2">Web3 Development</h3>
      <p className="text-gray-400 text-sm">Build decentralized apps, smart contracts, and blockchain solutions.</p>
    </div>

    <div className="md:col-span-4 bg-[#111111] p-6 rounded-2xl border border-[#1a1a1a] hover:border-green-400 hover:shadow-green-500/20 transition shadow-md">
      <div className="text-3xl mb-3">💡</div>
      <h3 className="text-xl font-bold mb-2">Brand Consultation</h3>
      <p className="text-gray-400 text-sm">We help launch successful AI/Web3 brands. 50+ brands scaled.</p>
    </div>

    <div className="md:col-span-3 md:row-span-2 bg-gradient-to-br from-[#0f0f0f] to-[#1f1f1f] p-8 rounded-2xl border border-green-500 hover:shadow-lg shadow-green-400/30 transition transform hover:scale-[1.02]">
      <div className="text-4xl mb-4 animate-pulse">🤖</div>
      <h3 className="text-2xl font-bold mb-2">AI Development</h3>
      <p className="text-gray-300 text-sm leading-relaxed">Smart systems with NLP, computer vision, and generative AI. From automation to recommendation engines — we build it all.</p>
    </div>

    <div className="md:col-span-3 bg-[#101010] p-6 rounded-2xl border border-[#1a1a1a] hover:border-green-400 transition shadow-md hover:shadow-green-500/10">
      <div className="text-3xl mb-3">🌐</div>
      <h3 className="text-xl font-bold mb-2">Metaverse Experiences</h3>
      <p className="text-gray-400 text-sm">AR/VR environments with Sandbox, Decentraland, and more.</p>
    </div>

    <div className="md:col-span-3 bg-[#111111] p-6 rounded-2xl border border-[#1a1a1a] hover:border-green-400 transition shadow-md hover:shadow-green-500/10">
      <div className="text-3xl mb-3">⚡</div>
      <h3 className="text-xl font-bold mb-2">Dev Sprints</h3>
      <p className="text-gray-400 text-sm">Accelerate delivery with dedicated product engineering pods.</p>
    </div>

  </div>
</div> */}
        <div className="grid gap-6 md:grid-cols-6 auto-rows-[minmax(180px,_auto)] text-white">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`
        ${service.size || "md:col-span-3"} 
        bg-gradient-to-br from-[#0f0f1a] to-[#0a0a1a]
        p-6 rounded-2xl border border-[#1b2c3f]
        hover:border-[#3fa7f5] hover:shadow-[0_0_20px_#3fa7f599]
        transition-all duration-300 ease-in-out
      `}
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>


      </div>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default Services;