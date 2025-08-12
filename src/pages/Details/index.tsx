import { useParams } from "react-router-dom";
import buttonStyles from '../../theme/_button.module.scss';
import styles from './styles.module.scss';
import { useEffect, useState } from "react";
import { fetchDetails } from "../../services/tmdbAPI";
import { getTMDBImageUrl, getStarsRating } from "../../util/tmdb";
import Swipe from "../../components/Carrosel/Swiper";
import CastCard from '../../components/CastCard'
import FavoriteButton from "../../components/FavoriteButton";

const Details = () => {
    const { type, id } = useParams();
    const [content, setContent] = useState<MovieDetail>();
    const [showCast, setShowCast] = useState<boolean>(false);

    const getContent = async () => {
        if (!id)
            return;

        const response = await fetchDetails(id, type);
        setContent(response);
    }

    useEffect(() => {
        getContent();
    }, []);

    useEffect(() => {
        getContent();
        window.scrollTo(0, 0);
    }, [id]);

    const showedCast = showCast ? content?.cast : content?.cast.slice(0,6);

    return (
        <>
            {content && type && id ?
                <main className={styles.main} >
                    <div className={styles.top} style={
                        {
                            '--background-image': `url(${getTMDBImageUrl(content.backdrop_path, 'w1920_and_h800_multi_faces')})`
                        } as React.CSSProperties}>

                        <h1 className={styles.title}>{content.title}</h1>
                        <div className={styles.data}>
                            <p>{content.release_date?.split('-')[0] ?? `${content.first_air_date?.split('-')[0]} - ${content.last_air_date?.split('-')[0]}`}</p>
                            <p>{content.runtime ? `${content.runtime} min` : `S ${content.number_of_seasons}`}</p>
                            <div className={styles.buttonsDiv}>
                                {content.genres.map(genre => { return <button className={buttonStyles.btnOff} disabled>{genre.name}</button> })}
                            </div>
                        </div>
                    </div>


                    <div className={styles.info}>

                        <p className={styles.overview}>{content.overview}</p>

                        <aside className={styles.aside}>
                            <FavoriteButton movieId={Number(id)} className={`${buttonStyles.button} ${styles.button}`}/>
                            <p>{`${getStarsRating(content.vote_average)} (${content.vote_average})`}</p>
                            <p>{content.status}</p>
                            <p>Original Language: {content.original_language}</p>
                            {type === 'movie' ?
                                <>
                                    <p>{content.runtime} min</p>
                                    <a href={`https://www.imdb.com/title/${content.imdb_id}`}> IMDB </a>
                                    <p>{content.release_date ?? null}</p>
                                    <p>Budget: {content.budget ? `$${content.budget.toLocaleString()}` : 'N/A'}</p>
                                    <p>Revenue: {content.revenue ? `$${content.revenue.toLocaleString()}` : 'N/A'}</p>
                                </>
                                :
                                <>
                                    <p>Episodes: {content.episode_number ?? 'N/A'}</p>
                                    <p>Seasons: {content.number_of_seasons ?? 'N/A'}</p>
                                    <p>First Air Date: {content.first_air_date ?? 'N/A'}</p>
                                    <p>Last Air Date: {content.last_air_date ?? 'N/A'}</p>
                                </>
                            }
                        </aside>

                    </div>

                    {content.cast.length !== 0 ?
                        <>
                            <h2 className={styles.castTitle}>Cast</h2>
                            <div className={styles.cast}>
                                {showedCast?.map(c => {
                                    return <CastCard key={c.id} cast={c} />
                                })}
                                <button className={styles.castButton} onClick={() => setShowCast(prev => !prev)}>{showCast ? 'Show Less' : 'Show More'}</button>
                            </div>
                        </>
                        : null
                    }


                    <h2 className={styles.similarTitle}>Similar Content</h2>
                    {content.similar ? <Swipe movies={content.similar} type={type === 'movie' || type === 'tv' ? type : undefined} /> : <h1>{JSON.stringify(content.similar)}</h1>}



                </main >
                :
                <h1>ERRO</h1>
            }
        </>
    );
}

export default Details;

