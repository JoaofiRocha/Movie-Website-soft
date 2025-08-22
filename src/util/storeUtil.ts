

export function getLocalUsers(): User[] | null {
    try {
        const storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (error) {
        return [];
    }
}

export function getLocalCurrentUser(): User | null {
    try {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        return null;
    }
}

export function saveUsersToLocal(users: User[] | undefined): void {
    if (!users)
        return;
    localStorage.setItem('users', JSON.stringify(users));
}

export function doesUserExist(users: User[] | null ,userData: User, userId? : string): boolean {
    if (!users) return false;

    const list = users.filter(u => (userId ? u.id !== userId : null) && (u.user === userData.user || u.email === userData.email));
    if(list.length != 0)
        return true;
    return false;
}


export function doesAccountMatch(users: User[] | null ,userData: User): User | null {
    if (!users) return null;

    const user = users.find(u => u.email === userData.email);
    if(user && user.password === userData.password){
        return user;
    }
    return null;
}

export function getLocalFavorites(): FavoriteLists[] | null {
    try {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : null;
    } catch (error) {
        return [];
    }
}

export function saveFavoritesToLocal(favorites: FavoriteLists[] | undefined): void {
    if (!favorites)
        return;
    localStorage.setItem('favorites', JSON.stringify(favorites));
}




