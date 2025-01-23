import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginUser } from "../slices/userSlice";
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
function ProtectRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(
    function () {
      if (user) dispatch(loginUser(user));
    },
    [dispatch, navigate],
  );
  if (currentUser !== "null" && currentUser !== "undefined") {
    return <Outlet />;
  } else return <Navigate to="/login" />;
}
export default ProtectRoute;
