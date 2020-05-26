import { combineReducers } from "redux";
import { entitiesReducer } from "./modules/entities"

export const rootReducer = combineReducers({
  entities: entitiesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
