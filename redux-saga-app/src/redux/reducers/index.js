import { combinedReducers } from "redux";
import users from "./users";
const rootReducer = combinedReducers({
  users: users,
});

export default rootReducer;
