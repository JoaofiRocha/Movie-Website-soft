import styles from './styles.module.scss';
import Search from "../../components/Search";
import List from '../../components/List/index';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
    const [movies, setMovies] = useState<Content[]>([])
    const [pages, setPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    return (
        <main className={styles.main}>
            <Search currentPage={currentPage} setPages={setPages} setContent={setMovies} type={'bar'} placeholder='Search for Movie or Tv...'/>

            <List listMovie={movies} hasFilter={false} pageMax={20} numberOfPages={pages} onChangePage={setCurrentPage}/>
        </main>
    );
}

export default SearchPage;