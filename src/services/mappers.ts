interface DataI {
    id: number;
    title: string;
    name: string;
    profile_path: string;
    poster_path: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    genre_ids: number[];
    popularity: number;
    overview: string;
    media_type: string;
}

export function mapTMDBMovie(data: DataI, type?: 'movie' | 'tv' | 'person'): Content {
    if (data.media_type === 'movie' || type === 'movie') {
        return {
            ...data,
            title: data.title,
            rating: data.vote_average,
            poster_path: data.poster_path,
            release_year: data.release_date ? data.release_date.split('-')[0] : '',
            genres: data.genre_ids,
            type: data.media_type,
        };
    }
    else if (data.media_type === 'tv' || type === 'tv') {
        return {
            ...data,
            title: data.name,
            poster_path: data.poster_path,
            rating: data.vote_average,
            release_year: data.first_air_date ? data.first_air_date.split('-')[0] : '',
            genres: data.genre_ids,
            type: data.media_type,
        };
    }
    else {
        return {
            ...data,
            title: data.name,
            poster_path: data.profile_path,
            type: data.media_type,
        }
    }
}



export function mapTMDBMovies(data: DataI[], type?: 'movie' | 'tv' | 'person', limit?: number): (Content)[] {
    if (!Array.isArray(data)) return [];

    let movies: (Content)[] = data.map((e: DataI) => mapTMDBMovie(e, type));
    movies = movies.sort((a, b) => b.popularity - a.popularity);

    if (limit) {
        return movies.slice(0, limit);
    }
    return movies;
}


export function mapDetails(movie: any, type: 'movie' | 'tv'): MovieDetail {
    const content: MovieDetail = {
        ...movie,
        title: movie.title || movie.name,
        similar: mapTMDBMovies(movie.similar.results, type),
        cast: mapCast(movie.credits.cast),
    };
    return content;
}

export function mapPerson(person: any): PersonDetail {
    let backdrop_path = '';
    for (let i = 0; i < person.combined_credits.cast.length; i++) {
        const path = person.combined_credits.cast[i]?.backdrop_path;
        if (path) {
            backdrop_path = path;
            break;
        }
    }


    const content: PersonDetail = {
        ...person,
        backdrop_path: backdrop_path,
        credits_cast: person.combined_credits.cast.map((c: any) => ({
            id: c.id,
            poster_path: c.poster_path,
            title: c.title || c.name,
            character: c.character,
            type: c.media_type,
            rating: c.vote_average ?? c.rating ?? 0,
        })),
        credits_crew: person.combined_credits.crew.map((c: any) => ({
            id: c.id,
            poster_path: c.poster_path,
            title: c.title || c.name,
            job: c.job,
            type: c.media_type,
            rating: c.vote_average ?? c.rating ?? 0
        })),
        area: person.known_for_department,
        type: person.media_type,
        gender:
            person.gender === 1
                ? 'Female ♀︎'
                : person.gender === 2
                    ? 'Male ♂'
                    : person.gender === 3
                        ? 'Non-binary'
                        : 'Not Specified',
    };
    return content;
}

export function mapCast(cast: any[]): Cast[] {
    return cast.map((c) => ({
        id: c.id,
        name: c.name,
        character: c.character,
        profile_path: c.profile_path
    }));
    // .slice(0,8);
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