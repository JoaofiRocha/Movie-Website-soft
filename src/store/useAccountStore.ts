import { create } from 'zustand';
import { getLocalCurrentUser } from '../util/userStoreUtil';

interface AccountStore {
    user: User | null;
    setAccount: (data: User) => void;
    setAccountLocal: () => void;
    logout: () => void;
}

export const useAccountStore = create<AccountStore>((set) => ({
    user: getLocalCurrentUser(),
    setAccount: (data) => set(() => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        return { user: data};
    }),
    setAccountLocal: () => set({user: getLocalCurrentUser()}),
    logout: () => set((state) => {
        if (state.user !== null){
            localStorage.setItem('currentUser', '');
        }
        return {user: null}
    })
}));