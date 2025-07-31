import './Footer.scss';

const Footer = () => {
    return (
    <footer>
        <nav>
            <section>
                <h3>Navigation</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/profile">Profile</a></li>
                </ul>
            </section>

            <section>
                <h3>Account</h3>
                <ul>
                    <li><a href="/contact">Delete Account</a></li>
                    <li><a href="/help">Edit Account Data</a></li>
                </ul>
            </section>

        </nav>


        <aside>
            <p>Data provided by <a href="https://tmdb.org">TMDB</a></p>
        </aside>

        <small> &copy; 2025 Movie Website</small>
    </footer>
    )
}

export default Footer;