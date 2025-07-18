import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import BuildYourQube from '../components/sections/BuildYourQube';
import FrensMap from '../components/sections/FrensMap';
import ContactCTA from '../components/sections/ContactCTA';
import JVectorWorldMapSection from '../components/sections/JVectorWorldMapSection';
import Projects from '../components/sections/Projects';
// import ToggleButton from '../components/ui/ToggleButton';

const HomePage: React.FC = () => {
  return (
    <main>

      <Hero />
      {/* <ToggleButton /> */}
      <Services />
      <BuildYourQube />
      <Projects />
      <JVectorWorldMapSection />
      <FrensMap />
      <ContactCTA />
    </main>
  );
};

export default HomePage;