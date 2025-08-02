import { fetchPopularMovies, fetchBackDrop } from '../../services/tmdbAPI';
import type { Movie } from '../../types/types';
import { useState, useEffect } from 'react';
import { getTMDBImageUrl, getStarsRating } from '../../util/tmdb';
import './DisplayMovie.scss';
import { Link } from 'react-router-dom';
import { mapTMDBMovie } from '../../services/mappers';

const DisplayMovie = () => {
    const [movie, setMovie] = useState<Movie>();
    const popularMovie = Math.floor(Math.random() * (11));

    useEffect(() => {
        const getMovies = async () => {
            if (movie) return;
            const popularMovies = await fetchPopularMovies();
            if (popularMovies && popularMovies.length > 0) {
                const backdrop = await fetchBackDrop(popularMovies[popularMovie].id);
                const mappedMovie = mapTMDBMovie(popularMovies[popularMovie]);
                setMovie({ ...mappedMovie, poster_path: backdrop });
            }
        };

        getMovies();
    }, []);


    return (
        <article className="display-movie">
            {movie ? (
                <Link to={`/movie/${movie.id}`} className='link'>
                    <figure className='display-movie__card'>
                        <img
                            src={getTMDBImageUrl(movie.poster_path, 'original')} alt={'popular movie poster'} />
                        <figcaption className='image-caption'>
                            <h3 className='movie-title'>{movie.title}</h3>
                            <section className='movie-info'>
                                <p>{movie.release_year}</p>
                                <p>
                                    {getStarsRating(movie.rating)}
                                    ({movie.rating})
                                </p>
                            </section>

                            <p className='movie-overview'>{movie.overview}</p>


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