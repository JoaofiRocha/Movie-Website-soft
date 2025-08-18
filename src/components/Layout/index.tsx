import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import styles from './styles.module.scss';

function Layout({bar = true}) {
    return (
        <div className={styles.grid}>
            <Header bar={bar}/>
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;