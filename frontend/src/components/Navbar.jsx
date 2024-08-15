import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/login";
import { useSelector } from "react-redux";

const Navbar = () => {
	const navigate = useNavigate();
	const { cart } = useSelector(state => state.cart);

	return (
		<nav className="h-20 w-full shadow-md flex px-8 items-center justify-between sticky z-40 top-0 bg-white">
			<h1 className="text-2xl font-bold text-black italic ">My Project</h1>
			<div className="flex space-x-3 sm:space-x-4 lg:space-x-6">
				<div className="relative">
					<HiOutlineShoppingCart
						cursor={"pointer"}
						fontSize={28}
						onClick={() => navigate("/cart")}
					/>
					<p className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full flex justify-center items-center text-sm text-white">
						{cart.length}
					</p>
				</div>
				<AiOutlineLogout
					cursor={"pointer"}
					fontSize={25}
					onClick={() => {
						logout(navigate);
					}}
				/>
			</div>
		</nav>
	);
};

export default Navbar;
