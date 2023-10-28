import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./account/reducer";


const rootReducer = combineReducers({
    account:accountReducer
});

export default rootReducer;