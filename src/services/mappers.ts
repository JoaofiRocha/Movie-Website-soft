interface DataI {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    genre_ids: Genre[];
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
        genres: data.genre_ids,
        popularity: data.popularity,
        overview: data.overview
    };
}



export function mapTMDBMovies(data: DataI[], limit?: number): Movie[] {
if (!Array.isArray(data)) return [];

    let movies : Movie[] = data.map((e: DataI) => mapTMDBMovie(e));
    movies = movies.sort((a, b) => b.popularity - a.popularity);

    if(limit){
        return movies.slice(0,limit);
    }
    return movies;
}


export function mapDetails(movie: any) : MovieDetail {
    const content : MovieDetail = {
        ...movie,
        title: movie.title || movie.name,
        similar: mapTMDBMovies(movie.similar.results),
        cast: mapCast(movie.credits.cast),
        };
    return content;
}

export function mapCast(cast: any[]): Cast[] {
    return cast.map((c) => ({
        id: c.id,
        name: c.name,
        character: c.character,
        profile_path: c.profile_path
    })).slice(0,8);
}



// interface MovieDetail {
//         id: number,
//         backdrop_path: string,
//         release_date?: string,
//         first_air_date?: string,
//         last_air_date?: string,
//         episode_number?: number,
//         number_of_seasons?: number,
//         genres: Genres[],
//         budget?: number,
//         revenue?: number,
//         runtime?: number,
//         vote_average: number,
//         imdb_id?: string,
//         original_language: string,
//         title: string,
//         overview: string,
//         cast: Cast[],
//         similar: Movies[]
//     }