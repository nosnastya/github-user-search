import React from "react";
import { RootState } from "../redux";
import { connect } from "react-redux";
import { UserCard } from "./UserCard";
import { RepositoryCard } from "./RepositoryCard";
import { Entities } from "../enums/Entities"

const mapStateToProps = (state: RootState) => ({
    users: state.users.users,
    repositories: state.repositories.repositories,
    isLoading: (state.users.isLoading || state.repositories.isLoading),
    selectedEntity: state.selectedEntity
});

type Props = ReturnType<typeof mapStateToProps>;

const UnconnectedUsersList: React.FC<Props> = ({ users, repositories, isLoading, selectedEntity }) => {
    return (
        <div className="mar-top">
            { isLoading
            ? <div className="users-list">
                {Array(12)
                    .fill(12)
                    .map((_, index) => (
                        <span className="placeholder-animation" key={index}></span>
                    ))
                }
            </div>
            : <div className="users-list">
                { selectedEntity === Entities.User
                    ? users.map((user, id) => (
                        <UserCard key={`${user.id}-${id}`} user={user} />
                    ))
                    : repositories.map((repository, id) => (
                        <RepositoryCard key={`${repository.id}-${id}`} repository={repository} />
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
