import DisplayMovie from '../../components/DisplayMovie';
import Carrosel from '../../components/Carrosel';
import styles from './styles.module.scss';


const Home = () => {
    return (
        <main className={styles.mainApp}>
            
            <DisplayMovie />

            <Carrosel/>

            <Carrosel type={'tv'}/>

        </main>
    )
}

export default Home