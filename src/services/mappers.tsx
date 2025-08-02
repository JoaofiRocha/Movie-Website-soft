import type { Movie } from '../types/types';

export function mapTMDBMovie(data: any): Movie {
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

export function mapTMDBMovies(data: any): Movie[] {
    let movies = Array.isArray(data) ? data.map((e: any) => mapTMDBMovie(e)) : [];
    movies = movies.sort((a, b) => b.popularity - a.popularity).slice(0, 5);
    return movies
}