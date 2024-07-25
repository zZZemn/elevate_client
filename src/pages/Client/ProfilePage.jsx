import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Loading from "../../components/Loading";

function ProfilePage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const ctoken = sessionStorage.getItem("ctoken");
  const [userData, setUserData] = useState(null);
  const [dataPosts, setDataPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, postResponse] = await Promise.all([
          axios.get(apiUrl + "/user/" + ctoken),
          axios.get(apiUrl + "/post"),
        ]);

        setUserData(userResponse.data);
        setDataPosts(postResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, ctoken]);

  const handleLogout = () => {
    sessionStorage.removeItem("ctoken");
    console.log("Token removed");
    window.location.reload();
  };

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
    console.log(showSideBar);
  };

  return (
    <>
      <NavBar handleSideBar={handleSideBar} />
      {showSideBar && (
        <SideBar handleLogout={handleLogout} userData={userData} />
      )}

      {loading ? <Loading /> : <div className="p-5">Profile</div>}
    </>
  );
}

export default ProfilePage;
