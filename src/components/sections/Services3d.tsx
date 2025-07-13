import React, { useState } from 'react';
import { ContainerScroll } from '../ui/container-scroll-animation';
import { StickyScroll } from '../ui/sticky-scroll-reveal';
import ServiceModal, { ServiceDetails } from './ServiceModal';
import { serviceData } from '../data/serviceData';

const Services3D: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (serviceId: string) => {
    const service = serviceData.find((s) => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden'; // lock background scroll
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // re-enable scroll
  };

  const services = serviceData.map((service) => ({
    title: service.title,
    description: service.description,
    content: (
      <div
        onClick={() => handleServiceClick(service.id)}
        className="h-full w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] hover:from-[#1e3a8a] hover:to-[#3fa7f5] cursor-pointer flex items-center justify-center text-white shadow-xl rounded-3xl transition-all duration-300 p-4"
      >
        <div className="text-center">
          <div className="text-5xl mb-3">{service.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-base max-w-xs mx-auto">{service.description}</p>
        </div>
      </div>
    ),
  }));

  return (
    <section id="services" className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Scrollable Services Container */}
      <div className="absolute inset-0 overflow-y-auto">
        <ContainerScroll
          titleComponent={
            <div className="pt-16 px-4 text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                Our <span className="text-[#3fa7f5]">Services</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                Empowering enterprises to innovate, scale, and lead with cutting-edge digital infrastructure.
              </p>
            </div>
          }
        >
          <StickyScroll content={services} />
        </ContainerScroll>
      </div>

      {/* Modal */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[40%] bg-[#0f172a] z-[100] shadow-2xl overflow-y-auto transition-transform duration-300 ${
          isModalOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedService && (
          <ServiceModal
            service={selectedService}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </section>
  );
};

export default Services3D;
