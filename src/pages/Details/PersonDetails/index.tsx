import { useParams } from "react-router-dom";
import styles from '../styles.module.scss';
import { useEffect, useState } from "react";
import { fetchDetails } from "../../../services/tmdbAPI";
import { getTMDBImageUrl } from "../../../util/tmdb";
import Swipe from "../../../components/Carrosel/Swiper";

const PersonDetails = () => {
    const { id } = useParams();
    const [content, setContent] = useState<PersonDetail>();

    const getContent = async () => {
        if (!id)
            return;

        const response = await fetchDetails(id, 'person');
        setContent(response as PersonDetail);
    }

    useEffect(() => {
        getContent();
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <>
            {content && id ?
                <main className={styles.main} >
                    <div className={styles.top} style={
                        {
                            '--background-image': `url(${getTMDBImageUrl(content.backdrop_path ?? '', 'w1920_and_h800_multi_faces')})`
                        } as React.CSSProperties}>

                        <div className={styles.profileDiv}>
                            <img className={styles.profileImage} src={getTMDBImageUrl(content.profile_path ?? '', 'w500')} alt={`profile of ${content.name}`} />
                        </div>

                        <h1 className={styles.title}>{content.name}</h1>

                    </div>


                    <div className={`${styles.info} ${content.biography ? '' : styles.infoNoOverview}`}>

                        <p className={styles.overview}>{content.biography}</p>

                        <aside className={`${styles.aside} ${content.biography ? '' : styles.asideNoOverview}`}>
                            <p>{content.area}</p>
                            <p>{content.gender}</p>
                            <p>Born at {content.birthday}</p>
                            {content.deathday ? <p>Died at {content.deathday}</p> : ''}
                            <a href={`https://www.imdb.com/title/${content.imdb_id}`}> IMDB </a>
                        </aside>

                    </div>


                    <h2 className={styles.similarTitle}>Movies {content.name} is in</h2>
                    {content.credits_cast ? <Swipe virtual maxMovies={1000} movies={content.credits_cast} /> : ''}

                    <h2 className={styles.similarTitle}>Movies {content.name} is a crew</h2>
                    {content.credits_cast ? <Swipe virtual maxMovies={1000} movies={content.credits_crew as Poster[]} /> : ''}


                </main >
                :
                <h1>ERRO</h1>
            }
        </>
    );
}

export default PersonDetails;

