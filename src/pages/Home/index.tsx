import DisplayMovie from '../../components/DisplayMovie';
import Carrosel from '../../components/Carrosel';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../../services/tmdbAPI';
import { mapTMDBMovie } from '../../services/mappers';


const Home = () => {

    const [movie, setMovie] = useState<Content>();

    useEffect(() => {
        const getMovies = async () => {
            const popularMovies = await fetchPopularMovies();
            const movieIndex = Math.floor(Math.random() * (11));
            // const movieIndex = 1;


            if (popularMovies && popularMovies.length > 0) {
                const mappedMovie = mapTMDBMovie(popularMovies[movieIndex], 'movie');

                setMovie(mappedMovie);
            }
        };

        getMovies();
    }, []);

    return (
        <main className={styles.mainApp}>
            
            <DisplayMovie movie={movie}/>

            <Carrosel/>

            <Carrosel type={'tv'}/>

        </main>
    )
}

export default Home