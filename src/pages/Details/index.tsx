import { useParams } from "react-router-dom";
import styles from './styles.module.scss';
import { useEffect, useState } from "react";
import { fetchDetails } from "../../services/tmdbAPI";
import { getTMDBImageUrl } from "../../util/tmdb";
import Swipe from "../../components/Carrosel/Swiper";
import CastCard from '../../components/CastCard'

const Details = () => {
    const { type, id } = useParams();
    const [content, setContent] = useState<MovieDetail>();

    useEffect(() => {
        const getContent = async () => {
            if (!id)
                return;

            const response = await fetchDetails(id, type);
            setContent(response);
        }

        getContent()
    }, []);

    return (
        <>
            {content && type ?
                <main className={styles.main} >
                    <img src={getTMDBImageUrl(content.backdrop_path, 'w1920_and_h800_multi_faces')} alt={`${content.title} image`} />
                    <h1>{content.title}</h1>
                    <p>{content.genres.map(genre => genre.name).join(', ')}</p>
                    {type === 'movie' ? <><p>{content.release_date}</p>
                        <p>{content.vote_average}</p>
                        <p>{content.runtime} min</p> </> : null}

                    <p>{content.tagline}</p>
                    {type === 'movie' ?
                        <div>
                            <a href={`https://www.imdb.com/title/${content.imdb_id}`}> IMDB </a>
                            <p>{content.budget ? `$${content.budget.toLocaleString()}` : 'N/A'}</p>
                            <p>{content.revenue ? `$${content.revenue.toLocaleString()}` : 'N/A'}</p>
                        </div>
                        :
                        <div>
                            <p>{content.episode_number}</p>
                            <p>{content.number_of_seasons}</p>
                            <p>{content.first_air_date}</p>
                            <p>{content.last_air_date}</p>
                        </div>
                    }


                    <p>{content.status}</p>
                    <p>{content.original_language}</p>
                    <p>{content.overview}</p>

                    <h2 className={styles.castTitle}>Cast</h2>
                    <div className={styles.cast}>
                        {content.cast.map(c => {
                            return <CastCard cast={c} />
                        })}
                    </div>

                    {content.similar ? <Swipe movies={content.similar} type={type === 'movie' || type === 'tv' ? type : undefined} /> : <h1>{JSON.stringify(content.similar)}</h1>}



                </main >
                :
                <h1>ERRO</h1>
            }
        </>
    );
}

export default Details;

