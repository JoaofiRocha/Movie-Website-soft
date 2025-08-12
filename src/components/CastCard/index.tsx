import { getTMDBImageUrl } from '../../util/tmdb';
import styles from './styles.module.scss';

const castCard = ({cast}: {cast:Cast}) => {
    return (
        <div className={styles.border}>
            {cast.profile_path ? <img className={styles.image} src={getTMDBImageUrl(cast.profile_path, 'w200')} alt={cast.name} /> : null}
            <p className={styles.actor}>{cast.name}</p>
            <p className={`${styles.character}`}>{cast.character}</p>
        </div>
    )
};

export default castCard;