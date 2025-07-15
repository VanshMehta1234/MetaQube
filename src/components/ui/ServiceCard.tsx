import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const ServiceCard = ({ icon: Icon, title, description, onClick }: any) => (
  <Tilt
    tiltMaxAngleX={10}
    tiltMaxAngleY={10}
    glareEnable
    glareMaxOpacity={0.2}
    className="bg-gradient-to-br from-[#0e0f1a] to-[#0c0d1a] border border-metaEmerald-500/20 shadow-lg shadow-metaEmerald-500/10 rounded-2xl p-6 max-w-xs w-full hover:shadow-metaEmerald-500/30 transition-all"
  >
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="cursor-pointer flex flex-col gap-4 items-start justify-start"
      onClick={onClick}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="bg-metaEmerald-500/10 p-3 rounded-xl"
      >
        <Icon className="w-6 h-6 text-metaEmerald-500" />
      </motion.div>
      <h3 className="text-xl text-prismWhite font-semibold tracking-tight">{title}</h3>
      <p className="text-sm text-quantumGrey-300 leading-relaxed">{description}</p>
      <button className="text-metaEmerald-500 hover:underline text-sm mt-2">
        Learn more →
      </button>
    </motion.div>
  </Tilt>
);

export default ServiceCard;