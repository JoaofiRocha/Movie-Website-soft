declare global {
    interface Movie {
        id: number,
        poster_path: string,
        backdrop_path?: string,
        release_year: string,
        rating: number,
        title: string,
        genres: number[],
        popularity: number,
        overview: string
    }
}

export {};