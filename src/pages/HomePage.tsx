import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import BuildYourQube from '../components/sections/BuildYourQube';
import FrensMap from '../components/sections/FrensMap';
import ContactCTA from '../components/sections/ContactCTA';
import WorldMap from '../components/sections/WorldMap';
import Services3D from '../components/sections/Services3d';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <Services />
      {/* <Services3D /> */}
      {/* <HorizontalServicesGallery /> */}
      <BuildYourQube />
      <WorldMap />
      <FrensMap />
      {/* <WorldPresenceMap /> */}
      <ContactCTA />
    </main>
  );
};

export default HomePage;