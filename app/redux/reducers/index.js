import { combineReducers } from "redux";
import reducer from "./profileReducer";

const reducers = combineReducers({
    profile:reducer
})

export default reducers ; 
