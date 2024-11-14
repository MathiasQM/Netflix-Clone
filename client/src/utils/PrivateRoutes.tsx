import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const privateRoutes = () => {
  const { user, isLoading } = useSelector((state: RootState) => state.user.value);
  if (isLoading) return <div>Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default privateRoutes;
