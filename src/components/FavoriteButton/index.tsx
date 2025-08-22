import buttonStyle from '../../theme/_button.module.scss';
import { useAccountStore } from '../../store/useAccountStore';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { useNavigate } from 'react-router-dom';

interface props {
    type: 'movie' | 'tv'
    movie: Content | MovieDetail | FavoriteMovie,
    isFavorite?: boolean,
    className?: string
}

const FavoriteButton = ({ type, movie, isFavorite, className }: props) => {
    const { addFavorites, removeFavorite, hasFavorite } = useFavoritesStore();
    const { user } = useAccountStore();
    const nav = useNavigate();

    const isCurrentlyFavorite : boolean = user ? hasFavorite(movie.id ,user.id) : false;

    const handleClick = () => {
        if (!user) {
            return;
        }

        if (isCurrentlyFavorite) {
            removeFavorite(movie.id, type, user.id);
        }
        else {
            const favorite: FavoriteMovie = {
                id: movie.id,
                type: type,
                title: movie.title,
                poster_path: movie.poster_path,
                rating: 'rating' in movie ? (movie.rating ?? 0) : 'vote_average' in movie ? (movie.vote_average ?? 0) : 0,
            };
            addFavorites(favorite, user.id);
        }
    }

    return (
        <button className={`${className} ${buttonStyle.favorite}`} onClick={user ? handleClick : () => nav('/login')}>
            {isFavorite || (movie.id && isCurrentlyFavorite) ? '★' : '☆'}
        </button>
    )
}

export default FavoriteButton;