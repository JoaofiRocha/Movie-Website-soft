import Swipe from "./Swiper";
import { useEffect, useState, useRef } from 'react';
import { fetchDiscover } from '../../services/tmdbAPI';
import { mapTMDBMovies } from '../../services/mappers';
import buttonStyles from '../../theme/_button.module.scss';
import styles from './styles.module.scss';
import { movieGenreList, tvGenreList } from "../../util/list";

interface props {
    type?: 'movie' | 'tv';
}

const Carrosel = ({ type = 'movie' }: props) => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [currentPage, setCurrentPage] = useState<number>(0);

    const [genres, setGenres] = useState<string[]>([]);
    const swiperRef = useRef<any>(null);

    const genreList = type === 'movie' ? movieGenreList : tvGenreList;

    const getMovies = async (page?: number, resetMovies = false) => {
        const targetPage = page ?? currentPage + 1;
        setCurrentPage(targetPage);

        console.log(type);
        const fetchedMovies = await fetchDiscover(genres, targetPage, type);

        if (fetchedMovies && fetchedMovies.length > 0) {
            const mappedMovies = mapTMDBMovies(fetchedMovies);

            if (resetMovies) {
                setMovies(mappedMovies);

                if (swiperRef.current)
                    swiperRef.current.slideTo(0, 0);

            }
            else
                setMovies((prev) => prev.concat(mappedMovies));
        }
    };


    useEffect(() => {
        const changeFilter = () => {
            setCurrentPage(0);
            //clear cache
            getMovies(1, true);
        }

        changeFilter();

    }, [genres]);

    const updateGenres = (genre: string) => {
        setGenres(prev => {
            if (prev.includes(genre)) {
                return prev.filter(id => id !== genre);
            } else {
                return [...prev, genre];
            }
        });
    }

    return (
        <section className={styles.area}>
            <h2>{type === 'movie' ? 'Movies' : 'Series'}</h2>
            <ul id="movie_filter" className={styles.buttonList}>
                {genreList.map(g => {
                    const isPressed = genres.includes(g.id);
                    return <button
                        key={g.id}
                        value={g.id}
                        onClick={e => updateGenres(e.currentTarget.value)}
                        className={`${buttonStyles.btn} ${styles.btn} ${isPressed ? styles.buttonPressed : styles.buttonUnpressed}`}
                    >
                        {g.name}
                    </button>
                })}
            </ul>
            {movies.length === 0 ? (
                <p>Loading movies...</p>
            ) : (
                <Swipe movies={movies} nearEnd={getMovies} ref={swiperRef} type={type}/>
            )}
        </section>
    )
}

export default Carrosel;