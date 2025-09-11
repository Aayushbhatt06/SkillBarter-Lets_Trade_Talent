import React, { useState, useEffect, useRef } from "react";
import { Menu, Search } from "lucide-react";

const DEFAULT = "Let's Trade Talent!!!";

const Navbar = () => {
  const [tagline, setTagline] = useState("");
  const typingRef = useRef(null);
  const cycleRef = useRef(null);
  const isMounted = useRef(true);
  const [search, setSearch] = useState("");
  const handelOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const req = search.trim().split(" ");
      const res = await fetch("http://localhost:8080/api/findskilled",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(req)
      });

      const data = await res.json();
      if(data.success){
        
      }
    } catch (err) {}
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

  const getTag = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/tagline");
      if (!res.ok) return typeText(DEFAULT);

      let data = null;
      try {
        data = await res.json();
      } catch {
        return typeText(DEFAULT);
      }

      const list = Array.isArray(data?.taglines)
        ? data.taglines
        : Array.isArray(data?.tagLines)
        ? data.tagLines
        : null;

      if (!data?.success || !list || list.length === 0)
        return typeText(DEFAULT);

      const randomTag =
        list[Math.floor(Math.random() * list.length)] || DEFAULT;
      typeText(randomTag, 80);
    } catch {
      typeText(DEFAULT);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    getTag();
    cycleRef.current = setInterval(() => {
      clearTyping();
      getTag();
    }, 6000);

    return () => {
      isMounted.current = false;
      clearTyping();
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, []);

  return (
    <header className="bg-slate-800">
      <div className="mx-auto flex flex-col gap-2 px-4 py-2 md:flex-row md:items-center md:justify-between">
        {/* Left: menu + tagline */}
        <div className="flex items-center gap-2 md:w-1/4 md:min-w-[220px]">
          <Menu size={24} className="text-white" />
          <h6 className="truncate ml-5 mt-2 !text-[16px] font-semibold text-white">
            SkillBarter : {tagline}
          </h6>
        </div>

        {/* Center: search (stays centered, max width for large screens) */}
        <div className="w-full md:w-1/2 md:max-w-2xl md:px-2">
          <form onSubmit={handleSubmit} className="relative" role="search">
            {/* Search icon inside input */}
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-600">
              <Search size={18} />
            </span>

            {/* Input (pill) with space on right for button */}
            <input
              onChange={handelOnChange}
              value={search}
              type="search"
              placeholder="Search skills, people, or tags"
              className="w-full rounded-full bg-white/90 pl-12 pr-28 py-2.5 text-sm text-slate-800 placeholder:text-slate-500 shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-white-300"
            />

            {/* Rounded button positioned inside the input field */}
            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2  bg-amber-700 px-4 py-2.5 text-sm font-medium text-white
                         hover:bg-amber-600 active:bg-amber-700 border border-amber-800/10 shadow-sm !rounded-r-full"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right: profile (or actions) */}
        <div className="flex items-center justify-end gap-3 md:w-1/4 md:min-w-[180px]">
          <div className="h-8 w-8 hidden rounded-full border border-amber-900/30 bg-amber-800/70 sm:flex" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
