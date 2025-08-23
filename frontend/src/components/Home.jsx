import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const handleLogOut = (e) => {
    localStorage.removeItem("token");
  };
  return (
    <>
      <div>Home Page</div>
      <Link to="/login">
        <button
          onClick={handleLogOut}
          type="button"
          className="btn btn-primary"
        >
          Log Out
        </button>
      </Link>
    </>
  );
};

export default Home;
