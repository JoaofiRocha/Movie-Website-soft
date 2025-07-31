import { create } from 'zustand';

interface SearchI {
  search: string;
  setSearch: (value: string) => void;
}

export const useSearchStore = create<SearchI>((set) => ({
  search: '',
  setSearch: (value) => set({ search: value }),
}));