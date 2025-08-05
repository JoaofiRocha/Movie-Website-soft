import type { Movie } from '../../types/types';

const MovieCard = ({movie} : {movie : string}) => {
    return(
        <section>
            <p>{movie}</p>
        </section>
    );
}

export default MovieCard;