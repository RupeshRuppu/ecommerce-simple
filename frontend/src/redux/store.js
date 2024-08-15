import { createStore, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import { applyMiddleware } from "redux";
import userReducer from "./user/userReducer";
import cartReducer from "./cart/cartReducer";

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export const storeDispatch = store.dispatch;
export default store;
