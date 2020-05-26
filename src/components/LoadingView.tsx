import React from "react";
import styles from "./UsersList.module.scss";

export const LoadingView: React.FC = () => {
    return (
        <div className={styles.cardsWrapper}>
        {Array(12)
            .fill(12)
            .map((_, index) => (
                <span className={styles.placeholder} key={index}></span>
            ))
        }
    </div>
    );
};
