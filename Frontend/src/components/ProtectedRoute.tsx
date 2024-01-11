// import { useRecoilState } from "recoil";
// import { isAuthenticated } from "../atoms";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("auth-token");
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin"></Navigate>;
  }
};

export default ProtectedRoute;
