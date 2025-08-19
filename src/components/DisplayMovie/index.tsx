import { getTMDBImageUrl, getStarsRating, findGenres } from '../../util/tmdb';
import buttonStyles from '../../theme/_button.module.scss';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton';

interface Prop {
    movie: Content | undefined
}

const DisplayMovie = ({ movie }: Prop) => {
    const isMobile = window.innerWidth < 800;
    // 'w1920_and_h700_multi_faces'
    const imageSize = isMobile ? 'w780' : 'w1280_and_h720_multi_faces';
    const imageUrl = getTMDBImageUrl(movie ? (movie.backdrop_path ?? movie.poster_path ?? '') : '', imageSize);

    return (
        <article className={styles.displayMovie}>
            {movie ? (
                <>
                    <link rel="preload" fetchPriority="high" as="image" href={imageUrl} />

                    <FavoriteButton className={styles.favorite} movie={movie} type={'movie'} />
                    <Link to={`/details/movie/${movie.id}`} className={styles.link} style={{ "--background-image": `url(${imageUrl})` } as React.CSSProperties}>
                        <div className={styles.caption}>
                            <h3 className={styles.captionTitle}> {movie.title}</h3>
                            <section className={styles.captionSection}>
                                <div className={styles.captionButtonDiv} >{findGenres(movie.genres).map(g => <button className={`${styles.captionButton} ${buttonStyles.btnTransparent} ${buttonStyles.btnOff}`} >{g}</button>)}</div>
                                <div className={styles.captionInformation}>
                                    <p>{movie.release_year}</p>
                                    <p>
                                        {getStarsRating(movie.rating)}
                                        ({movie.rating})
                                    </p>
                                </div>
                            </section>
                        </div>

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