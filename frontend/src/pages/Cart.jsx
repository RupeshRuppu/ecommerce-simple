import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { storeDispatch } from "../redux/store";
import {
	fetchCartDetails,
	fetchCartError,
	fetchCartSuccess,
} from "../redux/cart/cartActionCreators";
import { getUserFromLS } from "../utils/login";
import { addItemCartUrl, deleteItemCartUrl } from "../utils/urls";
import axios from "axios";

const Cart = () => {
	const user = getUserFromLS();
	const { cart } = useSelector(state => state.cart);
	const tp = cart.reduce((acc, itm) => {
		acc += itm.price * itm.quantity;
		return acc;
	}, 0);

	useEffect(() => {
		storeDispatch(fetchCartDetails(user.id));
	}, []);

	const addItemToCart = async pid => {
		try {
			const url = addItemCartUrl(pid);
			let response = await axios.post(url, {
				userid: user.id,
			});
			let { data, error } = response.data;
			if (error !== null) {
				throw new Error("api failed");
			}
			storeDispatch(fetchCartSuccess(data));
		} catch (err) {
			storeDispatch(fetchCartError(err.message));
		}
	};

	const deleteItemToCart = async pid => {
		try {
			const url = deleteItemCartUrl(pid);
			let response = await (
				await fetch(url, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userid: user.id,
					}),
				})
			).json();
			let { data, error } = response;
			if (error != null) {
				throw new Error("api failed");
			}
			storeDispatch(fetchCartSuccess(data));
		} catch (err) {
			storeDispatch(fetchCartError(err.message));
		}
	};

	return (
		<div>
			<header className="h-12 w-full shadow-md flex px-8 items-center justify-end sticky z-40 top-0 bg-white font-semibold">
				Total price : <span className="text-blue-400 ml-2 text-xl">${tp}</span>
			</header>

			<div className="flex items-center flex-col gap-y-4 p-5 sm:grid sm:place-items-center sm:grid-cols-2 sm:gap-2 lg:grid-cols-3">
				{cart.map((cartP, ind) => (
					<div key={ind} className="h-72 w-72 rounded-md overflow-hidden">
						<img
							src={cartP.imageURL}
							alt="not found"
							className="h-[70%] w-full object-cover"
						/>
						<div className="h-[20%]">
							<p className="text-sm">{cartP.name}</p>
							<p className="text-sm opacity-60 text-ellipsis truncate">
								{cartP.desc}
							</p>
							<div></div>
							<p>${cartP.price}</p>
						</div>
						<div className="h-[10%] flex justify-center items-center space-x-5">
							<button
								onClick={() => {
									addItemToCart(cartP.id);
								}}
								className="bg-zinc-500  w-6 h-6 rounded-full flex justify-center items-center text-white text-xl"
							>
								+
							</button>
							<p>{cartP.quantity}</p>
							<button
								onClick={() => {
									deleteItemToCart(cartP.id);
								}}
								className="bg-zinc-500 w-6 h-6 rounded-full flex justify-center items-center text-white text-xl"
							>
								-
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Cart;
