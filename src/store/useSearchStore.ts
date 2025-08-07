import { create } from 'zustand';

interface SearchStore {
  query: string;
  setQuery: (value: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  setQuery: (value) => set({ query: value }),
}));


interface FilterStore{
  genreId: number;
  setGenreId: (value: number) => void;
}

export const useFilter = create<FilterStore>((set) => ({
  genreId: 0,
  setGenreId: (value) => set({ genreId: value }),
}))