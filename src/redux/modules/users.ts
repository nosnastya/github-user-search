import { typedAction } from "../helpers";
import { Dispatch, AnyAction } from "redux";
import { RootState } from "..";

const initialState: UserState = { isLoading: false, users: [] };

const setUsers = (users: User[]) => {
    return typedAction("users/SET_USERS", users);
};

export const selectUser = (user: User) => {
    return typedAction("users/SELECT_USER", { user });
};

export const requestUsers = () => {
    return typedAction("users/REQUEST_USERS");
};

export const loadUsers = (userSearchQuery: string) => {
    return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(requestUsers());
        setTimeout(() => {
            return fetch(`https://api.github.com/search/users?q=${userSearchQuery}`)
            .then(res => res.json())
            .then(json => dispatch(setUsers([...json.items])))
        }, 1000);
    }
};

type UserAction = ReturnType<typeof setUsers
| typeof selectUser
| typeof requestUsers
>;

export function usersReducer(
    state = initialState,
    action: UserAction
  ): UserState {
    switch (action.type) {
        case "users/REQUEST_USERS":
            return {
                ...state,
                isLoading: true,
            };
        case "users/SET_USERS":
            return {
                ...state,
                isLoading: false,
                users: action.payload
            };
        case "users/SELECT_USER":
            return { ...state, ...action.payload.user}
        default:
            return state;
    }
}
