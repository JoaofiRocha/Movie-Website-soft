
import { getTMDBImageUrl } from "../../../util/tmdb"
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

interface Props {
    movies: Movie[],
    size?: 'w92' | 'w45' | 'w300' | 'original' | 'w1280'
}




const SearchDropdown = (({ movies, size = 'w45' }: Props) => {

    return (
        <ul className={styles.dropdown}>
            {movies.map((e) => (
                <li key={e.id} className={styles.li}>
                    <Link to={`details/movie/${e.id}`} className={styles.dropdownItem}>
                        {e.poster_path ?
                            <img src={getTMDBImageUrl(e.poster_path, size)} alt={e.title} /> : <p className={styles.noImage}>X</p>}

                        <h5 className={styles.title}>{e.title}</h5>
                        <h6 className={styles.item}>{e.release_year}</h6>
                        <h6 className={styles.item}>{e.rating}</h6>
                    </Link>
                </li>
            ))}
        </ul>
    );
});

export default SearchDropdown;