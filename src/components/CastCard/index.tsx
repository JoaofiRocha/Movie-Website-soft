import { Link } from 'react-router-dom';
import { getTMDBImageUrl } from '../../util/tmdb';
import styles from './styles.module.scss';

const castCard = ({cast}: {cast:Cast}) => {
    return (
        <Link to={`/details/person/${cast.id}`} className={styles.border}>
            {cast.profile_path ? <img className={styles.image} src={getTMDBImageUrl(cast.profile_path, 'w200')} alt={cast.name} /> : null}
            <p className={styles.actor}>{cast.name}</p>
            <p className={`${styles.character}`}>{cast.character}</p>
        </Link>
    )
};

export default castCard;