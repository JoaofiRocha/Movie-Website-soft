import buttonStyle from '../../theme/_button.module.scss';
import { useAccountStore } from '../../store/useAccountStore';
import { useActionStore } from '../../store/useActionsStore';
import { useNavigate } from 'react-router-dom';

interface props {
    type: 'movie' | 'tv'
    movie: Content | MovieDetail | Poster | FavoriteMovie,
    isFavorite?: boolean,
    className?: string
}

const FavoriteButton = ({ type, movie, isFavorite, className }: props) => {
    const { addAction, removeAction, hasAction } = useActionStore();
    const { user } = useAccountStore();
    const nav = useNavigate();

    const isCurrentlyFavorite : boolean = user ? hasAction(movie.id, user.id, type, 'favorite') : false;

    const handleClick = () => {
        if (!user) {
            return;
        }

        if (isCurrentlyFavorite) {
            removeAction(movie.id, type, user.id, 'favorite');
        }
        else {
            const favorite: FavoriteMovie = {
                id: movie.id,
                type: type,
                title: movie.title,
                poster_path: movie.poster_path,
                rating: 'rating' in movie ? (movie.rating ?? 0) : 'vote_average' in movie ? (movie.vote_average ?? 0) : 0,
            };
            addAction(favorite, user.id, 'favorite');
        }
    }

    return (
        <button className={`${className} ${buttonStyle.favorite}`} onClick={user ? handleClick : () => nav('/login')}>
            {isFavorite || (movie.id && isCurrentlyFavorite) ? '★' : '☆'}
        </button>
    )
}

export default FavoriteButton;