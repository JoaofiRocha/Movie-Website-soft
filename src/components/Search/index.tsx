import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import SearchDropdown from './SearchDropdown';
import { fetchMulti } from '../../services/tmdbAPI';
import { mapTMDBMovies } from '../../services/mappers';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/useSearchStore';

interface Props {
    setContent?: (value: Content[]) => void;
    setSearch?: (value: string) => void;
    setPages?: (value: number) => void;
    contentLimit?: number;
    placeholder?: string;
    hasFocus?: boolean;
    isLarge?: boolean;
    type?: "bar" | "search";
    currentPage?: number;
}



const Search = ({ setContent, setSearch, setPages, currentPage = 1, placeholder = "", hasFocus, isLarge, type = "bar", contentLimit }: Props) => {
    const query = useSearchStore((state) => state.query);
    const setQuery = useSearchStore((state) => state.setQuery);

    const [movies, setMovies] = useState<(Content)[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();






    useEffect(() => {
        const onDebounceSearch = debounce(async (query: string) => {
            const data = await fetchMulti(query, currentPage);
            const res = mapTMDBMovies(data?.results, contentLimit);
            setMovies(res);
            if (setContent)
                setContent(res);
            if (setPages)
                setPages(data?.total_pages);
        }, 500);

        if (query.trim() === "") {
            if (setContent)
                setContent([]);
            setMovies([]);
            return;
        }


        onDebounceSearch(query)

        return () => {
            onDebounceSearch.cancel();
        }
    }, [query, type, currentPage])

    const searchClasses = [
        styles.search,
        isLarge ? styles.large : '',
        hasFocus ? styles.focus : ''
    ].join(' ');

    return (
        <form className={styles.form} onSubmit={(e) => {
            e.preventDefault();
            if (type === "search" && query.trim() !== "") {
                navigate('/search', {
                    state: { query: query.trim() }
                })
            }
        }}>

            <input
                className={searchClasses}
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
                onBlur={() => setTimeout(() => { setShowDropdown(false) }, 100)}
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

