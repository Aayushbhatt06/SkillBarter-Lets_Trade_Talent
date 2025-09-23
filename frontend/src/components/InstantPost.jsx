import React from "react";
import { Camera, Target } from "lucide-react";

const InstantPost = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
              alt="Your avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col gap-2 space-y-2 w-full">
              <input
                type="text"
                placeholder="Post Title"
                className="w-full bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Post Description"
                className="w-full bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <button className="flex items-center space-x-2 text-blue-600 hover:bg-slate-50 px-3 py-1 rounded">
              <Camera size={16} />
              <span>Photo</span>
            </button>

            <button className="bg-slate-600 text-white px-4 py-1 rounded-full hover:bg-slate-700">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstantPost;
