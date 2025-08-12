import buttonStyle from '../../theme/_button.module.scss';
import { useAccountStore } from '../../store/useAccountStore';
import { useUsersStore } from '../../store/useUsersStore';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { useNavigate } from 'react-router-dom';

interface props {
    favorites?: number[],
    movieId: number,
    isFavorite?: boolean,
    className?: string
}

const FavoriteButton = ({ movieId, isFavorite, className }: props) => {
    const { getFavorites, addFavorites, removeFavorite } = useFavoritesStore();
    const { modifyUser } = useUsersStore();
    const { setAccount, user } = useAccountStore();
    const nav = useNavigate();

    const favorites = getFavorites();

    const handleClick = () => {
        if (!user) {
            return;
        }

        console.log(favorites);
        let updatedFavorites;
        if (favorites?.includes(movieId)) {
            updatedFavorites = removeFavorite(movieId);
        }
        else {
            updatedFavorites = addFavorites(movieId);
            console.log(movieId);
            console.log(updatedFavorites);
        }

        const updatedUser: User = { ...user, favorites: updatedFavorites };
        setAccount(updatedUser);
        modifyUser(updatedUser);
    }

    return (
        <button className={`${className} ${buttonStyle.favorite}`} onClick={user ? handleClick : () => nav('/login')}>
            {isFavorite || (movieId && favorites?.includes(movieId)) ? '★' : '☆'}
        </button>
    )
}

export default FavoriteButton;