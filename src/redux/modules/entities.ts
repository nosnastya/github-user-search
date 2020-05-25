import { Entities } from "../../enums/Entities"
import { typedAction } from "../helpers";
import { Dispatch, AnyAction } from "redux";
import { RootState } from "..";

type EntityType = Entities.User | Entities.Repository;
const initialState: EntityType = Entities.User;

const selectEntity = (selectedEntity: EntityType) => {
    return typedAction("entities/SELECT_ENTITY", selectedEntity);
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
        case "entities/SELECT_ENTITY":
            return action.payload;
        default:
            return state;
    }
}
