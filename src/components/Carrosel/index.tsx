import Swipe from "./Swiper";
import { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../../services/tmdbAPI';
import { mapTMDBMovies } from '../../services/mappers';

const Carrosel = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const getMovies = async () => {
            const popularMovies = await fetchPopularMovies();


            if (popularMovies && popularMovies.length > 0) {
                const mappedMovie = mapTMDBMovies(popularMovies);
                setMovies(mappedMovie);
            }
        };

        getMovies();
    }, []);

    const carroselNearEnd = () => {
        const getNewMovies = async () => {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            const popularMovies = await fetchPopularMovies(nextPage);


            if (popularMovies && popularMovies.length > 0) {
                const mappedMovie = mapTMDBMovies(popularMovies);
                setMovies((prev) => prev.concat(mappedMovie));
            }
        };

        console.log("chegou");
        getNewMovies();
    }

    return (
        movies.length === 0 ? (
            <p>Loading movies...</p>
        ) : (
            <Swipe movies={movies} nearEnd={carroselNearEnd} />
        )
    )
}

export default Carrosel;