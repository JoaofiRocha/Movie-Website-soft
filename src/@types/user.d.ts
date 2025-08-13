declare global {
    interface User {
        id: string;
        user: string;
        email: string;
        password: string;
        favorites: FavoriteMovie[];
    }
}
export {};