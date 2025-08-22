import { create } from 'zustand';
import { getLocalFavorites, saveFavoritesToLocal } from '../util/storeUtil';

interface ActionStore {
    actions: FavoriteLists[] | null;
    addAction: (data: FavoriteMovie, userId: string, list: 'favorite' | 'watched' | 'watchlist') => FavoriteMovie[];
    removeAction: (id: number, type: 'movie' | 'tv', userId: string, list: 'favorite' | 'watched' | 'watchlist') => FavoriteMovie[];
    getActions: (userId: string, list: 'favorite' | 'watched' | 'watchlist') => FavoriteMovie[];
    hasAction: (id: number, userId: string, type: 'movie' | 'tv', list: 'favorite' | 'watched' | 'watchlist') => boolean;
    removeUserAction: (userId: string | number) => void;
}

export const useActionStore = create<ActionStore>((set, get) => ({
    actions: getLocalFavorites(),
    addAction: (data, userId, list) => {
        let actions = get().actions ?? [];
        const index = actions.findIndex(e => e.userId === userId);
        if (index === -1 || index === undefined) {
            actions = [...actions, {
                userId: userId,
                favorite: list === 'favorite' ? [{ ...data }] : [],
                watched: list === 'watched' ? [{ ...data }] : [],
                watchlist: list === 'watchlist' ? [{ ...data }] : []
            }]
            saveFavoritesToLocal(actions);
            set({ actions });
            return [{ ...data }]
        }
        else {
            actions[index][list].push(data);

            saveFavoritesToLocal(actions);
            set({ actions });
            return actions[index][list];
        }
    },
    removeAction: (id, type, userId, list) => {
        let actions = get().actions;
        if (!actions)
            return [];
        const index = actions.findIndex(e => e.userId === userId);
        actions[index][list] = actions[index][list].filter(content => content.id !== id || content.type !== type);

        set({ actions });
        saveFavoritesToLocal(actions);
        return actions[index][list];
    },
    getActions: (userId, list) => {
        if (!userId) return [];
        const user = get().actions?.find(e => e.userId === userId);
        if (!user) return [];
        return user[list];
    },
    hasAction: (id, userId, type, list) => {
        const user: FavoriteLists | undefined = get().actions?.find(e => e.userId === userId);
        const contentList: FavoriteMovie[] | undefined = user ? user[list] : undefined;
        if (!contentList) return false;
        return contentList.some(e => e.id === id && e.type === type);
    },
    removeUserAction: (userId) => {
        set(state => {
            const actions: FavoriteLists[] = state.actions ? state.actions.filter(e => e.userId !== userId.toString()) : [];
            saveFavoritesToLocal(actions)
            return state.actions ? { actions } : state;
        })

    }
}));