export const USERS_GET_URL = "http://127.0.0.1:8000/app/get-users/";
export const PRODUCTS_GET_URL = "http://127.0.0.1:8000/app/get-products/";
export const GET_CART_ITEM_URL = "http://127.0.0.1:8000/app/get-cart-items/";

export const addItemCartUrl = pid =>
	`http://127.0.0.1:8000/app/add-item-cart/${pid}/`;

export const deleteItemCartUrl = pid =>
	`http://127.0.0.1:8000/app/delete-item-cart/${pid}/`;
