import { useState, useEffect, useRef } from 'react';
import './Search.scss';
import SearchDropdown from './SearchDropdown/SearchDropdown';
import type { Movie } from '../../types/types';
import { fetchMovie } from '../../services/tmdbAPI';
import { mapTMDBMovies } from '../../services/mappers';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/useSearchStore';

interface Props {
    setSearch?: (value: string) => void;
    placeholder?: string;
    className?: string;
    type?: "bar" | "search";
}



const Search = ({ setSearch, placeholder = "", className = "", type = "bar" }: Props) => {
    const query = useSearchStore((state) => state.query);
    const setQuery = useSearchStore((state) => state.setQuery);

    const [movies, setMovies] = useState<Movie[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();





    useEffect(() => {

        const onDebounceSearch = debounce(async (query: string) => {
            const data = await fetchMovie(query);
            const res = mapTMDBMovies(data);
            setMovies(res);
            console.log(res);
        }, 500);

        if (type === "search") {
            if (query.trim() === "") {

                setMovies([]);
                return;
            }
            onDebounceSearch(query)
        }

        return () => {
            onDebounceSearch.cancel();
        }
    }, [query, type])


    return (
        <form className='search-form' onSubmit={(e) => {
            e.preventDefault();
            if (type === "search" && query.trim() !== "") {
                navigate('/search', {
                    state: { query: query.trim() }
                })
            }
        }}>

            <input
                className={`search ${className}`}
                value={query}
                type='search'
                autoCorrect='off'
                placeholder={placeholder}
                onChange={(e) => {
                    if (type === "bar" && setSearch) {
                        setSearch(e.target.value);
                    }

                    setQuery(e.target.value);

                }}
                onBlur={() => setTimeout(() => {setShowDropdown(false)}, 1)}
                onFocus={() => setShowDropdown(true)}
                ref={inputRef}

            />




            {
                (type === "search" && showDropdown && movies.length > 0) && (
                    <SearchDropdown movies={movies} size='w45' />
                )
            }
        </form >

    );
};

export default Search;

