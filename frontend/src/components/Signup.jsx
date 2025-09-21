import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }

      const data = await res.json();
      console.log("Response:", data);

      if (data?.success) {
        navigate("/login");
      } else {
        setErrorMsg(data?.message || "Signup failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMsg(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-6 py-12">
      <div
        className=" 
          max-w-sm p-5 rounded-2xl
          border-2 border-white/15           
          bg-white/10                        
          shadow-xl shadow-black/20
          backdrop-blur-md
        "
      >
        <div className="">
          <h2 className=" text-center text-3xl font-bold  text-white">
            Welcome to SkillMate
          </h2>
        </div>

        <div className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-100"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleOnChange}
                  placeholder="Enter your Name"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Enter valid email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-100"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  placeholder="Password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm"
                />
              </div>
            </div>

            {errorMsg ? (
              <p className="text-sm text-rose-200">{errorMsg}</p>
            ) : null}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="
                  flex w-full justify-center rounded
                  bg-blue-600 hover:bg-blue-500            
                  px-3 py-2 text-sm font-semibold text-white
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400  
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-200">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-blue-200 hover:text-blue-100"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
