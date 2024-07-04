import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Post from "../../components/Post";
import Loading from "../../components/Loading";

function HomePage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState(null);
  const [dataPosts, setDataPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ctoken = sessionStorage.getItem("ctoken");
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

  console.log(ctoken);

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
    console.log(showSideBar);
  };

  return (
    <>
      <NavBar handleSideBar={handleSideBar} />
      {showSideBar && <SideBar handleLogout={handleLogout} />}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {dataPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}

export default HomePage;
