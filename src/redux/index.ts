import { combineReducers } from "redux";
import { usersReducer } from "./modules/users";

export const rootReducer = combineReducers({
  users: usersReducer
});

export type RootState = ReturnType<typeof rootReducer>;
