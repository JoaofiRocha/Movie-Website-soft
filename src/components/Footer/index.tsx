import styles from './styles.module.scss';

const Footer = () => {
    return (
    <footer className={styles.footer}>
        <nav className={styles.footerNav}>
            <section>
                <h3 className={styles.h3}>Navigation</h3>
                <ul className={styles.ul}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/profile">Profile</a></li>
                </ul>
            </section>

            <section>
                <h3 className={styles.h3}>Account</h3>
                <ul className={styles.ul}>
                    <li><a href="/contact">Delete Account</a></li>
                    <li><a href="/help">Edit Account Data</a></li>
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