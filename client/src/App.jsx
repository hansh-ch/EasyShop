import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Auth/Login";
import PageNotFound from "./pages/PageNotFound";
import "react-toastify/ReactToastify.css";
import Register from "./pages/Auth/Register";
import ProtectRoute from "./UI/ProtectRoute";
import Profile from "./pages/Users/Profile";
import AdminLayout from "./pages/Admin/AdminLayout";
import UserList from "./pages/Admin/UserList";
import EditUser from "./pages/Admin/EditUser";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProductList from "./pages/Admin/Product/ProductList";
import UpdateProduct from "./pages/Admin/Product/UpdateProduct";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route element={<ProtectRoute />}>
            {/* PRIVATE */}
            <Route path="/" element={<AppLayout />}>
              <Route path="profile" element={<Profile />} />
            </Route>
            {/* Admin Route */}
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="userlist" element={<UserList />} />
              <Route path="user/edit/:id" element={<EditUser />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products/update/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
        {/* PUBLIC */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;
