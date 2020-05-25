import { typedAction } from "../helpers";
import { Dispatch, AnyAction } from "redux";
import { RootState } from "..";
import { Constants } from "../../enums/shared";

const initialState: RepositoryState = { isLoading: false, isResolved: false, repositories: [] };

const setRepositories = (repositories: Repository[]) => {
    return typedAction(Constants.SET_REPOSITORIES, repositories);
};

export const requestRepositories = () => {
    return typedAction(Constants.REQUEST_REPOSITORIES);
};

export const setRepositoriesResolved = (bool: boolean) => {
    return typedAction(Constants.SET_REPOSITORIES_RESOLVED, bool);
};

export const loadRepositories = (repositoriesSearchQuery: string) => {
    return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(requestRepositories());
        return fetch(`https://api.github.com/search/repositories?q=${repositoriesSearchQuery}`)
            .then(res => res.json())
            .then(json => dispatch(setRepositories([...json.items])))
            .then(() => dispatch(setRepositoriesResolved(true)))
    }
};

export const resetRepositoryResolved = () => {
    return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(setRepositoriesResolved(false));
    }
};

type RepositoryAction = ReturnType<typeof setRepositories
| typeof requestRepositories
| typeof setRepositoriesResolved
>;

export function repositoriesReducer(
    state = initialState,
    action: RepositoryAction
  ): RepositoryState {
    switch (action.type) {
        case Constants.REQUEST_REPOSITORIES:
            return {
                ...state,
                isLoading: true,
                isResolved: false,
            };
        case Constants.SET_REPOSITORIES:
            return {
                ...state,
                isLoading: false,
                repositories: action.payload
            };
        case Constants.SET_REPOSITORIES_RESOLVED:
            return {
                ...state,
                isResolved: action.payload
            };
        default:
            return state;
    }
}
