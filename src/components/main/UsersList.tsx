import React from "react";
import { RootState } from "../../redux";
import { connect } from "react-redux";
import { UserCard } from "./UserCard";

const mapStateToProps = (state: RootState) => ({
    users: state.users.users,
    isLoading: state.users.isLoading
});

type Props = ReturnType<typeof mapStateToProps>;

const UnconnectedUsersList: React.FC<Props> = ({ users, isLoading }) => {
    return (
        <div className="mar-top">
            { isLoading
            ? <div className="users-list">
                {Array(9)
                    .fill(9)
                    .map((_, index) => (
                        <span className="placeholder-animation" key={index}></span>
                    ))
                }
            </div>
            : <div className="users-list">
                {users.map((user, id) => (
                    <UserCard key={`${user.id}-${id}`} user={user} />
                ))}
            </div>
            }
        </div>
    );
};

export const UsersList = connect(
  mapStateToProps
)(UnconnectedUsersList);
