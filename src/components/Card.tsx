import React from "react";
import styles from "./Card.module.scss";
import { Entities } from "../enums/shared";

type Props = {
    item: Repository & User;
    type: EntityType;
};

export const Card: React.FC<Props> = ({ item, type }) => {
    const isUser = type === Entities.User;

    return (
        <div
            className={`${styles.cardWrapper} disp-flex flex-column flex-just--sb`}
        >
             <div className={`disp-flex ${isUser && 'flex-align--center'} ${styles.cardImgWrapper}`}>
                <img
                    src={isUser ? item.avatar_url : item.owner.avatar_url}
                    alt={isUser ? item.login : item.full_name}
                    className={styles.cardImg}
                />
                <div className={`disp-flex flex-column ${styles.cardInfo}`}>
                    <h2 className={styles.cardName}><a className={`${!isUser && 'text-blue'}`} href={item.html_url}>{isUser ? item.login : item.full_name}</a></h2>
                    {!isUser && <p>{item.description}</p>}
                </div>
            </div>
            {isUser
                ? <a
                    className={styles.cardButton}
                    href={item.html_url}
                >
                    <span>Go to profile</span>
                </a>
                : <div className="disp-flex flex-align--center">
                    {item.stargazers_count &&
                        <span className="disp-flex flex-align--center">
                            <svg aria-label="star" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img">
                                <path d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path>
                            </svg>
                            <span className="mar-lft--5">
                                {item.stargazers_count}
                            </span>
                        </span>
                    }
                    {item.language &&
                        <span className={`${styles.tag} mar-lft--5`}>{item.language}</span>
                    }
                </div>
            }
        </div>
    );
};
