import { create } from 'zustand';
import {getLocalUsers, saveUsersToLocal} from '../util/userStoreUtil.ts';

interface UsersStore {
    users: User[] | null;
    setUsers: (data: string) => void;
    setUsersLocal: () => void;
    addUser: (data : User) => void;
    removeUser: (data : string) => void;
    modifyUser: (data : User) => void;
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
        const updatedUsers = state.users?.filter(u => u.id !== data);
        saveUsersToLocal(updatedUsers);
        return { users: updatedUsers };
    }),
    modifyUser: (data) => set((state) => {
        if (!state.users || !data.id)
            return state;
        const index = state.users.findIndex(u => u.id === data.id);
        const updatedUsers : User[] = [...state.users];
        updatedUsers[index] = data;

        saveUsersToLocal(updatedUsers);
        return {users: updatedUsers }
    }),
}));




