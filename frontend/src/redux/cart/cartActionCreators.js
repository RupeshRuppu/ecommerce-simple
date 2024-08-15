import { GET_CART_ITEM_URL } from "../../utils/urls";
import {
	FETCH_CART_LOADING,
	FETCH_CART_ERROR,
	FETCH_CART_SUCCESS,
} from "./cartActions";
import axios from "axios";

function fetchCartLoading() {
	return { type: FETCH_CART_LOADING };
}

function fetchCartSuccess(data) {
	return { type: FETCH_CART_SUCCESS, payload: data };
}

function fetchCartError(error) {
	return { type: FETCH_CART_ERROR, payload: error };
}

function fetchCartDetails(userid) {
	async function func(dispatch) {
		dispatch(fetchCartLoading());
		try {
			let response = await axios.post(GET_CART_ITEM_URL, {
				userid,
			});
			const { data, error } = response.data;
			if (error !== null) {
				throw new Error("api failed");
			}

			dispatch(fetchCartSuccess(data));
		} catch (err) {
			dispatch(fetchCartError(err.message));
		}
	}

	return func;
}

export { fetchCartSuccess, fetchCartLoading, fetchCartError, fetchCartDetails };
