import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    userInfo: authReducer,
})

export default rootReducer