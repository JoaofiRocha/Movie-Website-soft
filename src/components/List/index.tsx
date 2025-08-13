import styles from './styles.module.scss';
import React from 'react';

interface props {
    children?: React.ReactNode;
    items?: number[];
    className?: string;
    pageMax?: number;
    childrenNumber?: number;
    onChangePage: (page: number) => void;
}



const List: React.FC<props> = ({ children, className, pageMax = 5, childrenNumber, onChangePage }) => {
    if (!childrenNumber) {
        childrenNumber = React.Children.count(children);
    }

    const pages = Math.ceil(childrenNumber /pageMax);



    return (
        <ul className={`${styles.list} ${className ?? ''}`}>
            <div className={styles.contents}>
                {children}
            </div>

            {pages > 1 ?
                <div>
                    {[...Array(pages)].map((_, i) =>
                        <button key={i+1} onClick={() => onChangePage(i)}>{i+1}</button>
                    )}
                </div>
                : null}
        </ul>
    )
}

export default List;