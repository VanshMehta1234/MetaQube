export interface ToggleOption {
  id: string;
  label: string;
  active: boolean;
}

export type ToggleCombination = {
  fast: boolean;
  cheap: boolean;
  good: boolean;
};

export interface QubeBuildOption {
  id: string;
  label: string;
  description: string;
  selected: boolean;
}

export interface EasterEggFragment {
  id: string;
  found: boolean;
  position: 'top' | 'middle' | 'bottom';
}

export interface CTAMessage {
  id: number;
  text: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  imageUrl: string;
}