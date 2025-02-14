import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = ({ isAuthenticated, children, adminOnly, isAdmin, redirect = "/login" }) => {
    if (!isAuthenticated)
        return <Navigate to={redirect}/>;
    if (adminOnly && !isAdmin)
        return <Navigate to={redirect}/>;
    return children ? children : <Outlet />;
};
export default ProtectedRoute;
