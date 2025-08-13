import { fetchPopularMovies, fetchBackDrop } from '../../services/tmdbAPI';
import { useState, useEffect } from 'react';
import { getTMDBImageUrl, getStarsRating, findGenres } from '../../util/tmdb';
import buttonStyles from '../../theme/_button.module.scss';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { mapTMDBMovie } from '../../services/mappers';
import FavoriteButton from '../FavoriteButton';

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
                    setMovie({ ...mappedMovie, backdrop_path: backdrop });
                else
                    setMovie(mappedMovie);
            }
        };

        getMovies();
    }, []);
    return (
        <article className={styles.displayMovie}>
            {movie ? (
                <>
                    <FavoriteButton className={styles.favorite} movie={movie} type={'movie'}/>
                    <Link to={`/details/movie/${movie.id}`} className={styles.link} style={{ "--background-image": `url(${getTMDBImageUrl(movie.backdrop_path ?? movie.poster_path , 'w1920_and_h800_multi_faces')})` } as React.CSSProperties}>

                        <h3 className={styles.captionTitle}> {movie.title}</h3>
                        <section >
                            <div className={styles.captionButtonDiv} >{findGenres(movie.genres).map(g => <span className={`${styles.captionButton} ${buttonStyles.btnTransparent} ${buttonStyles.btnOff}`} >{g}</span>)}</div>
                            <div className={styles.captionInformation}>
                                <p>{movie.release_year}</p>
                                <p>
                                    {getStarsRating(movie.rating)}
                                    ({movie.rating})
                                </p>
                            </div>
                        </section>

                        <p className={styles.captionOverview}>{movie.overview}</p>

                    </Link>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </article>
    );
}

export default DisplayMovie;