import { create } from 'zustand';
import { getLocalCurrentUser } from '../util/userStoreUtil';

interface FavoriteStore {
    favorites: number[];
    setFavorites: (data: number[]) => void;
    addFavorites: (data: number) => number[];
    removeFavorite: (data : number) => number[];
    getFavorites: () => number[];
}

export const useFavoritesStore = create<FavoriteStore>((set, get) => ({
    favorites: getLocalCurrentUser()?.favorites ?? [],
    setFavorites: (data) => {
        set({ favorites: data });
    },
    addFavorites: (data) => {
        const updatedFavorites = [...get().favorites, data];
        set({ favorites: updatedFavorites });
        return updatedFavorites;
    },
    removeFavorite: (data) => {
        const updatedFavorites = get().favorites.filter(id => id !== data);
        set({favorites: updatedFavorites});
        return updatedFavorites;
    },
    getFavorites: () => {
        const state: number[] = get().favorites;
        if (!state)
            return [];
        return state ?? [];
    }
}));