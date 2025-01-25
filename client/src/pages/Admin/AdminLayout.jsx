import { Outlet, Navigate } from "react-router-dom";
import Header from "../../UI/Header";
import { useSelector } from "react-redux";
import Adminheader from "./Adminheader";

function AdminLayout() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  //if (!currentUser.isAdmin) return <Navigate to="/login" />;
  return (
    <>
      <nav>
        <Adminheader />
      </nav>
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}
export default AdminLayout;
