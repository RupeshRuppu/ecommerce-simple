import React, { useEffect, useState } from "react";
import axios from "axios";
import { PRODUCTS_GET_URL, addItemCartUrl } from "../utils/urls";
import Navbar from "../components/Navbar";
import { storeDispatch } from "../redux/store";
import {
	fetchCartDetails,
	fetchCartError,
	fetchCartSuccess,
} from "../redux/cart/cartActionCreators";
import { getUserFromLS } from "../utils/login";
import { useSelector } from "react-redux";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState("");
	const user = getUserFromLS();
	const { cart } = useSelector(state => state.cart);
	const ids_set = new Set(cart.map(itm => itm.id));

	useEffect(() => {
		getAllProducts();
		storeDispatch(fetchCartDetails(user.id));
	}, []);

	async function getAllProducts() {
		try {
			let response = await axios.get(PRODUCTS_GET_URL);
			let { data, error } = response.data;
			if (error !== null) {
				throw new Error("api failed");
			}
			setProducts(data);
		} catch (err) {
			setError(err.message);
		}
	}

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

	return (
		<div className="h-screen w-screen overflow-x-hidden">
			<Navbar />
			<p className="self-start px-3 text-xl font-semibold my-2 ml-2">
				Products
			</p>
			<div className="flex items-center flex-col gap-y-4 p-5 sm:grid sm:place-items-center sm:grid-cols-2 sm:gap-2 lg:grid-cols-3">
				{products.map((product, ind) => (
					<div key={ind} className="h-72 w-72 rounded-md overflow-hidden mb-3">
						<img
							src={product.imageURL}
							alt="not found"
							className="h-[75%] w-full object-cover"
						/>
						<div className="h-[25%] border-[1px] border-t-0 px-1">
							<p className="text-sm">{product.name}</p>
							<p className="text-sm opacity-60 text-ellipsis truncate">
								{product.desc}
							</p>
							<div className="flex justify-between items-center px-3 my-1">
								<p>${product.price}</p>
								<button
									disabled={ids_set.has(product.id)}
									onClick={() => {
										addItemToCart(product.id);
									}}
									className="bg-blue-400 rounded-md text-sm px-[6px] py-[1px]"
								>
									+Add
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
