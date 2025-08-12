import buttonStyle from '../../theme/_button.module.scss';

interface props{
    favorites?: number[],
    movieId?: number,
    isFavorite?: boolean,
    className?: string
}

const FavoriteButton = ({favorites, movieId, isFavorite, className } : props) => {
    return(
        <button className={`${className} ${buttonStyle.favorite}`}>{isFavorite || (movieId && favorites?.includes(movieId)) ? '★' : '☆'}</button>
    )
}

export default FavoriteButton;