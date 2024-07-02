import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "../../../components/Icons/MenuIcon";

function NavBar({ handleSideBar }) {
  return (
    <>
      <div className="nav-bar flex justify-between bg-black text-white py-3">
        <h5 className="mx-5">ELEVATE</h5>
        <div>
          <div className="nav-bar-links hidden sm:flex">
            <Link className="mx-5" to="/home">
              Home
            </Link>
            <Link className="mx-5" to="/login">
              Login
            </Link>
            <Link className="mx-5" to="/signup">
              Sign up
            </Link>
          </div>
        </div>
        <button className="mx-5 sm:hidden" onClick={handleSideBar}>
          <MenuIcon />
        </button>
      </div>
    </>
  );
}

export default NavBar;
