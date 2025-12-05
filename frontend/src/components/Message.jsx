import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Send } from "lucide-react";

const Message = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const roomId = params.get("roomId");
  const receiverId = params.get("id");

  const [newMsg, setNewMsg] = useState("");
  useEffect(() => {
    console.log(roomId);
    console.log(receiverId);
  }, []);

  const handleSend = () => {
    console.log(newMsg);
  };
  return (
    <>
      <div className="header flex items-center rounded-b-2xl gap-3 bg-slate-800 absolute min-w-[80vw]">
        <img
          className="h-10 w-10 rounded-full p-1 m-3 mx-2"
          src={"image.png"}
          alt=""
        />
        <div className="userName">
          <p className="font-medium text-2xl text-white">Aayush</p>
        </div>
      </div>
      <div className="chatArea"></div>
      <div className="input flex items-center bg-slate-800 px-2 py-2 bottom-0 !gap-5 absolute min-w-[80vw]">
        <input
          placeholder="Enter Message to Send"
          value={newMsg}
          onChange={(e) => {
            setNewMsg(e.target.value);
          }}
          className="bg-white rounded-full  px-4 py-3 !ml-10 min-w-[70vw]"
          type="text"
        />
        <button
          title="Send"
          onClick={handleSend}
          className="!mx-2 !border-gray-400 border-2 p-2 items-center !rounded-md"
        >
          <Send className="text-white" />
        </button>
      </div>
    </>
  );
};

export default Message;
