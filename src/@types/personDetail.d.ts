interface PersonDetail {
    id: number,
    name: string,
    profile_path?: string,
    imdb_id?: string,
    biography?: string,
    backdrop_path?: string,
    credits_cast?: {
        id: number,
        poster_path: string,
        title: string,
        character?: string,
        type: 'movie' | 'tv',
        rating:number
    }[],
    credits_crew?: {
        id: number,
        poster_path: string,
        title: string,
        job?: string,
        type: 'movie' | 'tv',
        rating:number
    }[],
    gender: string,
    area?: string,
    birthday?: string,
    deathday?: string,
}