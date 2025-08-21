import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      if (!token) {
        if (!cancelled) {
          setLoading(false);
          setAuth(false);
        }
        return;
      }
      try {
        const res = await fetch("http://localhost:8080/auth/check", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!cancelled) {
          setAuth(data.success);
        }
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
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (!auth) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
