import { Entities } from "../../enums/shared"
import { typedAction } from "../helpers";
import { Dispatch, AnyAction } from "redux";
import { RootState } from "..";
import { Constants } from "../../enums/shared";

const initialState: EntityState = { isLoading: false, isResolved: false, results: [], type: Entities.User };

const setEntityType = (selectedEntityType: EntityType) => {
    debugger
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

export const selectEntityType = (entityType: EntityType) => {
    return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(setEntityType(entityType));
    }
};

export const loadEntities = (searchQuery: string, entityType: EntityType) => {
    return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(requestEntities());
        return fetch(`https://api.github.com/search/${entityType === Entities.User ? 'users' : 'repositories'}?q=${searchQuery}`)
            .then(res => res.json())
            .then(json => dispatch(setEntities([...json.items])))
            .then(() => dispatch(setEntitiesResolved(true)))
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

type EntityAction =
ReturnType<typeof setEntityType
| typeof setEntities
| typeof requestEntities
| typeof setEntitiesResolved
>;

export function entitiesReducer(
    state = initialState,
    action: EntityAction
  ): EntityType {
    switch (action.type) {
        case Constants.SET_ENTITY_TYPE:
            return {
                ...state,
                type: action.payload
            };
        case Constants.REQUEST_ENTITIES:
            return {
                ...state,
                isLoading: true,
                isResolved: false,
            };
        case Constants.SET_ENTITIES:
            return {
                ...state,
                isLoading: false,
                results: action.payload
            };
        case Constants.SET_ENTITIES_RESOLVED:
            return {
                ...state,
                isResolved: action.payload
            };
        default:
            return state;
    }
};
