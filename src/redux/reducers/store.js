import {applyMiddleware, combineReducers, createStore} from "redux";
import contactReducer from "./contactReducer";
import {authReducer} from "./AuthReducer";
import thunk from "redux-thunk";


const reducers = combineReducers({
    contactReducer: contactReducer,
    authReducer: authReducer,
})

export const store = createStore(reducers,(applyMiddleware(thunk)));
