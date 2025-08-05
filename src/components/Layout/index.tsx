import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import styles from './styles.module.scss';

function Layout() {
    return (
        <div className={styles.grid}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;