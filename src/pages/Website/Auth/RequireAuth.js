import { useContext } from "react";
import { User } from "../context/context";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const user = useContext(User);
  const location = useLocation();

  // تحقق مما إذا كان `user` و `user.auth` موجودين
  if (!user || !user.auth) {
    return <Navigate state={{ from: location }} replace to="./login" />;
  } else {
    // تحقق مما إذا كان `user.auth.userdetails` موجود
    return <Outlet />;
  }
}
