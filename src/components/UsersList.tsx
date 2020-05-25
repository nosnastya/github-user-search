import React from "react";
import { RootState } from "../redux";
import { connect } from "react-redux";
import { UserCard } from "./UserCard";
import { RepositoryCard } from "./RepositoryCard";
import { Entities } from "../enums/shared"
import styles from "./UsersList.module.scss";

const mapStateToProps = (state: RootState) => ({
    users: state.users.users,
    repositories: state.repositories.repositories,
    isLoading: (state.users.isLoading || state.repositories.isLoading),
    isUsersResolved: state.users.isResolved,
    isRepositoriesResolved: state.users.isResolved,
    selectedEntity: state.selectedEntity
});

type Props = ReturnType<typeof mapStateToProps>;

const UnconnectedUsersList: React.FC<Props> = ({ users, repositories, isLoading, selectedEntity, isUsersResolved, isRepositoriesResolved }) => {
    debugger
    return (
        <div className="mar-top">
            { !isLoading && (isUsersResolved || isRepositoriesResolved) &&
                <div className={styles.cardsWrapper}>
                    { selectedEntity === Entities.User
                        ? users.length
                            ? users.map((user, id) => (
                                <UserCard key={`${user.id}-${id}`} user={user} />
                            ))
                            : <p className="mar-ver--20 mar-lft--10">No users match your search</p>

                        : repositories.length
                            ? repositories.map((repository, id) => (
                                <RepositoryCard key={`${repository.id}-${id}`} repository={repository} />
                            ))
                            : <p className="mar-ver--20 mar-lft--10">No repositories match your search</p>
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
