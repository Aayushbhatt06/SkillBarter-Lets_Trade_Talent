import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/check`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!cancelled) setAuth(data.success);
      } catch (err) {
        if (!cancelled) setAuth(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    verify();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!auth) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
