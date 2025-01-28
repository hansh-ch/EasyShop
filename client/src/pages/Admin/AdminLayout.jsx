import { Outlet, Navigate, Link } from "react-router-dom";
import Header from "../../UI/Header";
import { useSelector } from "react-redux";
import Adminheader from "./Adminheader";
import AdminSidebar from "./AdminSIdebar";

function AdminLayout() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  //if (!currentUser.isAdmin) return <Navigate to="/login" />;
  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid lg:grid-cols-[1fr_5fr] lg:gap-4">
        <aside className="hidden h-screen flex-col items-center bg-slate-600 px-4 py-6 lg:flex">
          <AdminSidebar />
        </aside>
        <main className="min-h-screen overflow-y-scroll py-3">
          <Outlet />
        </main>
      </div>
      {/* <nav>
        <Adminheader />
      </nav>
      <main className="py-3">
        <Outlet />
      </main> */}
    </div>
  );
}
export default AdminLayout;
