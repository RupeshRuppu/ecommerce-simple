import {
	FETCH_CART_ERROR,
	FETCH_CART_LOADING,
	FETCH_CART_SUCCESS,
} from "./cartActions";

const initialState = {
	loading: false,
	cart: [],
	error: "",
};

function cartReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCH_CART_LOADING:
			return { ...state, loading: true };
		case FETCH_CART_SUCCESS:
			return { ...state, loading: false, cart: payload, error: "" };
		case FETCH_CART_ERROR:
			return { ...state, loading: false, cart: [], error: payload };
		default:
			return state;
	}
}

export default cartReducer;
