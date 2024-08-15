import { storeDispatch } from "../redux/store";
import { LOGGED_IN_USER_KEY } from "./constants";

export const userLogin = user => {
	/** store loggedin user in both store and localStorage */
	localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
};

export const logout = navigate => {
	localStorage.removeItem(LOGGED_IN_USER_KEY);
	navigate("/");
};

export const getUserFromLS = () => {
	let logged_user = JSON.parse(localStorage.getItem(LOGGED_IN_USER_KEY));
	return logged_user;
};
