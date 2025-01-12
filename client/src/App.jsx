import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Auth/Login";
import PageNotFound from "./pages/PageNotFound";
import "react-toastify/ReactToastify.css";
import Register from "./pages/Auth/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<AppLayout />}></Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;
