import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import BuildYourQube from '../components/sections/BuildYourQube';
import FrensMap from '../components/sections/FrensMap';
import ContactCTA from '../components/sections/ContactCTA';
import WorldMap from '../components/sections/WorldMap';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <Services />
      <BuildYourQube />
      <FrensMap />
      {/* <WorldPresenceMap /> */}
      <WorldMap />
      <ContactCTA />
    </main>
  );
};

export default HomePage;