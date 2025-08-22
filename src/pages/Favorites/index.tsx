import { useAccountStore } from "../../store/useAccountStore";
import styles from './styles.module.scss';
import { useEffect, useState } from "react";
import List from '../../components/List/index';
import { useActionStore } from "../../store/useActionsStore";


const Favorites = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>([]);
    const moviesPerPage = 8;
    const { user } = useAccountStore();
    const { actions, getActions } = useActionStore();




    useEffect(() => {
        if(user)
            setFavoriteMovies(getActions(user.id, 'favorite'));
    }, [actions])

    return (
        <main className={styles.main}>
            <h1>Favorites</h1>

            <List className={styles.list} pageMax={moviesPerPage} listMovie={favoriteMovies}/>
        </main>
    );
}

export default Favorites;