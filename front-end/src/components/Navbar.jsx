import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
const Navbar = () => {
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    history("/login");
  };

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <img src={logo} alt={"logo"} style={{ width: "100px" }}></img>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>

          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
