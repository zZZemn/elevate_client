import { Link } from "react-router-dom";
import MenuIcon from "../../../components/Icons/MenuIcon";

function NavBar() {
  return (
    <>
      <div className="nav-bar flex justify-between bg-black text-white py-3">
        <h5 className="mx-5">ELEVATE</h5>
        <div>
          <div className="nav-bar-links">
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
        <button className="hidden">
          <MenuIcon />
        </button>
      </div>
    </>
  );
}

export default NavBar;
