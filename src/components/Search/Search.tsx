import { useState, useEffect, useCallback, useRef, useImperativeHandle } from 'react';
import './Search.scss';
import SearchDropdown from './SearchDropdown/SearchDropdown';
import type { Movie } from '../../types/types';
import { fetchMovie } from '../../services/tmdbAPI';
import { mapTMDBMovies } from '../../services/mappers';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';

interface Props {
    setSearch?: (value: string) => void;
    placeholder?: string;
    className?: string;
    type?: "bar" | "search";
}



const Search = ({ setSearch, placeholder = "", className = "", type = "bar" }: Props) => {
    const [query, setQuery] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();


    const onDebounceSearch = useCallback(debounce(async (query: string) => {
        const data = await fetchMovie(query);
        const res = mapTMDBMovies(data);
        setMovies(res);
    }, 1500), [])


    useEffect(() => {
        if (type === "search") {
            if (query.trim() === "") {

                setMovies([]);
                return;
            }
            onDebounceSearch(query)
        }
    }, [query])


    return (
        <form className='search-results' onSubmit={(e) => {
            e.preventDefault();
            if (type === "search" && query.trim() !== "") {
                navigate(`/search/${query.trim()}`);
            }
        }}>

            <input
                className={`search ${className}`}
                onChange={(e) => {
                    if (type === "bar" && setSearch) {
                        setSearch(e.target.value);
                    }
                    else if (type === "search") {
                        setQuery(e.target.value);
                    }
                }}
                placeholder={placeholder}
                onBlur={() => setShowDropdown(false)}
                onFocus={() => setShowDropdown(true)}
                ref={inputRef}
            />




            {
                (type === "search" && showDropdown && movies.length > 0) && (
                    <SearchDropdown movies={movies} />
                )
            }
        </form >

    );
};

export default Search;

