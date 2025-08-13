import { Outlet, Link } from "react-router-dom"
import styles from './styles.module.scss';
import { useState } from "react";

const Settings = () => {
    const [asideHide, setAsideHide] = useState<boolean>(true);
    return (
        <main>
            <aside className={`${asideHide ? '' : styles.asideHide} ${styles.aside}`}>
                <button className={styles.button} onClick={() => { setAsideHide(prev => !prev); console.log(asideHide) }}>⏎</button>
                <h1 className={styles.title}>Settings</h1>
                <Link className={styles.link} to="/settings/edit" >Edit Account</Link>
                <Link className={styles.link} to="/settings/delete">Delete Account</Link>
            </aside>

            <Outlet />
        </main>
    );
}

export default Settings;