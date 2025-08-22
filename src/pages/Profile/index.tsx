import styles from './styles.module.scss';
import { useNavigate, useParams } from "react-router-dom";
import { useUsersStore } from "../../store/useUsersStore";
import { useEffect } from "react";
import Swipe from '../../components/Carrosel/Swiper/index';
import { useActionStore } from '../../store/useActionsStore';


const Profile = () => {
    const { id } = useParams();
    const { getUser } = useUsersStore();
    const { getActions } = useActionStore();
    const nav = useNavigate();

    const user = getUser(id as string);

    useEffect(() => {
        if (!id || !user) {
            nav('/error');
        }
    }, [id, user]);

    if (!id || !user)
        return null;

    return (
        <main className={styles.main}>
            <div className={`${styles.div} ${styles.banner}`}>
                <svg className={`${styles.iconSvg} `} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <h1 className={styles.name}>{user.user}</h1>

            </div>

            <div className={`${styles.div} ${styles.swiperDiv}`}>
                <h2>Favorites</h2>
                <Swipe virtual className={styles.swiper} maxMovies={100} movies={getActions(user.id, 'favorite')} />
            </div>

        </main >
    );
}

export default Profile;