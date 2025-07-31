import axios from 'axios';

const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmI0YWYyY2ExNDgzMTMzOTI0NDM1ZDE2ZGI5NzllZSIsIm5iZiI6MTc1MjM3NzIzMy4xMzMsInN1YiI6IjY4NzMyNzkxYjhlNjg5YTc1OTU0MjgyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pUUCDvQ_V4d_uKKhqgyZpuuCNTvXOwT0yB5nvpFLDm4';


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

export const fetchMovie = async (name : string) => {
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
    catch(error){
        console.error("Error fetching popular movies:", error);
    }
}
