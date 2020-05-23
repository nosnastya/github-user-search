import React from "react";

type Props = {
  user: User;
};

export const UserCard: React.FC<Props> = ({ user }) => {
    const goToUserPlofile = ( url:string ) => {
        window.location.href = url;
    };

    return (
        <div onClick={() => goToUserPlofile(user.html_url)}>
            <img src={user.avatar_url} alt={user.login} height="50" width="50" />
            <div>
                <h2>{user.login}</h2>
            </div>
        </div>
    );
};
