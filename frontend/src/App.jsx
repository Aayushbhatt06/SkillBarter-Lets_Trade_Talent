// App.jsx
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Layout with Navbar to wrap normal app pages
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  // Auth routes WITHOUT layout
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  // App routes WITH layout
  {
    path: "/",
    element: <Layout />, // Navbar always visible for these children
    children: [
      {
        index: true, // same as path: ""
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      // add more children that should show the Navbar
      // { path: "dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
