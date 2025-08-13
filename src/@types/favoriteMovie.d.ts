declare global {
    interface FavoriteMovie {
        id: number,
        release_year?: string,
        rating: number,
        title: string,
        poster_path: string,
        type : 'movie' | 'tv',
    }
}

export {};