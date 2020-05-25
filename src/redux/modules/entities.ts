import { Entities } from "../../enums/shared"
import { typedAction } from "../helpers";
import { Dispatch, AnyAction } from "redux";
import { RootState } from "..";
import { Constants } from "../../enums/shared";

type EntityType = Entities.User | Entities.Repository;
const initialState: EntityType = Entities.User;

const selectEntity = (selectedEntity: EntityType) => {
    return typedAction(Constants.SET_ENTITY, selectedEntity);
};

export const setEntity = (entity: EntityType) => {
    return (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(selectEntity(entity));
    }
};

type EntityAction = ReturnType<typeof selectEntity>;

export function entitiesReducer(
    state = initialState,
    action: EntityAction
  ): EntityType {
    switch (action.type) {
        case Constants.SET_ENTITY:
            return action.payload;
        default:
            return state;
    }
}
