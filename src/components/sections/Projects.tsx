import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppStore } from "../../store/useAppStore";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Voyager CX",
    description: "Cross-chain liquidity router & aggregator.",
    stack: ["Solidity", "Subgraph", "Next.js"],
    image: "https://images.unsplash.com/photo-1529473814998-077b4fec6770?auto=format&fit=crop&w=800&q=60",
    live: "https://voyager.cx/"
  },
  {
    title: "Pandemic Coin",
    description: "Meme-powered pandemic-era tokenomics.",
    stack: ["Solana", "React", "Arweave"],
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=60",
    live: "https://pandemiccoin.io/"
  },
  {
    title: "RCO Finance",
    description: "Decentralised lending & yield farming hub.",
    stack: ["Avalanche", "Hardhat", "TypeScript"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=60",
    live: "https://rcofinance.com/"
  },
  {
    title: "WallitIQ",
    description: "AI-driven smart-wallet with fraud alerts.",
    stack: ["React", "Ethers", "Python"],
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=60",
    live: "https://wallitiq.io/"
  },
  {
    title: "FloppyPepe",
    description: "NFT collection & staking game.",
    stack: ["Solana", "Metaplex", "Rust"],
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=60",
    live: "https://floppypepe.io/"
  },
  {
    title: "Propichain",
    description: "Tokenised real-estate marketplace.",
    stack: ["Polygon", "IPFS", "Next.js"],
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=60",
    live: "https://propichain.finance/"
  },
  {
    title: "Krishn AI",
    description: "AI tutor for Sanskrit & Indian scriptures.",
    stack: ["Next.js", "GPT-4", "Tailwind"],
    image: "https://images.unsplash.com/photo-1607706189992-eae578626c86?auto=format&fit=crop&w=800&q=60",
    live: "https://krishn.ai/"
  },
  {
    title: "Floatbot AI",
    description: "No-code voice & chatbot builder.",
    stack: ["React", "Node.js", "Dialogflow"],
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=60",
    live: "https://floatbot.ai/"
  },
  {
    title: "FitFlex AI",
    description: "AI workout generator from camera pose.",
    stack: ["PoseNet", "React", "TensorFlow.js"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=60",
    live: "https://fitflex-new.vercel.app/home"
  },
  {
    title: "$5 Jobs AI",
    description: "Micro-gig marketplace powered by AI matching.",
    stack: ["Vue", "Firebase", "GPT-4"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=60",
    live: "https://5dollarjobs.com/#A.i-Creator"
  },
  {
    title: "PepeBeanz",
    description: "Where memes meet magic.",
    stack: ["Solana", "WebGL", "Next.js"],
    image: "https://pepebeanz.com/assets/logo-text-C84ADkOL.webp",
    live: "https://pepebeanz.com/",
  },
  {
    title: "Permissionless",
    description: "Stateless, sovereign infra.",
    stack: ["React", "GSAP", "Tailwind"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=60",
    live: "https://prmsnls.xyz/",
  },
  {
    title: "Recoal",
    description: "AI-powered carbon-offset dashboard.",
    stack: ["Next.js", "AI", "Chart.js"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=60",
    live: "https://recoal.github.io/",
  },
  {
    title: "Infanity AI",
    description: "Infinite AI-generated content.",
    stack: ["React", "OpenAI", "Supabase"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=60",
    live: "https://infanity.xyz/",
  },
  {
    title: "DeepWhales AI",
    description: "On-chain whale watcher.",
    stack: ["Node.js", "GraphQL", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=800&q=60",
    live: "https://www.deepwhalesai.ai/",
  },
  {
    title: "Syntex Pro",
    description: "AI code-assistant for Solidity & Rust.",
    stack: ["Next.js", "GPT-4", "Monaco"],
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=60",
    live: "https://syntex.pro/",
  },
];

const Projects: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof projects)[0] | null>(null);
  const { metaMirrorMode } = useAppStore();

  const openModal = (project: (typeof projects)[0]) => {
    setActiveProject(project);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    if (!container || !horizontal) return;

    const scrollLength = horizontal.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(horizontal, {
        x: () => -scrollLength,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${scrollLength + 400}`,
          pin: true,
          scrub: 1,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="w-full min-h-screen bg-black overflow-hidden pt-28"
    >
      {/* Title */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          Our <span className="text-metaEmerald-500">Projects</span>
        </h2>
        <p className="mt-2 text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
          Equipping businesses with cutting-edge Web3 + AI tech.
        </p>
      </div>

      {/* Horizontal lane */}
      <div ref={horizontalRef} className="flex items-center px-4 md:px-8 space-x-6 md:space-x-10">
        {projects?.map((proj, idx) => (
          <motion.div
            key={idx}
            className="group flex-shrink-0 w-64 md:w-72 h-96 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-5 shadow-xl hover:shadow-metaEmerald-500/40 transition-all duration-500 cursor-pointer"
            whileHover={{ scale: 1.04, y: -8 }}
            onClick={() => openModal(proj)}
          >
            {/* Image */}
            <div className="overflow-hidden rounded-xl mb-3">
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-40 md:h-44 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Text */}
            <h3 className="text-lg md:text-xl font-bold text-white mb-1">{proj.title}</h3>
            <p className="text-sm text-slate-300 mb-3">{proj.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {proj.stack.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-white/10 text-metaEmerald-300 px-2 py-0.5 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                openModal(proj);
              }}
              className="w-full text-sm bg-metaEmerald-500 hover:bg-metaEmerald-600 transition px-3 py-2 rounded-full text-slate-900 font-semibold"
            >
              Live Demo
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && activeProject && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <div className="relative w-[90vw] max-w-4xl h-[80vh] bg-black rounded-2xl border border-white/10 shadow-2xl flex flex-col">
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between px-4 py-3 text-white font-semibold border-b border-white/10">
              <span>{activeProject.title}</span>
              <button
                onClick={closeModal}
                className="text-white bg-metaEmerald-500 hover:bg-metaEmerald-600 transition px-3 py-1.5 rounded-full text-xs font-semibold"
              >
                ✕
              </button>
            </div>

            {/* Iframe */}
            <div className="flex-1 w-full overflow-hidden">
              <iframe
                src={activeProject.live}
                title={activeProject.title}
                className="w-full h-full border-none"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;