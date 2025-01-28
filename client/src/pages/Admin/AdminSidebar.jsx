import {
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineShopping,
  AiOutlineUserAdd,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
function AdminSidebar() {
  return (
    <div className="flex flex-col items-center justify-between">
      <p className="mb-5 text-xl font-bold text-white">EasyShop</p>
      <div className="ml-[-20px] flex flex-col justify-center gap-6">
        <li className="list-none border border-purple-400 px-3 py-2 hover:border-yellow-300">
          <Link
            className="flex items-center gap-2 text-white transition-transform hover:opacity-90"
            to="/admin"
          >
            <AiOutlineHome size={20} color="white" />
            <span className="">Dashboard</span>
          </Link>
        </li>
        <li className="list-none border border-purple-400 px-3 py-2 hover:border-yellow-300">
          <Link
            className="flex items-center gap-2 text-white transition-transform hover:opacity-90"
            to="/admin/userlist"
          >
            <FaUsers size={20} color="white" />
            <span className="">User-lists</span>
          </Link>
        </li>
        <li className="list-none border border-purple-400 px-3 py-2 hover:border-yellow-300">
          <Link
            className="flex items-center gap-2 text-white transition-transform hover:opacity-90"
            to="/admin/orders"
          >
            <AiOutlineShoppingCart size={20} color="white" />
            <span className="">Orders</span>
          </Link>
        </li>
        <li className="list-none border border-purple-400 px-3 py-2 hover:border-yellow-300">
          <Link
            className="flex items-center gap-2 text-white transition-transform hover:opacity-90"
            to="/admin/products"
          >
            <AiOutlineHeart size={20} color="white" />
            <span className="">Products</span>
          </Link>
        </li>
      </div>
      <div className="ml-[-20px] mt-20">
        <button className="flex items-center gap-2 bg-white px-3 py-2 text-black">
          <AiOutlineLogout /> Logout
        </button>
      </div>
    </div>
  );
}
export default AdminSidebar;
