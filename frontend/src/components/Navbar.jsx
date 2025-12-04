import React, { useState, useEffect, useRef } from "react";
import { Menu, Search, Bell } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { sendConnection } from "./SendConnection";

const DEFAULT = "Let's Trade Talent!!!";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tagline, setTagline] = useState("");
  const [tags, setTags] = useState([]);
  const typingRef = useRef(null);
  const cycleRef = useRef(null);
  const isMounted = useRef(true);
  const lastIndexRef = useRef(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [searchRes, setSearchRes] = useState([]);

  const [searchInput, setSearch] = useState("");
  const handelOnChange = (e) => setSearch(e.target.value);

  useEffect(() => {
    const query = searchInput.trim();

    if (query.length <= 2) {
      setSearchRes([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const timer = setTimeout(() => {
      runSearch();
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const runSearch = async () => {
    try {
      const search = searchInput.trim().split(" ");
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/findskilled`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ search }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setSearchRes(data.users || []);
      } else {
        setSearchRes([]);
      }
    } catch (err) {
      console.error(err);
      setSearchRes([]);
    }
  };
  const clearTyping = () => {
    if (typingRef.current) {
      clearInterval(typingRef.current);
      typingRef.current = null;
    }
  };

  const typeText = (text, speed = 100) => {
    clearTyping();
    let i = 0;
    setTagline("");
    typingRef.current = setInterval(() => {
      if (!isMounted.current) return clearTyping();
      i += 1;
      setTagline(text.slice(0, i));
      if (i >= text.length) clearTyping();
    }, speed);
  };

  const nextRandomIndex = (len) => {
    if (len <= 1) return 0;
    let idx = Math.floor(Math.random() * len);
    if (idx === lastIndexRef.current) {
      idx = (idx + 1) % len;
    }
    lastIndexRef.current = idx;
    return idx;
  };

  const getTag = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tagline`
      );
      if (!res.ok) {
        typeText(DEFAULT);
        return;
      }

      let data = null;
      try {
        data = await res.json();
      } catch {
        typeText(DEFAULT);
        return;
      }

      const list = Array.isArray(data?.tagLines)
        ? data.tagLines.filter(Boolean)
        : [];
      if (!list.length) {
        setTags([]);
        typeText(DEFAULT);
        return;
      }
      setTags(list);
      const firstIdx = nextRandomIndex(list.length);
      typeText(list[firstIdx] || DEFAULT);
    } catch {
      typeText(DEFAULT);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    getTag();

    const cycleMs = 6000;
    cycleRef.current = setInterval(() => {
      clearTyping();
      const list = tags && tags.length ? tags : [DEFAULT];
      const idx = nextRandomIndex(list.length);
      setTimeout(() => typeText(list[idx] || DEFAULT), 100);
    }, cycleMs);

    return () => {
      isMounted.current = false;
      clearTyping();
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [tags.length]);

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    dispatch(logout());
    window.location.reload();
  };

  const handleConnection = async (receiverId) => {
    const res = await sendConnection(receiverId);

    if (!res.ok || res.data.success === false) {
      setError(true);
      setMessage(res.data?.message || "Something went wrong");
    } else {
      setError(false);
      setMessage(res.data?.message || "Request Sent Successfully");
    }

    setTimeout(() => {
      setMessage("");
      setError(false);
    }, 4000);
  };

  return (
    <>
      {message && (
        <div
          className={`
      fixed bottom-6 right-6 z-50
      px-5 py-3 rounded-xl shadow-lg
      text-white font-semibold text-sm
      backdrop-blur-md 
      animate-bounce
      ${error ? "bg-red-500/80" : "bg-green-500/80"}
    `}
        >
          {message}
        </div>
      )}
      <div
        className={`users ${
          searchInput.length > 2 ? "block" : "hidden"
        } fixed left-1/2 -translate-x-1/2 top-16 
  w-[30vw] max-h-[350px] overflow-y-auto 
  z-50 bg-white shadow-lg border border-gray-200 rounded-lg
  divide-y divide-gray-100`}
      >
        {searchRes.map((res) => (
          <div
            key={res._id}
            className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={res.image || "image.png"}
                alt="profile"
              />
              <span className="text-gray-700 font-medium">{res.name}</span>
            </div>

            <button
              onClick={() => {
                handleConnection(res._id);
              }}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-1.5 !rounded-md text-sm shadow-sm"
            >
              Connect
            </button>
          </div>
        ))}
      </div>

      <header className="bg-slate-800">
        <div className="mx-auto flex flex-col gap-2 px-4 py-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 md:w-1/4 md:min-w-[220px]">
            <Menu className="text-white md:hidden" />
            <div className="heading flex gap-0 justify-items-start">
              <h6
                onClick={() => {
                  navigate("/");
                }}
                className="truncate ml-2 mt-2 !text-[16px] cursor-pointer font-semibold text-white"
              >
                SkillBarter :{" "}
              </h6>
              <h6 className="truncate ml-2 mt-2 !text-[16px] font-semibold text-white">
                {tagline}
              </h6>
            </div>
          </div>

          <div className="w-full md:w-1/2 md:max-w-2xl md:px-2">
            <div className="relative" role="search">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-600">
                <Search size={18} />
              </span>

              <input
                onChange={handelOnChange}
                value={searchInput}
                type="search"
                placeholder="Search skills, people, or tags"
                className="w-full rounded-full bg-white/90 pl-12 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-white-300"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 md:w-1/4 md:min-w-[180px]">
            <button
              className="text-white"
              onClick={() => {
                navigate("/notification");
              }}
            >
              <Bell />
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-700 px-4 py-2 rounded text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
