import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projectsReducer from "./projects";
import userReducer from "./users";

export default combineReducers({
  users: userReducer,
  bugs: bugsReducer,
  projects: projectsReducer,
});
