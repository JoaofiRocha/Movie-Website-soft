import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { getTMDBImageUrl } from '../../util/tmdb';

interface Props{
    movie: Movie
}

const MovieCard = ({movie: { title, id, poster_path, release_year, rating }}: Props) => {
    return (
        <article className={styles.displayMovie}>
            <Link to={`/movie/${id}`}>
                <figure className={styles.card}>
                    <img
                        src={getTMDBImageUrl(poster_path, 'w400')}
                        alt={'popular movie poster'}
                        loading="lazy"
                        className={styles.image}
                    />

                    {/* <figcaption className={styles.caption}>
                        <h3 className={styles.captionTitle}> {title}</h3>
                        <section className={styles.captionInfo}>
                            <p>{release_year}</p>
                            <p>
                                {getStarsRating(rating)}
                                ({rating})
                            </p>
                        </section>
                    </figcaption> */}
                </figure>
            </Link>
        </article>
    );
}

export default MovieCard;