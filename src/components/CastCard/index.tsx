import { getTMDBImageUrl } from '../../util/tmdb';
import styles from './styles.module.scss';

const castCard = ({cast}: {cast:Cast}) => {
    return (
        <div className={styles.border}>
            <img className={styles.image} src={getTMDBImageUrl(cast.profile_path, 'w200')} alt={cast.name} />
            <p className={styles.texts}>{cast.name}</p>
            <p className={`${styles.texts} ${styles.characterName}`}>{cast.character}</p>
        </div>
    )
};

export default castCard;