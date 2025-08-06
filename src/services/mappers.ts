interface DataI {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    popularity: number;
    overview: string;
}

export function mapTMDBMovie(data: DataI): Movie {
    return {
        id: data.id,
        title: data.title,
        poster_path: data.poster_path,
        rating: data.vote_average,
        release_year: data.release_date ? data.release_date.split('-')[0] : '',
        popularity: data.popularity,
        overview: data.overview
    };
}



export function mapTMDBMovies(data: DataI[], limit?: number): Movie[] {
if (!Array.isArray(data)) return [];

    let movies : Movie[] = data.map((e: DataI) => mapTMDBMovie(e));
    movies = movies.sort((a, b) => b.popularity - a.popularity);

    if (limit)
        return movies.slice(limit);
    return movies;
}
