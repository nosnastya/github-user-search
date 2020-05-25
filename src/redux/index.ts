import { combineReducers } from "redux";
import { usersReducer } from "./modules/users";
import { repositoriesReducer } from "./modules/repositories"
import { entitiesReducer } from "./modules/entities"

export const rootReducer = combineReducers({
  users: usersReducer,
  repositories: repositoriesReducer,
  selectedEntity: entitiesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
