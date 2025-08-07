import { useParams } from "react-router-dom";
import styles from './styles.module.scss';

const Details = () => {
    const { type, id } = useParams();

    

    return (
        <main className={styles.main}>
            <h1>Filme {type}</h1>
            <h2>{id}</h2>
        </main>
    );
}

export default Details;