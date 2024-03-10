import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const user = localStorage.getItem("blog-token")
    ? JSON.parse(localStorage.getItem("blog-token"))
    : null;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
