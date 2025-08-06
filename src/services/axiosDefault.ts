import axios from 'axios';

const API_KEY = `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`;
const link = 'https://api.themoviedb.org/3/'

interface param {
    language?: 'en-US' | 'pt-BR',
    page?: string,
    query?: string,
    include_adult?: string,
    include_image_language?: string
}


const axiosDefault = async (method: string, url?: string, params?: param) => {
    const response = await axios.request({
        method: method,
        url: link + url,
        params: params,
        headers: {
            accept: 'application/json',
            Authorization: API_KEY
        }
    });

    return response.data;
}


export default axiosDefault;