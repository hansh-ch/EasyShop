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
    <header className="sticky top-0 z-50 border-b bg-black p-4 transition-all duration-300">
      <nav className="flex items-center justify-between text-white">
        <div className="cursor-pointer">
          <span className="text-xl font-semibold">EasyShop</span>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <Link
            className="flex items-center gap-2 text-white transition-transform hover:opacity-90"
            to="/"
          >
            <AiOutlineHome size={20} color="white" />
            <span className="">Home</span>
          </Link>
          <Link
            className="flex items-center gap-2 text-white transition-transform hover:opacity-90"
            to="/shop"
          >
            <AiOutlineShopping size={20} color="white" />
            <span className="">Shop</span>
          </Link>
          <Link
            className="flex items-center gap-2 text-white transition-transform hover:opacity-90"
            to="/cart"
          >
            <AiOutlineShoppingCart size={20} color="white" />
            <span className="">Cart</span>
          </Link>
          <Link
            className="flex items-center gap-2 text-white transition-transform hover:opacity-90"
            to="/favorite"
          >
            <AiOutlineHeart size={20} color="white" />
            <span className="">Favorite</span>
          </Link>
        </div>
        <ul className="hidden items-center gap-4 transition-all lg:flex">
          <li className="rounded-md border border-purple-700 px-3 py-2 duration-300 hover:border-white">
            <Link to="/login" className="flex items-center gap-2 text-white">
              <AiOutlineLogin />
              <span className="">Login</span>
            </Link>
          </li>
          <li className="rounded-md border border-purple-800 px-3 py-2 duration-300 hover:border-white">
            <Link to="/register" className="flex items-center gap-2 text-white">
              <AiOutlineUserAdd />
              <span className="">Register</span>
            </Link>
          </li>
          {currentUser && (
            <li className="">
              <button
                className="flex items-center gap-2 text-white"
                onClick={handleLogout}
              >
                <AiOutlineLogout />
                <span>Logout</span>
              </button>
            </li>
          )}
        </ul>
        {/* {currentUser && (
          <div className="mb-4">
            <li className="inset-0 mx-auto flex items-center gap-2 border border-purple-700 p-1 duration-200 hover:rounded-lg hover:p-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 text-white"
              >
                <AiOutlineUsergroupAdd />
                <span className="nav-item-name">{currentUser.username}</span>
              </Link>
            </li>
          </div>
        )} */}
      </nav>
    </header>
  );
}
export default Header;
