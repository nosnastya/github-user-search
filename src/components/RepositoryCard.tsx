import React from "react";
import styles from "./Card.module.scss";

type Props = {
    repository: Repository;
};

export const RepositoryCard: React.FC<Props> = ({ repository }) => {

    return (
        <div
            className={`${styles.cardWrapper} disp-flex flex-column flex-just--sb`}
        >
            <div className="disp-flex flex-column">
                <h2 className={styles.cardName}><a href={repository.html_url}>{repository.full_name}</a></h2>
                <p>{repository.description}</p>
            </div>
            <div className="disp-flex flex-align--center">
                {repository.stargazers_count &&
                    <span className="disp-flex flex-align--center">
                        <svg aria-label="star" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img">
                            <path d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path>
                        </svg>
                        <span className="mar-lft--5">
                            {repository.stargazers_count}
                        </span>
                    </span>
                }
                {repository.language &&
                    <span className="tag mar-lft--5">{repository.language}</span>
                }
            </div>
        </div>
    );
};
