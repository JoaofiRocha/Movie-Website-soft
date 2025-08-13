import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useAccountStore } from '../../../store/useAccountStore';
import { useUsersStore } from '../../../store/useUsersStore';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';

const DeleteAccount = () => {
    const [modalState, setModalState] = useState<boolean>(false);
    const { user, setAccount } = useAccountStore();
    const { removeUser } = useUsersStore();
    const nav = useNavigate();

    useEffect(() => {
        if (!user)
            nav('/login');
    })

    const handleClick = () => {
        if (!user)
            return;
        removeUser(user.id);
        setAccount(null);
        nav('/');
    }

    return (
        <main className={styles.main}>
            <div className={styles.div}>
                <h1>Delete Account</h1>

                <p>
                    Are you sure you want to delete your account?
                </p>
                <p>
                    This Action is permanent and your account will be deleted forever!
                </p>

                <button onClick={() => setModalState(true)}>Delete Account</button>
            </div>

            <Modal isOpen={modalState} onClose={() => setModalState(false)} className={styles.modalContent}>
                    <h2>Delete Account?</h2>
                    <p>Are you sure?</p>
                    <div className={styles.buttonArea}>
                        <button onClick={() => setModalState(false)}>No</button>
                        <button onClick={handleClick}>Delete</button>
                    </div>
                </Modal>
        </main>
    )
}

export default DeleteAccount;