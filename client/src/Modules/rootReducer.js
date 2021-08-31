import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import menuReducer from './Menu/reducers'

export default history =>
    combineReducers({
        router: connectRouter(history),
        menu: menuReducer
    });
