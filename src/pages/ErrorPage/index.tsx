import { useNavigate } from "react-router-dom";
import styles from './styles.module.scss';
import buttonStyles from '../../theme/_button.module.scss';

const ErrorPage = () => {
    const nav = useNavigate();
    return (
        <main className={styles.main}>
            <div className={styles.div}>
                <h1>Something Went Wrong!</h1>

                <p>We're sorry, but something went Wrong. Please try again later.</p>

                <button className={`${styles.button} ${buttonStyles.button}`} onClick={() => nav('/')}>Go to Homepage</button>
            </div>
        </main>
    )
}

export default ErrorPage;