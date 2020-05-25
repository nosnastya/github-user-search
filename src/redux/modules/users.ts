import { typedAction } from "../helpers";
import { Dispatch, AnyAction } from "redux";
import { RootState } from "..";
import { Constants } from "../../enums/shared";

const initialState: UserState = { isLoading: false, isResolved: false, users: [] };

const setUsers = (users: User[]) => {
    return typedAction(Constants.SET_USERS, users);
};

export const requestUsers = () => {
    return typedAction(Constants.REQUEST_USERS);
};

export const setUsersResolved = (bool: boolean) => {
    return typedAction(Constants.SET_USERS_RESOLVED, bool);
};

export const loadUsers = (userSearchQuery: string) => {
    return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(requestUsers());
        return fetch(`https://api.github.com/search/users?q=${userSearchQuery}`)
            .then(res => res.json())
            .then(json => dispatch(setUsers([...json.items])))
            .then(() => dispatch(setUsersResolved(true)))
    }
};

export const resetUserResolved = () => {
    return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(setUsersResolved(false));
    }
};

type UserAction = ReturnType<typeof setUsers
| typeof requestUsers
| typeof setUsersResolved
>;

export function usersReducer(
    state = initialState,
    action: UserAction
  ): UserState {
    switch (action.type) {
        case Constants.REQUEST_USERS:
            return {
                ...state,
                isLoading: true,
                isResolved: false
            };
        case Constants.SET_USERS:
            return {
                ...state,
                isLoading: false,
                users: action.payload,
            };
        case Constants.SET_USERS_RESOLVED:
            return {
                ...state,
                isResolved: action.payload
            };
        default:
            return state;
    }
}
