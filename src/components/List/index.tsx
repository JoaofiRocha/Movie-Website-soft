import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTMDBImageUrl } from '../../util/tmdb';
import FavoriteButton from '../FavoriteButton';

interface Props {
    items?: number[];
    className?: string;
    pageMax?: number;
    listMovie: FavoriteMovie[] | Content[];
    onChangePage?: (page: number) => void;
    hasFilter?: boolean;
    numberOfPages?: number;
    query?:string;
}



const List = ({ className, pageMax = 5, listMovie, onChangePage, hasFilter = true, numberOfPages, query }: Props) => {
    const [selectedPage, setSelectedPage] = useState<number>(0);
    const [movies, setMovies] = useState<(FavoriteMovie | Content)[]>(listMovie)
    const [filter, setFilter] = useState<string>('');
    const [filteredList, setFilteredList] = useState<(FavoriteMovie | Content)[]>(listMovie)

    const pages = numberOfPages ?? Math.ceil(filteredList.length / pageMax);


    useEffect(() => {
        let list;
        if (filter.trim() === '') {
            list = listMovie;
        } else {
            list = listMovie.filter(m =>
                m.title.toLowerCase().includes(filter.toLowerCase())
            );
        }
        setFilteredList(list);
        setSelectedPage(0);
        setMovies(list.slice(0, pageMax));
    }, [filter]);

    useEffect(() => {
        let list;
        if (!hasFilter || filter.trim() === '') {
            list = listMovie;
        } else {
            list = listMovie.filter(m =>
                m.title.toLowerCase().includes(filter.toLowerCase())
            );
        }
        setFilteredList(list);
        if (hasFilter) {
            const startIndex = selectedPage * pageMax;
            setMovies(list.slice(startIndex, startIndex + pageMax));
        }
        else
            setMovies(list);
    }, [listMovie]);

    useEffect(() => {
        setSelectedPage(0);
    },[query])


    const changePage = (index: number = selectedPage, list: (FavoriteMovie | Content)[] = filteredList) => {
        if (onChangePage) {
            console.log(index + 1);
            onChangePage(index + 1);
            setMovies(list);
            setSelectedPage(index);
            return;
        }

        setSelectedPage(index);
        const startIndex = index * pageMax;
        const endIndex = startIndex + pageMax;
        setMovies(list.slice(startIndex, endIndex));
    }


    return (
        <div className={`${className ?? ''} ${styles.list}`}>
            {hasFilter ?
                <input className={styles.bar} placeholder='Search...' type="text" onChange={e => setFilter(e.target.value)} />
                : null}

            <ul className={styles.contents}>
                {movies.map(movie => {
                    return (
                        <li key={movie.id} className={styles.listItem}>
                            <Link className={styles.link} to={`/details/${movie.type}/${movie.id}`}>
                                {movie.poster_path ? <img src={getTMDBImageUrl(movie.poster_path, 'w200')} alt={movie.title} /> : <p className={styles.noImage}>X</p>}

                                <div className={styles.info}>
                                    <h3 className={styles.title}>{movie.title}</h3>
                                    <p className={styles.p}>{Math.round(movie.rating?? 0 * 10) / 10}</p>
                                    <p className={styles.p}>{movie.type}</p>
                                </div>
                            </Link>

                            <FavoriteButton type={movie.type as 'movie' | 'tv'} movie={movie} />
                        </li>);
                })}
            </ul>

            {pages > 1 ?
                <div className={styles.pagination}>
                    {[...Array(pages)].map((_, i) =>
                        <button className={`${i === selectedPage ? styles.selectedPage : ''} ${styles.paginationButton}`} key={i + 1} onClick={() => {
                            changePage(i);
                        }}>{i + 1}</button>
                    ).filter((_, i) =>
                        i === 0 ||
                        i === selectedPage ||
                        i === selectedPage + 1 ||
                        i === selectedPage - 1 ||
                        ((i + 1 <= selectedPage + 5) && (i + 1 >= selectedPage - 5) && (i + 1) % 5 === 0) ||
                        i === pages - 1)}
                </div>
                : null}
        </div>
    )
}

export default List;