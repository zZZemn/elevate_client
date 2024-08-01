import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Loading from "../../components/Loading";
import Post from "../../components/Post";
import Comments from "./components/Comments";
import { handleLogout } from "../../utils/auth";
import {
  handleSideBar,
  handleShowModal,
  handleShowComment,
} from "../../utils/handleComponents";
import {
  checkReaction,
  fetchLikes,
  handleReaction,
} from "../../utils/reactions";

function ProfilePage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const ctoken = sessionStorage.getItem("ctoken");
  const [userData, setUserData] = useState([]);
  const [dataPosts, setDataPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // Comments
  const [showComments, setShowComments] = useState(false);
  const [postViewComments, setPostViewComments] = useState({
    postedBy: "",
  });

  //   profile visited
  const { username } = useParams();
  const [visitedData, setVisitedData] = useState({
    firstName: "",
    lastName: "",
    picture: "https://cdn-icons-png.flaticon.com/512/456/456212.png",
    userType: "",
  });

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const [userResponse, visitedResponse] = await Promise.all([
          axios.get(apiUrl + "/user/" + ctoken),
          axios.get(apiUrl + "/user/username/" + username),
        ]);

        setUserData(userResponse.data);
        setVisitedData(visitedResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, ctoken, username]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const [postResponse] = await Promise.all([
          axios.get(apiUrl + "/post/" + visitedData._id),
        ]);

        setDataPosts(postResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [visitedData]);

  useEffect(() => {
    fetchLikes(dataPosts, userData._id, setLikes);
  }, [dataPosts]);

  return (
    <>
      <NavBar
        handleSideBar={() => handleSideBar(setShowSideBar, showSideBar)}
      />
      {showSideBar && (
        <SideBar handleLogout={handleLogout} userData={userData} />
      )}

      {loading ? (
        <Loading />
      ) : (
        <div className="p-5 overflow-hidden">
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

          <Comments
            post={postViewComments}
            display={!showComments ? "hidden" : "flex"}
            closeModal={() =>
              handleShowModal(setShowModal, setShowComments, false)
            }
            userId={userData._id}
          />

          <div className="flex flex-col items-center">
            {dataPosts.map((post) => {
              return (
                <div
                  className="mt-5 flex justify-center"
                  key={post._id + "-div"}
                >
                  <Post
                    key={post._id}
                    post={post}
                    btnLikeDisable={false}
                    btnCommentDisable={false}
                    btnShareDisable={false}
                    isLiked={likes[post._id] || false}
                    handleReaction={() =>
                      handleReaction(post._id, 1, userData, dataPosts, setLikes)
                    }
                    showComments={() =>
                      handleShowComment(
                        setShowComments,
                        setPostViewComments,
                        post
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
