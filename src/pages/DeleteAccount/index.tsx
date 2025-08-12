import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useAccountStore } from '../../store/useAccountStore';
import { useUsersStore } from '../../store/useUsersStore';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const DeleteAccount = () => {
    const [modalState, setModalState] = useState<boolean>(false);
    const { user, setAccount} = useAccountStore();
    const { removeUser } = useUsersStore();
    const nav = useNavigate();
    const modal = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user)
            nav('/login');
    })

    const handleClick = () => {
        if(!user)
            return;
        removeUser(user.id);
        setAccount(null);
        nav('/');
    }

    const handleClickModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if(e.target !== modal.current){
            setModalState(false);
        }
    }

    return (
        <main className={styles.main}>
            <h1>Delete Account</h1>

            <p>
                Are you sure you want to delete your account?
                This Action is permanent and your account will be deleted forever!
            </p>

            <button onClick={() => setModalState(prev => !prev)}>Delete Account</button>

            <div onClick={handleClickModal} className={`${styles.modal} ${modalState ? styles.modalOpen : null}`}>
                <div ref={modal} className={styles.modalContent}>
                    <h2>Delete Account?</h2>
                    <p>Are you sure?</p>
                    <div className={styles.buttonArea}>
                        <button onClick={() => setModalState(prev => !prev)}>No</button>
                        <button onClick={handleClick}>Delete</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DeleteAccount;