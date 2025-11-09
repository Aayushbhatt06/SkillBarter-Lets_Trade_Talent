import React from "react";
import { Link } from "react-router-dom";
import { Home, MessageSquare, User, Settings, Proportions } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-[20vw] bg-white h-screen sticky top-0 border-r border-gray-200 p-4">
      <nav className="bg-slate-50 space-y-2">
        <Link
          to="/"
          className="flex items-center space-x-3 px-4 py-3 text-blue-600 bg-slate-50 rounded-lg font-medium !no-underline"
        >
          <Home size={20} />
          <span>Home</span>
        </Link>

        <Link
          to="/profile"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg !no-underline"
        >
          <User size={20} />
          <span>Profile</span>
        </Link>

        <Link
          to="/newproject"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg !no-underline"
        >
          <Proportions size={20} />
          <span>New Project</span>
        </Link>
      </nav>
      <div className="messages mt-8 p-4 bg-slate-50 max-w-[20vw] rounded-lg">
        <h3 className="font-semibold  text-blue-800 mb-2">Messages</h3>
        <div className="search">
          <input
            className="bg-white/20 shadow min-w-[14vw] border-[1px] text-black border-black  mr-1 rounded-sm p-2 
            hover:bg-gray-200"
            type="text"
            placeholder="Search Connections..."
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
