import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import styles from './styles.module.scss';
import { getTMDBImageUrl } from "../../util/tmdb";
import FavoriteButton from "../FavoriteButton";

interface prop {
    movie : Poster;
}

const MovieDetailButton = ({movie} : prop) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const nav = useNavigate();

    return (
        <>
            <button className={styles.button} onClick={() => setIsModalOpen(prev => !prev)}>...</button>
            <Modal className={styles.modal} onClose={() => setIsModalOpen(prev => !prev)} isOpen={isModalOpen}>
                <>
                    {movie.poster_path ? <img className={styles.img} src={getTMDBImageUrl(movie.poster_path, 'w200')} alt={movie.title} /> : <p className={styles.noImage}>X</p>}

                    <div className={styles.modalInfo}>
                        <h1 className={styles.modalTitle}>{movie.title}</h1>
                        <div className={styles.modalData}>
                            {movie.type === 'person' as 'movie' | 'tv' | 'person' ?
                                <p>{movie.area}</p>
                                :
                                <>
                                    <p>{movie.type}</p>
                                    <p>{Math.round((movie.rating ?? 0) * 10) / 10}</p>
                                </>
                            }

                        </div>
                    </div>

                    <div className={styles.buttons}>

                        {movie.type === 'person' as 'movie' | 'tv' | 'person' ? '' :
                            <div className={styles.actionButtons}>
                                <FavoriteButton type={'favorite'} contentType={movie.type as 'movie' | 'tv'} movie={movie} />
                                <FavoriteButton type={'watched'} contentType={movie.type as 'movie' | 'tv'} movie={movie} />
                                <FavoriteButton type={'watchlist'} contentType={movie.type as 'movie' | 'tv'} movie={movie} />
                            </div>
                        }
                        <button onClick={() => nav(`/details/${movie.type}/${movie.id}`)}>Details</button>
                    </div>

                </>
            </Modal>
        </>
    );
}

export default MovieDetailButton;