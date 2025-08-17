import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Signup from './components/Signup'
import Home from './components/Home'
import Login from './components/Login'

// Layout with Navbar that wraps around all pages
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This is where the page content will load */}
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,   // Navbar always visible
    children: [
      {
        path: "/",          // Home route
        element: <h1><Home/></h1>
      },
      {
        path: "signup",     // Signup route
        element: <Signup />
      },
      {
        path: "login",
        element: <Login/>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
