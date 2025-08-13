import { create } from 'zustand';
import { getLocalCurrentUser } from '../util/userStoreUtil';

interface AccountStore {
    user: User | null;
    setAccount: (data: User | null) => void;
    setAccountLocal: () => void;
    logout: () => void;
    getUserFavorites: () => FavoriteMovie[];
}

export const useAccountStore = create<AccountStore>((set, get) => ({
    user: getLocalCurrentUser() ?? null,
    setAccount: (data) => set(() => {
        localStorage.setItem('currentUser', data ? JSON.stringify(data) : '');
        return { user: data};
    }),
    setAccountLocal: () => set({user: getLocalCurrentUser()}),
    logout: () => set((state) => {
        if (state.user !== null){
            localStorage.setItem('currentUser', '');
        }
        return {user: null}
    }),
    getUserFavorites: () => {
        const state : User | null = get().user;
        if(!state)
            return [];
        return state.favorites ?? [];
    }
    
}));