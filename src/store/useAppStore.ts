import { create } from 'zustand';
import { EasterEggFragment, QubeBuildOption, ToggleOption } from '../types';
import { Cuboid, Brush, Rocket, Building, Cpu, Gem } from 'lucide-react';

interface AppState {
  darkMode: boolean;
  metaMirrorMode: boolean;
  toggleOptions: ToggleOption[];
  easterEggFragments: EasterEggFragment[];
  qubeOptions: QubeBuildOption[];
  currentCTA: number;
  assembling: boolean;
  setDarkMode: (value: boolean) => void;
  updateToggleOption: (id: string, active: boolean) => void;
  findEasterEggFragment: (id: string) => void;
  selectQubeOption: (id: string) => void;
  nextCTA: () => void;
  resetQubeOptions: () => void;
  resetToggleOptions: () => void;
  allFragmentsFound: () => boolean;
  setAssembling: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  darkMode: true,
  metaMirrorMode: true,
  assembling: false,

  toggleOptions: [
    { id: 'fast', label: 'Fast', active: false },
    { id: 'cheap', label: 'Cheap', active: true },
    { id: 'good', label: 'Good', active: true },
  ],

  easterEggFragments: [
    { id: 'fragment1', found: false, position: 'top' },
    { id: 'fragment2', found: false, position: 'middle' },
    { id: 'fragment3', found: false, position: 'bottom' },
  ],

  qubeOptions: [
    { 
      id: 'web3', 
      label: 'Web3 Development', 
      description: 'Blockchain solutions including DeFi, DePIN, and dApps', 
      selected: false,
      icon: Cuboid  
    },
    { 
      id: 'brand', 
      label: 'Brand Consultation', 
      description: 'Building communities and crafting effective brand communications', 
      selected: false,
      icon: Brush
    },
    { 
      id: 'dev', 
      label: 'Dev Sprint', 
      description: 'Accelerated development and rescue for unfinished projects', 
      selected: false,
      icon: Rocket
    },
    { 
      id: 'metaverse', 
      label: 'Metaverse Experience', 
      description: 'Virtual environments with NFT integration and digital ownership', 
      selected: false,
      icon: Building
    },
    { 
      id: 'ai', 
      label: 'AI Development', 
      description: 'Intelligent agents, tools and LLM-powered solutions', 
      selected: false,
      icon: Cpu
    },
    { 
      id: 'digital', 
      label: 'Digital Transformation', 
      description: 'Upgrading existing businesses with Web3 and AI technologies', 
      selected: false,
      icon: Gem
    }
  ],

  currentCTA: 0,

  setDarkMode: (value) => set({ darkMode: value }),

  updateToggleOption: (id, active) => {
    const { toggleOptions } = get();
    const activeCount = toggleOptions.filter(o => o.active).length;

    if (active && activeCount >= 2) {
      const otherActiveOptions = toggleOptions.filter(o => o.active && o.id !== id);

      if (otherActiveOptions.length > 0) {
        set({
          toggleOptions: toggleOptions.map(o => {
            if (o.id === id) return { ...o, active };
            if (o.id === otherActiveOptions[0].id) return { ...o, active: false };
            return o;
          })
        });
        return;
      }
    }

    set({
      toggleOptions: toggleOptions.map(o =>
        o.id === id ? { ...o, active } : o
      )
    });
  },

  findEasterEggFragment: (id) => {
    set(state => ({
      easterEggFragments: state.easterEggFragments.map(f =>
        f.id === id ? { ...f, found: true } : f
      )
    }));
  },

  selectQubeOption: (id) => {
    set(state => ({
      qubeOptions: state.qubeOptions.map(option =>
        option.id === id 
          ? { ...option, selected: !option.selected } 
          : option
      )
    }));
  },

  nextCTA: () => {
    set(state => ({
      currentCTA: (state.currentCTA + 1) % 3
    }));
  },

  resetQubeOptions: () => {
    set(state => ({
      qubeOptions: state.qubeOptions.map(option => ({
        ...option,
        selected: false
      }))
    }));
  },

  resetToggleOptions: () => {
    set({
      toggleOptions: [
        { id: 'fast', label: 'Fast', active: false },
        { id: 'cheap', label: 'Cheap', active: true },
        { id: 'good', label: 'Good', active: true },
      ]
    });
  },

  allFragmentsFound: () => {
    const { easterEggFragments } = get();
    return easterEggFragments.every(f => f.found);
  },

  setAssembling: (value) => set({ assembling: value }),
}));
