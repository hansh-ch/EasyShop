import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineShopping,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
  AiOutlineLogout,
} from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/userSlice";
import { useLogoutMutation } from "../slices/userApiSlice";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  async function handleLogout() {
    const res = await logout();
    console.log(res);
    dispatch(logoutUser());
  }

  return (
    <header
      className="sticky left-0 z-50 hidden h-svh max-w-[4%] overflow-hidden border-b bg-black p-4 transition-all duration-300 hover:max-w-[15%] hover:rounded-br-md hover:rounded-tr-md lg:inline-flex"
      id="navigation-container"
    >
      <nav className="mt-4 h-full flex-col justify-between text-white lg:flex">
        <div className="flex flex-col justify-center space-y-6">
          <Link
            className="flex items-center gap-2 text-white transition-transform hover:opacity-90"
            to="/"
          >
            <AiOutlineHome size={20} color="white" />
            <span className="nav-item-name">Home</span>
          </Link>
          <Link
            className="flex items-center gap-2 text-white transition-transform hover:opacity-90"
            to="/shop"
          >
            <AiOutlineShopping size={20} color="white" />
            <span className="nav-item-name">Shop</span>
          </Link>
          <Link
            className="flex items-center gap-2 text-white transition-transform hover:opacity-90"
            to="/cart"
          >
            <AiOutlineShoppingCart size={20} color="white" />
            <span className="nav-item-name">Cart</span>
          </Link>
          <Link
            className="flex items-center gap-2 text-white transition-transform hover:opacity-90"
            to="/favorite"
          >
            <AiOutlineHeart size={20} color="white" />
            <span className="nav-item-name">Favorite</span>
          </Link>
        </div>

        <ul className="mb-6 space-y-4">
          <li className="inset-0 mx-auto flex items-center gap-2 border-purple-700 uppercase duration-200 hover:rounded-lg hover:border hover:p-2">
            <Link to="/login" className="flex items-center gap-2 text-white">
              <AiOutlineLogin />
              <span className="nav-item-name">Login</span>
            </Link>
          </li>
          <li className="inset-0 mx-auto flex items-center gap-2 border-purple-700 uppercase duration-200 hover:rounded-lg hover:border hover:p-2">
            <Link to="/register" className="flex items-center gap-2 text-white">
              <AiOutlineUserAdd />
              <span className="nav-item-name">Register</span>
            </Link>
          </li>
          {currentUser && (
            <li className="inset-0 mx-auto flex items-center gap-2 border-purple-700 uppercase duration-200 hover:rounded-lg hover:border hover:p-2">
              <button
                className="flex items-center gap-2 text-white"
                onClick={handleLogout}
              >
                <AiOutlineLogout />
                <span className="nav-item-name">Logout</span>
              </button>
            </li>
          )}
        </ul>
        {currentUser && (
          <div className="mb-4">
            <li className="inset-0 mx-auto flex items-center gap-2 border border-purple-700 p-1 duration-200 hover:rounded-lg hover:p-2">
              <Link to="/login" className="flex items-center gap-2 text-white">
                <AiOutlineUsergroupAdd />
                <span className="nav-item-name">{currentUser.username}</span>
              </Link>
            </li>
          </div>
        )}
      </nav>
    </header>
  );
}
export default Header;
