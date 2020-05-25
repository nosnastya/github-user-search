import React from "react";
import styles from "./Card.module.scss";

type Props = {
    user: User;
};

export const UserCard: React.FC<Props> = ({ user }) => {
    return (
        <div
            className={styles.cardWrapper}
        >
            <div className="disp-flex flex-align--center">
                <img
                    src={user.avatar_url}
                    alt={user.login}
                    className={styles.cardImg}
                />
                <h2 className={styles.cardName}>{user.login}</h2>
            </div>
            <a
                className={styles.cardButton}
                href={user.html_url}
            >
                <span>Go to profile</span>
            </a>
        </div>
    );
};
