import { create } from 'zustand';
import { EasterEggFragment, QubeBuildOption, ToggleOption } from '../types';

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
      label: 'Web3 Product', 
      description: 'Blockchain solutions for next-gen applications', 
      selected: false 
    },
    { 
      id: 'brand', 
      label: 'Brand Design', 
      description: 'Identity that transcends traditional spaces', 
      selected: false 
    },
    { 
      id: 'dev', 
      label: 'Dev Sprint', 
      description: 'Accelerated development with expert teams', 
      selected: false 
    },
    { 
      id: 'metaverse', 
      label: 'Metaverse', 
      description: 'Immersive digital experiences', 
      selected: false 
    },
    { 
      id: 'ai', 
      label: 'AI Integration', 
      description: 'Intelligent solutions for complex problems', 
      selected: false 
    },
  ],
  currentCTA: 0,

  setDarkMode: (value) => set({ darkMode: value }),

  updateToggleOption: (id, active) => {
    // Get current toggle options
    const { toggleOptions } = get();
    
    // Count how many are currently active
    const activeCount = toggleOptions.filter(o => o.active).length;
    
    // If trying to activate and already at 2 active, find one to deactivate
    if (active && activeCount >= 2) {
      // Find currently active options that aren't this one
      const otherActiveOptions = toggleOptions
        .filter(o => o.active && o.id !== id);
      
      // If there are 2 or more other active options, deactivate the first one
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
    
    // Otherwise just toggle the option
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