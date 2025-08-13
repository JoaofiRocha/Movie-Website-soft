import { create } from 'zustand';
import { getLocalCurrentUser } from '../util/userStoreUtil';

interface FavoriteStore {
    favorites: FavoriteMovie[];
    setFavorites: (data: FavoriteMovie[]) => void;
    addFavorites: (data: FavoriteMovie) => FavoriteMovie[];
    removeFavorite: (id : number, type : 'movie' | 'tv') => FavoriteMovie[];
    getFavorites: () => FavoriteMovie[];
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
    removeFavorite: (id,type) => {
        const updatedFavorites = get().favorites.filter(favorite => favorite.id !== id || favorite.type !== type);
        set({favorites: updatedFavorites});
        return updatedFavorites;
    },
    getFavorites: () => {
        const state: FavoriteMovie[] = get().favorites;
        return state ?? [];
    }
}));