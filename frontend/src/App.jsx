import { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { ModeContext, modeClassContext, tagContext } from "../Context/context";
import Profile from "./components/Profile";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/message",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  const [mode, setMode] = useState(false);
  const [dl, setDl] = useState("light");

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <modeClassContext.Provider value={{ dl, setDl }}>
        <tagContext.Provider>
          <RouterProvider router={router} />
        </tagContext.Provider>
      </modeClassContext.Provider>
    </ModeContext.Provider>
  );
}
