import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.scss';

function Layout() {
    return (
        <div className="grid">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;