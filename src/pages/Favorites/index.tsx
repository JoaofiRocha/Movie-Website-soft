import { useAccountStore } from "../../store/useAccountStore";
import styles from './styles.module.scss';
import { useEffect, useState } from "react";
import List from '../../components/List/index';
import { useFavoritesStore } from "../../store/useFavoritesStore";


const Favorites = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>([]);
    const moviesPerPage = 8;
    const { user } = useAccountStore();
    const { favorites ,getFavorites } = useFavoritesStore();




    useEffect(() => {
        if(user)
            setFavoriteMovies(getFavorites(user.id));
    }, [favorites])

    return (
        <main className={styles.main}>
            <h1>Favorites</h1>

            <List className={styles.list} pageMax={moviesPerPage} listMovie={favoriteMovies}/>
        </main>
    );
}

export default Favorites;