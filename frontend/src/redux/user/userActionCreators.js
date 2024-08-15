import { USERS_GET_URL } from "../../utils/urls";
import {
	FETCH_USERS_LOADING,
	FETCH_USERS_ERROR,
	FETCH_USERS_SUCCESS,
} from "./userActions";
import axios from "axios";

function fetchUsersLoading() {
	return { type: FETCH_USERS_LOADING };
}

function fetchUsersSuccess(data) {
	return { type: FETCH_USERS_SUCCESS, payload: data };
}

function fetchUsersError(error) {
	return { type: FETCH_USERS_ERROR, payload: error };
}

function fetchUsers() {
	async function func(dispatch) {
		dispatch(fetchUsersLoading());
		try {
			let response = await axios.get(USERS_GET_URL);
			const { data, error } = response.data;
			if (error !== null) {
				throw new Error("api failed");
			}

			dispatch(fetchUsersSuccess(data));
		} catch (err) {
			dispatch(fetchUsersError(err.message));
		}
	}

	return func;
}

export { fetchUsersError, fetchUsersLoading, fetchUsersSuccess, fetchUsers };
