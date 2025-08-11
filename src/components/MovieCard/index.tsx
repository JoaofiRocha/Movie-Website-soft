import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { getTMDBImageUrl } from '../../util/tmdb';

interface Props {
    movie: Movie
    type?: 'movie' | 'tv';
}

const MovieCard = ({ movie: {id, poster_path, title}, type = 'movie'  }: Props) => {
    return (
        <article className={styles.displayMovie}>
            <Link to={`/details/${type}/${id}`}>
                <img
                    src={getTMDBImageUrl(poster_path, 'w400')}
                    alt={title}
                    loading="lazy"
                    className={styles.image}
                />
            </Link>
        </article>
    );
}

export default MovieCard;