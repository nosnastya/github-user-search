import React from "react";
import { RootState } from "../redux";
import { connect } from "react-redux";
import { UserCard } from "./UserCard";
import { RepositoryCard } from "./RepositoryCard";
import { Entities } from "../enums/shared"
import styles from "./UsersList.module.scss";

const mapStateToProps = (state: RootState) => ({
    results: state.entities.results,
    isLoading: state.entities.isLoading,
    isResolved: state.entities.isResolved,
    selectedEntity: state.entities.type
});

type Props = ReturnType<typeof mapStateToProps>;

const UnconnectedUsersList: React.FC<Props> = ({
    results,
    isLoading,
    isResolved,
    selectedEntity
}) => {
    return (
        <div className="mar-top">
            { !isLoading && isResolved &&
                <div className={styles.cardsWrapper}>
                    {results.length
                        ? results.map((result: User & Repository, id:number) => (
                            selectedEntity === Entities.User
                            ? <UserCard key={`${result.id}-${id}`} user={result} />
                            : <RepositoryCard key={`${result.id}-${id}`} repository={result} />
                        ))
                        : <p className="mar-ver--20 mar-lft--10">No {selectedEntity === Entities.User ? 'users' : 'repositories'} match your search</p>
                    }
                </div>
            }
            {isLoading &&
                <div className={styles.cardsWrapper}>
                    {Array(12)
                        .fill(12)
                        .map((_, index) => (
                            <span className={styles.placeholder} key={index}></span>
                        ))
                    }
                </div>
            }
        </div>
    );
};

export const UsersList = connect(
  mapStateToProps
)(UnconnectedUsersList);
