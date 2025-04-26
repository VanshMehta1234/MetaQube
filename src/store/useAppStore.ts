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
  toggleMetaMirrorMode: () => void;
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
  darkMode: false,
  metaMirrorMode: false,
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

  toggleMetaMirrorMode: () => {
    set((state) => ({ 
      metaMirrorMode: !state.metaMirrorMode,
      darkMode: !state.metaMirrorMode ? true : state.darkMode,
    }));
  },

  setDarkMode: (value) => set({ darkMode: value }),

  setAssembling: (value) => set({ assembling: value }),

  updateToggleOption: (id, active) => {
    set((state) => {
      const updatedOptions = [...state.toggleOptions];
      const index = updatedOptions.findIndex(option => option.id === id);
      
      if (active) {
        const activeCount = updatedOptions.filter(o => o.active).length;
        
        if (activeCount === 2) {
          const firstActiveIndex = updatedOptions.findIndex(o => o.active);
          if (firstActiveIndex !== -1) {
            updatedOptions[firstActiveIndex].active = false;
          }
        }
      }
      
      if (index !== -1) {
        updatedOptions[index].active = active;
      }
      
      return { toggleOptions: updatedOptions };
    });
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

  findEasterEggFragment: (id) => {
    set((state) => {
      const updatedFragments = [...state.easterEggFragments];
      const index = updatedFragments.findIndex(fragment => fragment.id === id);
      
      if (index !== -1) {
        updatedFragments[index].found = true;
      }
      
      return { easterEggFragments: updatedFragments };
    });
  },

  selectQubeOption: (id) => {
    set((state) => {
      const updatedOptions = state.qubeOptions.map(option => 
        option.id === id ? { ...option, selected: !option.selected } : option
      );
      return { qubeOptions: updatedOptions };
    });
  },

  nextCTA: () => {
    set((state) => ({
      currentCTA: (state.currentCTA + 1) % 7
    }));
  },

  resetQubeOptions: () => {
    set((state) => ({
      qubeOptions: state.qubeOptions.map(option => ({
        ...option,
        selected: false
      })),
      assembling: false
    }));
  },

  allFragmentsFound: () => {
    return get().easterEggFragments.every(fragment => fragment.found);
  }
}));