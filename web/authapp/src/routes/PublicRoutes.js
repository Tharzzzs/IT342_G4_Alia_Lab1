import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const lastPath = localStorage.getItem("lastPath") || "/dashboard";

  if (isAuthenticated) {
    return <Navigate to={lastPath} replace />;
  }

  return children;
};

export default PublicRoute;
