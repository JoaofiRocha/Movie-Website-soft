import { useAccountStore } from "../../store/useAccountStore";
import styles from './styles.module.scss';
import FavoriteButton from "../../components/FavoriteButton";
import { useEffect, useState } from "react";
import List from '../../components/List/index';
import { getTMDBImageUrl } from "../../util/tmdb";
import { Link } from "react-router-dom";


const Favorites = () => {
    const { getUserFavorites } = useAccountStore();
    const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>([]);
    const [page, setPage] = useState<number>(0);
    const moviesPerPage = 8;
    const { user } = useAccountStore();
    const [numberFilms, setNumberFilms] = useState<number>(0);




    useEffect(() => {
        if (!user) {
            return;
        }

        console.log(page);


        const startIndex = page * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;

        console.log(startIndex);
        console.log(endIndex);
        const favorites = getUserFavorites();
        setNumberFilms(favorites.length);
        setFavoriteMovies(favorites.slice(startIndex, endIndex));
    }, [user,page])

    return (
        <main className={styles.main}>
            <h1>Favorites</h1>

            <List className={styles.list} onChangePage={(e) => setPage(e)} pageMax={moviesPerPage} childrenNumber={numberFilms}>
                {favoriteMovies.map(movie => {
                    return (
                        <li key={movie.id} className={styles.listItem}>
                            <Link className={styles.link} to={`/details/${movie.type}/${movie.id}`}>
                                {movie.poster_path ? <img src={getTMDBImageUrl(movie.poster_path, 'w200')} alt={movie.title} /> : <p className={styles.noImage}>X</p>}

                                <div className={styles.info}>
                                    <h3 className={styles.title}>{movie.title}</h3>
                                    <p>{movie.rating}</p>
                                    <p>{movie.type}</p>
                                </div>
                            </Link>

                            <FavoriteButton type={movie.type} movie={movie} />
                        </li>);
                })}

            </List>
        </main>
    );
}

export default Favorites;