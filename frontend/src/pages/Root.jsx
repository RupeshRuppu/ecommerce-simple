import { HiMiniUser } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { getUserFromLS, userLogin } from "../utils/login";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

function Root() {
	const { users, loading, error } = useSelector(state => state.user);
	const navigate = useNavigate();

	useLayoutEffect(() => {
		checkUser();
	}, []);

	function checkUser() {
		const user = getUserFromLS();

		if (user) {
			navigate("/home");
		}
	}

	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<div className="h-full w-full flex flex-col justify-center gap-3 items-center">
				{loading ? (
					<AiOutlineLoading3Quarters
						className="animate-spin w-8 h-8"
						color="#6d6dff"
					/>
				) : error ? (
					<p className="text-xl font-semibold text-red-500">
						{error}...please try again later.
					</p>
				) : (
					users.map((user, index) => (
						<div key={index} className="flex items-center">
							Login with user :
							<span
								onClick={() => userLogin(user)}
								className="text-2xl text-center  cursor-pointer"
							>
								<Link to="/home" className="flex items-center">
									<HiMiniUser fontSize={25} /> {user.name}
								</Link>
							</span>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default Root;

/*

   <p className="text-xl font-semibold text-red-500">
      {error}...please try again later.
   </p>

*/
