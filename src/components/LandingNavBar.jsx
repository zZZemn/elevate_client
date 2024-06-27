import { Link } from "react-router-dom";

function LandingNavBar() {
  return (
    <>
      <div className="nav-bar flex justify-between bg-black text-white py-3">
        <h5 className="mx-5">ELEVATE</h5>
        <div>
          <Link className="mx-5" to="/home">Home</Link>
          <Link className="mx-5" to="/login">Login</Link>
          <Link className="mx-5" to="/signup">Sign up</Link>
        </div>
      </div>
    </>
  );
}

export default LandingNavBar;
