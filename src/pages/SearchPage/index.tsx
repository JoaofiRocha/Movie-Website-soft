import styles from './styles.module.scss';
import Search from "../../components/Search";
import List from '../../components/List/index';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMulti } from '../../services/tmdbAPI';
import { mapTMDBMovies } from '../../services/mappers';
import { debounce } from 'lodash';

const SearchPage = () => {
    const [params] = useSearchParams();
    const [movies, setMovies] = useState<Content[]>([])
    const [pages, setPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [query, setQuery] = useState<string>(params.get('query')??'');

    const onDebounceSearch = debounce(async (query: string, page: number) => {
        const data = await fetchMulti(query, page);
        const res = mapTMDBMovies(data?.results);
        setPages(data?.total_pages);
        setMovies(res);
    }, 500);

    useEffect(() => {
        const queryParam = params.get('query');
        if (!queryParam || queryParam.trim() === "") {
            setMovies([]);
            return;
        }
        setQuery(queryParam)
        onDebounceSearch(queryParam, 1)


        return () => {
            onDebounceSearch.cancel();
        }
    }, [params])

    useEffect(() => {
        if (query.trim() === "") {
            setMovies([]);
            return;
        }
        onDebounceSearch(query, currentPage)


        return () => {
            onDebounceSearch.cancel();
        }
    }, [currentPage])

    return (
        <main className={styles.main}>
            <Search className={styles.bar} initialValue={query} type={'bar'} placeholder='Search for Movie or Tv ...' />

            <List className={styles.list} query={query} listMovie={movies} hasFilter={false} pageMax={20} numberOfPages={pages} onChangePage={setCurrentPage} />
        </main>
    );
}

export default SearchPage;