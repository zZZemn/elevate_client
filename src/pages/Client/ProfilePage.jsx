import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

  //   profile visited
  const { username } = useParams();
  const [visitedData, setVisitedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, postResponse, visitedResponse] = await Promise.all(
          [
            axios.get(apiUrl + "/user/" + ctoken),
            axios.get(apiUrl + "/post"),
            axios.get(apiUrl + "/user/username/" + username),
          ]
        );

        setUserData(userResponse.data);
        setDataPosts(postResponse.data);
        setVisitedData(visitedResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, ctoken, username]);

  const handleLogout = () => {
    sessionStorage.removeItem("ctoken");
    console.log("Token removed");
    window.location.reload();
  };

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
    console.log(showSideBar);
  };

  console.log(visitedData);

  return (
    <>
      <NavBar handleSideBar={handleSideBar} />
      {showSideBar && (
        <SideBar handleLogout={handleLogout} userData={userData} />
      )}

      {loading ? (
        <Loading />
      ) : (
        <div className="p-5">
          <div className="flex items-center justify-center mt-10">
            <img
              className="h-32 rounded-full p-1"
              src={visitedData.picture}
              alt={`${visitedData.firstName}'s Profile`}
            />
            <div>
              <h1 className="text-4xl font-bold mx-5">
                {visitedData.firstName + " " + visitedData.lastName}
              </h1>
              <h5 className="mx-5">{visitedData.profession}</h5>
            </div>
          </div>
          <hr className="mt-10" />
        </div>
      )}
    </>
  );
}

export default ProfilePage;
