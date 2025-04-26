import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

const AboutPage: React.FC = () => {
  const { metaMirrorMode } = useAppStore();

  return (
    <main className="pt-24">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              About <span className="text-metaEmerald-500">METAQUBE</span>
            </h1>
            <p className={`text-xl mb-12 ${
              metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
            }`}>
              Building the future of digital experiences through innovation and creativity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className={`mb-4 ${
                metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
              }`}>
                Founded in 2023, METAQUBE emerged from a vision to bridge the gap between traditional digital experiences and the boundless possibilities of Web3 and AI technologies.
              </p>
              <p className={`mb-4 ${
                metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
              }`}>
                Our team of innovators, developers, and creative minds work together to push the boundaries of what's possible in the digital realm.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className={`mb-4 ${
                metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
              }`}>
                To empower businesses and creators with cutting-edge technology solutions that transcend traditional digital boundaries and create meaningful user experiences.
              </p>
              <p className={`mb-4 ${
                metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
              }`}>
                We believe in a future where technology enhances human creativity and connection, rather than replacing it.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-6xl mx-auto mt-16"
          >
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  description: "Constantly pushing boundaries and exploring new possibilities in technology."
                },
                {
                  title: "Quality",
                  description: "Delivering excellence in every project through attention to detail and craftsmanship."
                },
                {
                  title: "Collaboration",
                  description: "Working together with clients and partners to achieve extraordinary results."
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.2) }}
                  className={`p-6 rounded-lg ${
                    metaMirrorMode ? 'bg-deepCosmos-800' : 'bg-quantumGrey-50'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className={
                    metaMirrorMode ? 'text-quantumGrey-300' : 'text-deepCosmos-600'
                  }>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;