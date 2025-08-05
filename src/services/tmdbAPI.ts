import axios from 'axios';

const API_KEY = `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`;


export const fetchPopularMovies = async () => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/popular',
            params: { language: 'en-US', page: '1' },
            headers: {
                accept: 'application/json',
                Authorization: API_KEY
            }
        });
        return response.data.results;
    }
    catch (error) {
        console.error("Error fetching popular movies:", error);
    }
}

export const fetchMovie = async (name: string) => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/movie',
            params: { query: name, include_adult: 'false', language: 'en-US', page: '1' },
            headers: {
                accept: 'application/json',
                Authorization: API_KEY
            }
        });
        return response.data.results;
    }
    catch (error) {
        console.error("Error fetching popular movies:", error);
    }
}


export const fetchMovieImages = async (id: number) => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}/images`,
            params: {include_image_language: 'null'},
            headers: {
                accept: 'application/json',
                Authorization: API_KEY
            }
        });

        return response.data
    }
    catch (err) {
        console.log("Error fetchMovieImages: ", err);
    }
}

export const fetchBackDrop = async (id: number) => {
    try{
        const response = await fetchMovieImages(id);
        return response.backdrops[0].file_path;
    }
    catch(err){
        console.log('error fetching backdrops: ', err);
    }
}
