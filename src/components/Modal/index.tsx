import styles from './styles.module.scss';
import { useRef } from 'react';

interface props {
    children: React.ReactNode;
    isOpen?: boolean;
    onClose: () => void;
    className?: string;
}

const Modal: React.FC<props> = ({ children, isOpen, onClose, className }) => {
    const modal = useRef<HTMLDivElement>(null);

    const handleClickModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== modal.current) {
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <div className={`${styles.modal} ${isOpen ? styles.modalOpen : null}`} onClick={handleClickModal}>
            <div
                className={className ?? ''}
                ref={modal}
            >
                {children}
            </div>
        </div>
    );
}

export default Modal;
