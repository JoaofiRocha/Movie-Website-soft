import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTMDBImageUrl } from '../../util/tmdb';
import FavoriteButton from '../FavoriteButton';

interface Props {
    items?: number[];
    className?: string;
    pageMax?: number;
    listMovie: FavoriteMovie[];
    onChangePage?: (page: number) => void;
}



const List = ({ className, pageMax = 5, listMovie, onChangePage }: Props) => {
    const [selectedPage, setSelectedPage] = useState<number>(0);
    const [movies, setMovies] = useState<FavoriteMovie[]>(listMovie)
    const [filter, setFilter] = useState<string>('');
    const [filteredList, setFilteredList] = useState<FavoriteMovie[]>(listMovie)

    const pages = Math.ceil(filteredList.length / pageMax);


    useEffect(() => {
        let list;
        if (filter.trim() === '') {
            list = listMovie;
        }
        else {
            list = listMovie.filter(m => {
                return m.title.toLowerCase().includes(filter.toLowerCase());
            });
            
        }

        setFilteredList(list);
        changePage(0, list);
    }, [filter, listMovie])


    const changePage = (index: number = selectedPage, list: FavoriteMovie[] = filteredList) => {
        setSelectedPage(index);
        const startIndex = index * pageMax;
        const endIndex = startIndex + pageMax;

        setMovies(list.slice(startIndex, endIndex));
    }


    return (
        <div className={`${className ?? ''} ${styles.list}`}>
            <input className={styles.bar} placeholder='Search...' type="text" onChange={e => setFilter(e.target.value)} />

            <ul className={styles.contents}>
                {movies.map(movie => {
                    return (
                        <li key={movie.id} className={styles.listItem}>
                            <Link className={styles.link} to={`/details/${movie.type}/${movie.id}`}>
                                {movie.poster_path ? <img src={getTMDBImageUrl(movie.poster_path, 'w200')} alt={movie.title} /> : <p className={styles.noImage}>X</p>}

                                <div className={styles.info}>
                                    <h3 className={styles.title}>{movie.title}</h3>
                                    <p className={styles.p}>{Math.round(movie.rating * 10) / 10}</p>
                                    <p className={styles.p}>{movie.type}</p>
                                </div>
                            </Link>

                            <FavoriteButton type={movie.type} movie={movie} />
                        </li>);
                })}
            </ul>

            {pages > 1 ?
                <div className={styles.pagination}>
                    {[...Array(pages)].map((_, i) =>
                        <button className={`${i === selectedPage ? styles.selectedPage : ''} ${styles.paginationButton}`} key={i + 1} onClick={() => {
                            changePage(i);
                            onChangePage ? (i) : null;
                        }}>{i + 1}</button>
                    )}
                </div>
                : null}
        </div>
    )
}

export default List;