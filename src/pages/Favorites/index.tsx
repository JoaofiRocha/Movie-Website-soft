import { useAccountStore } from "../../store/useAccountStore";
import styles from './styles.module.scss';
import { useEffect, useState } from "react";
import List from '../../components/List/index';


const Favorites = () => {
    const { getUserFavorites } = useAccountStore();
    const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>([]);
    const moviesPerPage = 8;
    const { user } = useAccountStore();




    useEffect(() => {
        setFavoriteMovies(getUserFavorites());
    }, [user])

    return (
        <main className={styles.main}>
            <h1>Favorites</h1>

            <List className={styles.list} pageMax={moviesPerPage} listMovie={favoriteMovies}/>
        </main>
    );
}

export default Favorites;