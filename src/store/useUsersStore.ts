import { create } from 'zustand';
import {getLocalUsers, saveUsersToLocal} from '../util/userStoreUtil.ts';

interface UsersStore {
    users: User[] | null;
    setUsers: (data: string) => void;
    setUsersLocal: () => void;
    addUser: (data : User) => void;
    removeUser: (data : string) => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
    users: getLocalUsers(),
    setUsers: (data) => set({users : JSON.parse(data)}),
    setUsersLocal: () => set({users: getLocalUsers()}),
    addUser: (data) => set((state) => {
        const updatedUsers = state.users ? [...state.users, data] : [data];
        saveUsersToLocal(updatedUsers);
        return { users: updatedUsers };
    }),
    removeUser: (data) => set((state) => {
        const updatedUsers = state.users?.filter(u => u.user === data);
        saveUsersToLocal(updatedUsers);
        return { users: updatedUsers };
    })
}));




