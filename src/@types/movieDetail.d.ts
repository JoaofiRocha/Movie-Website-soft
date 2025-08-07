declare global {
    interface MovieDetail {
        id: number,
        backdrop_path: string,
        release_date: string,
        genres: Genres[],
        budget: number,
        revenue: number,
        runtime: number,
        vote_average: number,
        imdb_id: string,
        original_language: string,
        title: string,
        overview: string,
        cast: Cast[],
        similar_movies: Movies[]
    }
}

export {};