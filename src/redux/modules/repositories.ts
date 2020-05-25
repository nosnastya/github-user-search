import { typedAction } from "../helpers";
import { Dispatch, AnyAction } from "redux";
import { RootState } from "..";

const initialState: RepositoryState = { isLoading: false, repositories: [] };

const setRepositories = (repositories: Repository[]) => {
    return typedAction("repositories/SET_REPOSITORIES", repositories);
};

export const selectRepository = (repository: Repository) => {
    return typedAction("repositories/SELECT_REPOSITORY", { repository });
};

export const requestRepositories = () => {
    return typedAction("repositories/REQUEST_REPOSITORIES");
};

export const loadRepositories = (repositoriesSearchQuery: string) => {
    return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(requestRepositories());
        setTimeout(() => {
            return fetch(`https://api.github.com/search/repositories?q=${repositoriesSearchQuery}`)
            .then(res => res.json())
            .then(json => dispatch(setRepositories([...json.items])))
        }, 1000);
    }
};

type RepositoryAction = ReturnType<typeof setRepositories
| typeof selectRepository
| typeof requestRepositories
>;

export function repositoriesReducer(
    state = initialState,
    action: RepositoryAction
  ): RepositoryState {
    switch (action.type) {
        case "repositories/REQUEST_REPOSITORIES":
            return {
                ...state,
                isLoading: true,
            };
        case "repositories/SET_REPOSITORIES":
            return {
                ...state,
                isLoading: false,
                repositories: action.payload
            };
        case "repositories/SELECT_REPOSITORY":
            return { ...state, ...action.payload.repository}
        default:
            return state;
    }
}
