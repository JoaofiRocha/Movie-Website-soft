import styles from './styles.module.scss';
import { useEffect, useState } from "react";
import List from '../../components/List/index';
import { useActionStore } from "../../store/useActionsStore";
import { useParams } from "react-router-dom";


const Favorites = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>([]);
    const moviesPerPage = 8;
    const { actions, getActions } = useActionStore();
    const {type,id} = useParams();




    useEffect(() => {
        if(id)
            setFavoriteMovies(getActions(id, type as 'favorite' | 'watched' | 'watchlist'));
    }, [actions, id])

    return (
        <main className={styles.main}>
            <h1>Favorites</h1>

            <List className={styles.list} pageMax={moviesPerPage} listMovie={favoriteMovies}/>
        </main>
    );
}

export default Favorites;