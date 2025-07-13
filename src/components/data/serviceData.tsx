import {
  Cuboid as Cube, Cpu, Brush, Rocket, Building, Gem,
  Bitcoin, Code, Network, Users, BarChart, Activity,
  DatabaseIcon, PieChart, Globe, Share2, UserPlus, ShoppingBag,
  Home, ImageIcon, Map, Key, Wrench, Bot, LineChart, Webhook,
  BrainCircuit, BarChart3, Sparkles
} from 'lucide-react';

export interface ServiceDetails {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  subcategories: {
    title: string;
    icon: React.ReactNode;
    description: string;
  }[];
}

export const serviceData: ServiceDetails[] = [
  {
    id: 'web3',
    title: 'Web3 Development',
    icon: <Cube size={24} />,
    description: 'Build decentralized applications, smart contracts, and blockchain solutions that redefine digital ownership and interaction.',
    subcategories: [
      { title: 'DeFi', icon: <BarChart size={20} />, description: 'Decentralized finance apps: lending, trading, yield farming.' },
      { title: 'CeFi', icon: <PieChart size={20} />, description: 'Centralized finance platforms with blockchain features.' },
      { title: 'DePIN', icon: <Network size={20} />, description: 'Physical infrastructure networks backed by blockchain.' },
      { title: 'SocialFi', icon: <Users size={20} />, description: 'Social networks with tokens and community governance.' },
      { title: 'Ethereum Dapps', icon: <DatabaseIcon size={20} />, description: 'Build on Ethereum with smart contracts & web3 tools.' },
      { title: 'Solana Dapps', icon: <Activity size={20} />, description: 'High-speed Solana dapps for performance use cases.' },
      { title: 'EVM Dapps', icon: <Code size={20} />, description: 'Cross-compatible apps for EVM chains like Polygon, Arbitrum.' },
      { title: 'Blockchain', icon: <Bitcoin size={20} />, description: 'Custom blockchain development and consensus design.' }
    ]
  },
  {
    id: 'brand',
    title: 'Brand Consultation',
    icon: <Brush size={24} />,
    description: 'We help launch successful AI/Web3 brands. 50+ brands scaled end-to-end.',
    subcategories: [
      { title: 'Community Building', icon: <Users size={20} />, description: 'Build and nurture engaged communities for your project.' },
      { title: 'Brand Communication', icon: <Globe size={20} />, description: 'Messaging strategies that resonate and convert.' },
      { title: 'Web3 Social Media', icon: <Share2 size={20} />, description: 'Grow presence on decentralized social platforms.' },
      { title: 'Penetration & Distribution', icon: <BarChart size={20} />, description: 'Scale market reach with smart distribution tactics.' },
      { title: 'Onboarding', icon: <UserPlus size={20} />, description: 'Design smooth onboarding flows for new users.' },
      { title: 'Sales', icon: <ShoppingBag size={20} />, description: 'Sales systems tailored for Web3/Digital-native brands.' }
    ]
  },
  {
    id: 'sprints',
    title: 'Dev Sprints',
    icon: <Rocket size={24} />,
    description: 'Accelerate your build cycle with our expert product engineering pods.',
    subcategories: [
      { title: 'Rapid Prototyping', icon: <Rocket size={20} />, description: 'Go from idea to clickable prototype fast.' },
      { title: 'MVP Development', icon: <Code size={20} />, description: 'Launch market-ready MVPs with full-stack agility.' },
      { title: 'Code Rescue', icon: <Wrench size={20} />, description: 'Takeover & revive half-baked/abandoned projects.' },
      { title: 'Performance Optimization', icon: <Activity size={20} />, description: 'Speed up apps and reduce resource bloat.' }
    ]
  },
  {
    id: 'metaverse',
    title: 'Metaverse Experiences',
    icon: <Building size={24} />,
    description: 'Design AR/VR metaverse spaces using platforms like Sandbox & Decentraland.',
    subcategories: [
      { title: 'On-chain Real Estate', icon: <Home size={20} />, description: 'Virtual properties with blockchain ownership.' },
      { title: 'NFT Integration', icon: <ImageIcon size={20} />, description: 'Token-gated access and digital collectibles.' },
      { title: 'Virtual Tour', icon: <Map size={20} />, description: 'Immersive walkthroughs and showroom demos.' },
      { title: 'Digital Ownership', icon: <Key size={20} />, description: 'Ownership verification of metaverse assets.' },
      { title: 'Metaverse Building', icon: <Building size={20} />, description: 'Custom virtual architecture and interiors.' },
      { title: 'Metaverse Tools', icon: <Wrench size={20} />, description: 'Toolkits for creators and digital architects.' }
    ]
  },
  {
    id: 'ai',
    title: 'AI Development',
    icon: <Cpu size={24} />,
    description: 'We build NLP apps, LLMs, agents & AI pipelines that actually work.',
    subcategories: [
      { title: 'AI Agents', icon: <Bot size={20} />, description: 'Autonomous agents for customer support & operations.' },
      { title: 'AI Tools for Optimization', icon: <LineChart size={20} />, description: 'Use AI to boost internal process efficiency.' },
      { title: 'AI Integration', icon: <Webhook size={20} />, description: 'Plug AI into your current stack & workflows.' },
      { title: 'LLMs', icon: <BrainCircuit size={20} />, description: 'Train & fine-tune large language models (ChatGPT-style).' }
    ]
  },
  {
    id: 'digital',
    title: 'Digital Transformation',
    icon: <Gem size={24} />,
    description: 'Modernize operations with AI + Blockchain-backed transformation.',
    subcategories: [
      { title: 'Business Process Automation', icon: <BarChart3 size={20} />, description: 'Automate with smart logic and systems.' },
      { title: 'Legacy System Integration', icon: <Webhook size={20} />, description: 'Bridge old systems with new digital workflows.' },
      { title: 'Digital Strategy', icon: <Sparkles size={20} />, description: 'Build roadmaps for modernizing your enterprise.' }
    ]
  }
];
