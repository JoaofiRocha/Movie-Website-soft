import buttonStyle from '../../theme/_button.module.scss';
import { useAccountStore } from '../../store/useAccountStore';
import { useUsersStore } from '../../store/useUsersStore';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { useNavigate } from 'react-router-dom';

interface props {
    type: 'movie' | 'tv'
    movie: Movie | MovieDetail | FavoriteMovie,
    isFavorite?: boolean,
    className?: string
}

const FavoriteButton = ({ type, movie, isFavorite, className }: props) => {
    const { getFavorites, addFavorites, removeFavorite } = useFavoritesStore();
    const { modifyUser } = useUsersStore();
    const { setAccount, user } = useAccountStore();
    const nav = useNavigate();

    const isCurrentlyFavorite = getFavorites()?.some(fav => 
            fav.id === movie.id && fav.type === type
        );

    const handleClick = () => {
        if (!user) {
            return;
        }

        let updatedFavorites;

        if (isCurrentlyFavorite) {
            updatedFavorites = removeFavorite(movie.id,type);
        }
        else {
            const favorite : FavoriteMovie = {
                id: movie.id,
                type: type,
                title:movie.title,
                poster_path: movie.poster_path,
                rating: 'rating' in movie ? movie.rating : movie.vote_average
            };
            updatedFavorites = addFavorites(favorite);
        }

        const updatedUser: User = { ...user, favorites: updatedFavorites };
        setAccount(updatedUser);
        modifyUser(updatedUser);
    }

    return (
        <button className={`${className} ${buttonStyle.favorite}`} onClick={user ? handleClick : () => nav('/login')}>
            {isFavorite || (movie.id && isCurrentlyFavorite) ? '★' : '☆'}
        </button>
    )
}

export default FavoriteButton;