import React, { useEffect, useState } from "react";

const Notification = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [userReq, setUserReq] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const fetchReq = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/connection/fetchreq`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        setMessage("Something Went Wrong");
        setError(true);
        return;
      }
      const data = await res.json();
      console.log(data);
      setUserReq(data.connections);
    } catch (err) {
      setError(true);
      setMessage(err);
    }
  };

  const reqAccept = async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}/connection/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ conId: id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(true);
        setMessage(data.message);
      }
      fetchReq();
    } catch (err) {
      setMessage(err);
      setError(true);
    }
  };

  const reqReject = async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}/connection/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ conId: id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(true);
        setMessage(data.message);
      }
      fetchReq();
    } catch (err) {
      setMessage(err);
      setError(true);
    }
  };

  useEffect(() => {
    fetchReq();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError(false);
      setMessage("");
    }, 5000);
  }, [error]);

  return (
    <>
      <div
        className={` p-4 bg-red-500 max-w-[76vw] min-w-[76vw] rounded-lg mx-4 ${
          error ? `absolute` : `hidden`
        }`}
      >
        <div className="message text-white text-xl">{message}</div>
      </div>
      <div className=" bg-white mx-4 my-3 flex flex-col min-w-[76vw] max-w-[76vw] rounded-2xl mx-10px min-h-[95vh]">
        <div className="requests text-lg mx-3 my-3">
          <h3 className="">Pending Requests : </h3>
          <div className="requests">
            {userReq.map((con) => (
              <div
                id={con._id}
                className="reqs flex px-4 py-2 my-2 rounded-lg justify-between bg-gray-300"
              >
                {con.users[0].name}
                <div className="buttons flex  gap-2">
                  <button
                    onClick={() => {
                      reqAccept(con._id);
                    }}
                    className="bg-green-500 px-2 text-white py-1 !rounded-lg"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      reqReject(con._id);
                    }}
                    className="bg-red-500 px-2 text-white py-1 !rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="Notifications"></div>
      </div>
    </>
  );
};

export default Notification;
