import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";


const Navbar = () => {
  const { user, logoutFunction, loading } = useContext(AuthContext);

  return (
    <div className="bg-blue-500 text-white shadow-md mb-2">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-blue-500 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/my-toys"}>My Toys</Link>
              </li>
              <li>
                {
                  user && user?.email ? <Link to={"/profile"}>My Profile</Link> : ""
                }
              </li>
              <li>
                {
                  <Link to={"/about-us"}>About Us</Link>
                }
              </li>
              <li>
                {
                  user && user?.email ? "" :
                   <Link
                    to={"/login"}
                  >
                    Login
                  </Link>
                }
              </li>
              <li>
                {
                  user && user?.email ? '' :
                   <Link
                    to={"/register"}
                  >
                    Register
                  </Link>
                }
              </li>
            </ul>

          </div>
          <Link className="flex justify-center items-center gap-2 px-4 lg:px-0 text-2xl font-bold text-white" to="/">
            <img className=" w-[50px] " src="/favicon.png" alt="logo" />
            ToyTopia
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "bg-white  text-blue-500" : "text-white"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-toys" className={({ isActive }) => isActive ? "bg-white  text-blue-500" : "text-white"}>
                My Toys
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={({ isActive }) => isActive ? "bg-white  text-blue-500" : "text-white"}>
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-us" className={({ isActive }) => isActive ? "bg-white  text-blue-500" : "text-white"}>
                About Us
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end space-x-4 gap-2">
            {loading ? 
            (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner text-white loading-md"></span>
            </div>

          ) : 
          user && user?.email ? 
                    (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div title={user?.displayName} className="w-10 rounded-full border-2 border-white">
                  <img className="rounded-full"
                    src={user?.photoURL || "https://img.icons8.com/windows/32/user.png"}
                    alt="user photo"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow dropdown-content bg-blue-500 text-white rounded-box w-52">
                <li className="flex justify-center items-center pb-2">
                  <img
                    src={user?.photoURL || "https://img.icons8.com/windows/64/user.png"}
                    alt="user photo"
                    className="rounded-full border"
                  />
                </li>
                <li className="text-center font-semibold border-b border-gray-200 pb-2">
                  {user?.displayName || ""}
                </li>
                <li className="text-center text-sm text-white pb-2">
                  {user?.email}
                </li>
                <li>
                  <button
                    onClick={logoutFunction}
                    className="btn btn-sm bg-white text-blue-500 hover:bg-blue-600 hover:text-white w-full"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) 
          :
           (
            <div className="hidden lg:flex gap-5 items-center">
              <Link
                to={"/login"}
                className="btn bg-white text-blue-500 font-semibold hover:bg-blue-100">
                Login
              </Link>
              <Link
                to={"/register"}
                className="btn bg-white text-blue-500 font-semibold hover:bg-blue-100">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;