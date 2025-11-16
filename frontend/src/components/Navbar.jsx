import React, { useState, useEffect, useRef } from "react";
import { Menu, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";

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
  const [searchRes, setSearchRes] = useState([]);

  const [searchInput, setSearch] = useState("");
  const handelOnChange = (e) => setSearch(e.target.value);

  useEffect(() => {
    setIsSearching(searchRes.length > 0);
  }, [searchRes]);

  useEffect(() => {
    if (!searchInput.trim()) {
      setSearchRes([]);
    }
  }, [searchInput]);


  const handleSubmit = async (e) => {
    e.preventDefault();
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
        console.log(data);
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
      const res = await fetch("http://localhost:8080/api/tagline");
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
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    dispatch(logout());
    window.location.reload();
  };

  return (
    <>
      <div
        className={`users ${
          isSearching ? "flex" : "hidden"
        } fixed left-0 top-16 w-full max-h-[300px] overflow-y-auto z-50 bg-white shadow-lg border rounded-md`}
      >
        {searchRes.map((res) => (
          <div key={res._id} className="p-3 hover:bg-gray-100 cursor-pointer">
            {res.name}
          </div>
        ))}
      </div>

      <header className="bg-slate-800">
        <div className="mx-auto flex flex-col gap-2 px-4 py-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 md:w-1/4 md:min-w-[220px]">
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
            <form onSubmit={handleSubmit} className="relative" role="search">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-600">
                <Search size={18} />
              </span>

              <input
                onChange={handelOnChange}
                value={searchInput}
                type="search"
                placeholder="Search skills, people, or tags"
                className="w-full rounded-full bg-white/90 pl-12 pr-28 py-2.5 text-sm text-slate-800 placeholder:text-slate-500 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-white-300"
              />

              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2  bg-amber-700 px-4 py-2.5 text-sm font-medium text-white
              hover:bg-amber-600 active:bg-amber-700 border border-amber-800/10 shadow-sm !rounded-r-full"
              >
                Search
              </button>
            </form>
          </div>

          <div className="flex items-center justify-end gap-3 md:w-1/4 md:min-w-[180px]">
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
