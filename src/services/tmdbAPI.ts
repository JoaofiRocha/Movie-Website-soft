import axiosDefault from './axiosDefault';

export const fetchPopularMovies = async (currentPage : number = 1) => {
    try {
        const response = await axiosDefault('GET', 'movie/popular', { language: 'en-US', page: `${currentPage}` })
        return response.results;
    }
    catch (error) {
        console.error("Error fetching popular movies:", error);
    }
}

export const fetchMovie = async (name: string) => {
    try {
        const response = await axiosDefault('GET', 'search/movie', { query: name, include_adult: 'false', language: 'en-US', page: '1' })
        return response.results;
    }
    catch (error) {
        console.error("Error fetching popular movies:", error);
    }
}


export const fetchMovieImages = async (id: number) => {
    try {
        const response = await axiosDefault('GET', `movie/${id}/images`, {include_image_language: 'null'})
        return response;
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
