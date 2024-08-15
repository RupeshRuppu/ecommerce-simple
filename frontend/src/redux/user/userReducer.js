import {
	FETCH_USERS_ERROR,
	FETCH_USERS_LOADING,
	FETCH_USERS_SUCCESS,
} from "./userActions";

const initialState = {
	loading: false,
	users: [],
	error: "",
};

function userReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCH_USERS_LOADING:
			return { ...state, loading: true };
		case FETCH_USERS_SUCCESS:
			return { ...state, loading: false, users: payload, error: "" };
		case FETCH_USERS_ERROR:
			return { ...state, loading: false, users: [], error: payload };
		default:
			return state;
	}
}

export default userReducer;
