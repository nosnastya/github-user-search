import { Entities } from "../../enums/shared"
import { typedAction } from "../helpers/typedAction";
import { Dispatch, AnyAction } from "redux";
import { RootState } from "../reducers/index";
import { Constants } from "../../enums/shared";

const setEntityType = (selectedEntityType: EntityType) => {
    return typedAction(Constants.SET_ENTITY_TYPE, selectedEntityType);
};

const setEntities = (results: Repository[] | User[]) => {
    return typedAction(Constants.SET_ENTITIES, results);
};

const requestEntities = () => {
    return typedAction(Constants.REQUEST_ENTITIES);
};

const setEntitiesResolved = (isResolved: boolean) => {
    return typedAction(Constants.SET_ENTITIES_RESOLVED, isResolved);
};

const setSearchQueue = (searchQueue: string) => {
    return typedAction(Constants.SET_SEARCH_QUEUE, searchQueue);
};

export const selectEntityType = (entityType: EntityType) => {
    return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(setEntityType(entityType));
    }
};

// needed for persisting query to local storage
export const changeSearchQueue = (searchQueue: string) => {
    return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(setSearchQueue(searchQueue));
    }
};

export const loadEntities = (searchQuery: string, entityType: EntityType) => {
    return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(requestEntities());
        return await fetch(`https://api.github.com/search/${entityType === Entities.User ? 'users' : 'repositories'}?q=${searchQuery}`)
            .then(res => res.json())
            .then(json => dispatch(setEntities([...json.items])))
            .then(() => dispatch(setEntitiesResolved(true)))
            .catch(err => alert(err.message))
    }
};

export const resetEntitiesResolved = () => {
    return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(setEntitiesResolved(false));
    }
};

export const resetEntities = () => {
    return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(setEntitiesResolved(false));
        dispatch(setEntities([]));
    }
};

export type EntityActionType =
ReturnType<typeof setEntityType
| typeof setEntities
| typeof requestEntities
| typeof setEntitiesResolved
| typeof setSearchQueue
>;
