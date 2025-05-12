import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import BuildYourQube from '../components/sections/BuildYourQube';
import FrensMap from '../components/sections/FrensMap';
import ContactCTA from '../components/sections/ContactCTA';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <Services />
      <BuildYourQube />
      <FrensMap />
      <ContactCTA />
    </main>
  );
};

export default HomePage;