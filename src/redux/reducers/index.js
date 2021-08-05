import { combineReducers } from "redux";
import courseReducer from "./courseReducer";
import authors from "./authorsReducer";
const rootReducer = combineReducers({
  courses: courseReducer,
  authors,
});
export default rootReducer;
