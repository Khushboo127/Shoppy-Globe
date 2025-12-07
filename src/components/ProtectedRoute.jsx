import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!token) {
        // send user to login; keep info about where they came from
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}

