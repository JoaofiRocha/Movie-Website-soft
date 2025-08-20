import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { getTMDBImageUrl } from '../../util/tmdb';

interface Props {
    movie: Content | FavoriteMovie
    type?: 'movie' | 'tv';
}

const MovieCard = ({ movie: {id, poster_path, title}, type = 'movie'  }: Props) => {
    return (
        <article className={styles.displayMovie}>
            <Link to={`/details/${type}/${id}`}>
                <img
                    src={getTMDBImageUrl(poster_path, 'w300')}
                    alt={`Poster for ${title}`}
                    loading="lazy"
                    className={styles.image}
                />
            </Link>
        </article>
    );
}

export default MovieCard;