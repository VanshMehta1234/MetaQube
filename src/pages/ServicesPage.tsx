import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { Cuboid, Cpu, Brush, Rocket, Building, Gem } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const { metaMirrorMode } = useAppStore();

  const services = [
    {
      icon: <Cuboid size={32} />,
      title: "Web3 Development",
      description: "Build decentralized applications, smart contracts, and blockchain solutions that redefine digital ownership and interaction.",
      features: [
        "Smart Contract Development",
        "DApp Creation",
        "Token Development",
        "Blockchain Integration"
      ]
    },
    {
      icon: <Brush size={32} />,
      title: "Brand Consultation",
      description: "Are you trying to build a web3 or AI brand and don’t know where to start? we can help you from beginning to end. our team is expert in building web3 and AI brands having experience of building 50+ brands.",
      features: [
        "Brand Strategy",
        "Visual Identity",
        "Digital Presence",
        "Community Building"
      ]
    },
    {
      icon: <Rocket size={32} />,
      title: "Dev Sprints",
      description: "Somebody left your work undone? or do you want to accelerate your development cycle? Our expert team of engineers can take the worries off of your hands.",
      features: [
        "Rapid Prototyping",
        "MVP Development",
        "Agile Methodology",
        "Technical Consultation"
      ]
    },
    {
      icon: <Building size={32} />,
      title: "Metaverse Experiences",
      description: "Design and develop immersive digital experiences that bridge the gap between the physical and virtual worlds.",
      features: [
        "Virtual Worlds",
        "AR/VR Development",
        "3D Modeling",
        "Interactive Experiences"
      ]
    },
    {
      icon: <Cpu size={32} />,
      title: "AI Development",
      description: "Implement cutting-edge AI technologies to enhance user experiences and automate complex processes.",
      features: [
        "Machine Learning",
        "Natural Language Processing",
        "Computer Vision",
        "Predictive Analytics"
      ]
    },
    {
      icon: <Gem size={32} />,
      title: "Digital Transformation",
      description: "Transform your business with Blockchain and AI solutions that drive growth and operational efficiency.",
      features: [
        "Process Automation",
        "Data Analytics",
        "System Integration",
        "Digital Strategy"
      ]
    }
  ];

  return (
    <main className="pt-24">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6">
              Our <span className="text-metaEmerald-500">Services</span>
            </h1>
            <p className={`text-xl ${
              metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
            }`}>
              Comprehensive solutions to transform your digital presence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-lg border transition-all hover:border-metaEmerald-500 ${
                  metaMirrorMode 
                    ? 'bg-deepCosmos-800 border-deepCosmos-700' 
                    : 'bg-prismWhite border-quantumGrey-200'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-metaEmerald-500 bg-opacity-20 flex items-center justify-center mb-6">
                  <div className="text-metaEmerald-500">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className={`mb-6 ${
                  metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
                }`}>{service.description}</p>

                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-metaEmerald-500 rounded-full mr-3"></span>
                      <span className={
                        metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
                      }>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;