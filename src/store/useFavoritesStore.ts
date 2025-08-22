import { create } from 'zustand';
import { getLocalFavorites, saveFavoritesToLocal } from '../util/storeUtil';

interface FavoriteStore {
    favorites: FavoriteLists[] | null;
    addFavorites: (data: FavoriteMovie, userId: string) => FavoriteMovie[];
    removeFavorite: (id: number, type: 'movie' | 'tv', userId: string) => FavoriteMovie[];
    getFavorites: (userId: string) => FavoriteMovie[];
    hasFavorite: (id : number, userId: string) => boolean;
    removeUserFavorite: (userId : string | number) => void;
}

export const useFavoritesStore = create<FavoriteStore>((set, get) => ({
    favorites: getLocalFavorites(),
    addFavorites: (data, userId) => {
        let favorites = get().favorites ?? [];
        const index = favorites.findIndex(e => e.userId === userId);
        if (index === -1 || index === undefined) {
            favorites = [...favorites, { userId: userId, favorites: [{ ...data }] }]
            saveFavoritesToLocal(favorites);
            set({ favorites });
            return [{...data}]
        }
        else {
            favorites[index].favorites.push(data);
            saveFavoritesToLocal(favorites);
            set({ favorites });
            return favorites[index].favorites;
        }
    },
    removeFavorite: (id, type, userId) => {
        let favorites = get().favorites;
        if(!favorites)
            return [];
        const index = favorites.findIndex(e => e.userId === userId);
        favorites[index].favorites = favorites[index].favorites.filter(favorite => favorite.id !== id || favorite.type !== type);
        set({ favorites: favorites });
        saveFavoritesToLocal(favorites);
        return favorites[index].favorites;
    },
    getFavorites: (userId) => {
        if(!userId)
            return [];
        const favorites: FavoriteMovie[] = get().favorites?.find(e => e.userId === userId)?.favorites?? [];
        return favorites;
    },
    hasFavorite: (id, userId) => {
        const favorites: FavoriteMovie[] = get().favorites?.find(e => e.userId === userId)?.favorites?? [];
        return favorites.some(e => e.id === id);
    },
    removeUserFavorite: (userId) => {
        set(state => {
            const favorites : FavoriteLists[] = state.favorites ? state.favorites.filter(e => e.userId !== userId.toString()) : [];
            saveFavoritesToLocal(favorites)
            return state.favorites? {favorites: favorites} : state;
        })
        
    }
}));