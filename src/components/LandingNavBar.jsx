import { Link } from "react-router-dom";

function LandingNavBar() {
  return (
    <>
      <div>
        <h5>ELEVATE</h5>
        <div>
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </>
  );
}

export default LandingNavBar;
