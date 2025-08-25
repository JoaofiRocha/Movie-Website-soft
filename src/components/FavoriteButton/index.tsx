import buttonStyle from '../../theme/_button.module.scss';
import { useAccountStore } from '../../store/useAccountStore';
import { useActionStore } from '../../store/useActionsStore';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

interface props {
    type: 'favorite' | 'watched' | 'watchlist',
    contentType: 'movie' | 'tv'
    movie: Content | MovieDetail | Poster | FavoriteMovie,
    isFavorite?: boolean,
    className?: string
}

const FavoriteButton = ({ type, contentType, movie, isFavorite, className }: props) => {
    const { addAction, removeAction, hasAction } = useActionStore();
    const { user } = useAccountStore();
    const nav = useNavigate();

    const isCurrentlyFavorite: boolean = user ? hasAction(movie.id, user.id, contentType, type) : false;

    const handleClick = () => {
        if (!user) {
            return;
        }

        if (isCurrentlyFavorite) {
            removeAction(movie.id, contentType, user.id, type);
        }
        else {
            const favorite: FavoriteMovie = {
                id: movie.id,
                type: contentType,
                title: movie.title,
                poster_path: movie.poster_path,
                rating: 'rating' in movie ? (movie.rating ?? 0) : 'vote_average' in movie ? (movie.vote_average ?? 0) : 0,
            };
            addAction(favorite, user.id, type);
        }
    }

    return (
        <button className={`${className} ${buttonStyle.favorite}`} onClick={user ? handleClick : () => nav('/login')}>
            {(() => {
                if (type === 'favorite') {
                    return isFavorite || (movie.id && isCurrentlyFavorite) ?
                        (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.size}>
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                        )
                        :
                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.size}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        );
                }
                if (type === 'watched') {
                    return isFavorite || (movie.id && isCurrentlyFavorite) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.size}>
                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.size}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    );
                }
                else {
                    return isFavorite || (movie.id && isCurrentlyFavorite) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.size}>
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                        </svg>

                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.size}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    );
                }
            })()
            }
        </button>
    )
}

export default FavoriteButton;