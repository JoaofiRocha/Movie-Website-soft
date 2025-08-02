import { create } from 'zustand';

interface SearchStore {
  query: string;
  setQuery: (value: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  setQuery: (value) => set({ query: value }),
}));