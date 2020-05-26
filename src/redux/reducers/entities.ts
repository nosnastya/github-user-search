import { Constants, Entities } from "../../enums/shared";
import { EntityActionType } from '../actions/entities';

const initialState: EntityState = { isLoading: false, isResolved: false, results: [], type: Entities.User, searchQueue: ''};

function entitiesReducer(
    state = initialState,
    action: EntityActionType
  ): EntityType {
    switch (action.type) {
        case Constants.SET_ENTITY_TYPE:
            return {
                ...state,
                type: action.payload
            };
        case Constants.SET_SEARCH_QUEUE:
            return {
                ...state,
                searchQueue: action.payload
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

export default entitiesReducer;

