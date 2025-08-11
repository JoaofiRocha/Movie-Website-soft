declare global {
    interface MovieDetail {
        id: number,
        backdrop_path: string,
        release_date?: string,
        first_air_date?: string,
        last_air_date?: string,
        episode_number?: number,
        number_of_seasons?: number,
        genres: Genres[],
        budget?: number,
        revenue?: number,
        runtime?: number,
        vote_average: number,
        imdb_id?: string,
        original_language: string,
        tagline: string,
        status: string,
        title: string,
        overview: string,
        cast: Cast[],
        similar: Movies[]
    }
}

export {};