import { useAccountStore } from '../../store/useAccountStore';
import styles from './styles.module.scss';

const Footer = () => {
    const { user } = useAccountStore();
    return (
        <footer className={styles.footer}>
            <nav className={styles.footerNav}>
                <section>
                    <h3 className={styles.h3}>Navigation</h3>
                    <ul className={styles.ul}>
                        <li><a href="/">Home</a></li>
                        {user ?
                        <>
                         <li><a href={`list/favorites/${user.id}`}>Favorites</a></li>
                         <li><a href={`list/watched/${user.id}`}>Watched</a></li>
                         <li><a href={`list/watchlist/${user.id}`}>Watchlist</a></li>
                         <li><a href={`/profile/${user.id}`}>Profile</a></li>
                         </>
                        : null}
                    </ul>
                </section>

                <section>
                    <h3 className={styles.h3}>Account</h3>
                    <ul className={styles.ul}>
                        {user ?
                            <>
                                <li><a href="/settings/delete">Delete Account</a></li>
                                <li><a href="/settings/edit">Edit Account Data</a></li>
                            </>
                            :
                            <>
                                <li><a href="/signup">Signup</a></li>
                                <li><a href="/login">Login</a></li>
                            </>
                        }
                    </ul>
                </section>

            </nav>


            <section className={styles.footerData}>
                <p>Data provided by <a href="https://tmdb.org">TMDB</a></p>
            </section>

            <small className={styles.footerCopyright}> &copy; 2025 Movie Website</small>
        </footer>
    )
}

export default Footer;