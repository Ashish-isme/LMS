import { Fragment } from "react";
import { useLocation, Navigate } from "react-router-dom";

function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();

  if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }
  if (
    authenticated &&
    user?.role !== "primaryUser" &&
    (location.pathname.includes("primaryUser") ||
      location.pathname.includes("/auth"))
  ) {
    return <Navigate to="/home" />;
  }

  if (
    authenticated &&
    user.role === "primaryUser" &&
    !location.pathname.includes("primaryUser")
  ) {
    return <Navigate to="/primaryUser" />;
  }
  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;
