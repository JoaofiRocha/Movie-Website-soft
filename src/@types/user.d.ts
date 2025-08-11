declare global {
    interface User {
        user: string;
        email: string;
        password: string;
        favorites: number[];
    }
}
export {};