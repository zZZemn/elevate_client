import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Post from "../../components/Post";
import Loading from "../../components/Loading";
import PostButton from "./components/PostButton";
import PostModal from "./components/PostModal";

function HomePage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const ctoken = sessionStorage.getItem("ctoken");
  const [userData, setUserData] = useState(null);
  const [dataPosts, setDataPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleShowModal = (val) => {
    setShowModal(val);
    console.log(val);
  };

  return (
    <>
      <NavBar handleSideBar={handleSideBar} />
      {showSideBar && <SideBar handleLogout={handleLogout} />}

      {loading ? (
        <Loading />
      ) : (
        <div className="p-5">
          <div className="flex justify-end">
            <PostButton onClick={() => handleShowModal(true)} />
          </div>
          <PostModal
            userId={userData._id}
            display={!showModal ? "hidden" : "flex"}
            closeModal={() => handleShowModal(false)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5">
            {dataPosts.map((post) => (
              <Post
                key={post._id}
                post={post}
                btnLikeDisable={false}
                btnCommentDisable={false}
                btnShareDisable={false}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
