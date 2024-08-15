import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Cart from "./pages/Cart";
import { storeDispatch } from "./redux/store";
import { fetchUsers } from "./redux/user/userActionCreators";

storeDispatch(fetchUsers());

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" exact element={<Root />} />
					<Route path="/home" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
