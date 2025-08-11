import { fetchPopularMovies, fetchBackDrop } from '../../services/tmdbAPI';
import { useState, useEffect } from 'react';
import { getTMDBImageUrl, getStarsRating, findGenres } from '../../util/tmdb';
import buttonStyles from '../../theme/_button.module.scss';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { mapTMDBMovie } from '../../services/mappers';

const DisplayMovie = () => {
    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {
        const getMovies = async () => {
            const popularMovies = await fetchPopularMovies();
            const movieIndex = Math.floor(Math.random() * (11));
            // const movieIndex = 1;


            if (popularMovies && popularMovies.length > 0) {
                const backdrop = await fetchBackDrop(popularMovies[movieIndex].id);
                const mappedMovie = mapTMDBMovie(popularMovies[movieIndex]);

                if (backdrop)
                    setMovie({ ...mappedMovie, poster_path: backdrop });
                else
                    setMovie(mappedMovie);
            }
        };

        getMovies();
    }, []);
    return (
        <article className={styles.displayMovie}>
            {movie ? (
                <Link to={`/details/movie/${movie.id}`} className={styles.link}>
                    <figure className={styles.card}>
                        <img
                            src={getTMDBImageUrl(movie.poster_path, 'w1920_and_h800_multi_faces')}
                            alt={'popular movie poster'}
                            className={styles.image}
                        />
                        <figcaption className={styles.caption}>
                            <h3 className={styles.captionTitle}> {movie.title}</h3>
                            <section >
                                <div>{findGenres(movie.genres).map(g => <button className={buttonStyles.btnOff} disabled>{g}</button>)}</div>
                                <div className={styles.captionInformation}>
                                    <p>{movie.release_year}</p>
                                    <p>
                                        {getStarsRating(movie.rating)}
                                        ({movie.rating})
                                    </p>
                                </div>
                            </section>

                            <p className={styles.captionOverview}>{movie.overview}</p>


                        </figcaption>
                    </figure>
                </Link>
            ) : (
                <p>Loading...</p>
            )}
        </article>
    );
}

export default DisplayMovie;