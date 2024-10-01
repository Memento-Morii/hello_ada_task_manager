import { combineReducers } from "redux";
import {
  loginReducer,
  signupReducer,
} from "../../features/Register/authenticationSlice";
import { uiReducer } from "./uiSlices";
import { taskReducer } from "../../features/Homepage/taskSlice";

const reducers = combineReducers({
  loginReducer: loginReducer,
  signupReducer: signupReducer,
  ui: uiReducer,
  taskReducer: taskReducer,
});
export default reducers;
