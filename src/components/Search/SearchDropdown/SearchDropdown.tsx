
import { getTMDBImageUrl } from "../../../util/tmdb"
import './SearchDropdown.scss';
import { Link } from 'react-router-dom';
import type { Movie } from '../../../types/types';
import { forwardRef, useImperativeHandle } from 'react';

interface Props {
    movies: Movie[],
    size?: 'w92' | 'w45' | 'w300' | 'original' | 'w1280'
}




const SearchDropdown = forwardRef<HTMLInputElement, Props> (({ movies, size }, ref) => {
    
    return (
        <ul className="search__dropdown">
            {movies.map((e) => (
                <li key={e.id}>
                    <Link to={`/movie/${e.id}`} className="search__dropdown__item --focus --large">
                        <img src={getTMDBImageUrl(e.poster_path, size)} alt="pic" />
                        <h5 className="title">{e.title}</h5>
                        <h6 className='item'>{e.release_year}</h6>
                        <h6 className='item'>{e.rating}</h6>
                    </Link>
                </li>
            ))}
        </ul>
    );
});

export default SearchDropdown;