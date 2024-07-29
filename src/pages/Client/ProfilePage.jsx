import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Loading from "../../components/Loading";
import Post from "../../components/Post";
import Comments from "./components/Comments";
import { handleLogout } from "../../utils/auth";

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

  const fetchLikes = async (posts) => {
    if (!posts || posts.length === 0) {
      return;
    }

    const likesMap = {};
    for (const post of posts) {
      const isLiked = await checkReaction(post._id);
      likesMap[post._id] = isLiked;
    }
    setLikes(likesMap);

    console.log("Fetch function");
  };

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
    fetchLikes(dataPosts);
  }, [dataPosts]);

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
    console.log(showSideBar);
  };

  const handleShowModal = (val) => {
    setShowModal(val);
    setShowComments(val);
  };

  const handleShowComment = (post) => {
    setShowComments(true);
    setPostViewComments(post);
  };

  const checkReaction = async (postId) => {
    try {
      const response = await axios.get(
        apiUrl + "/react/" + postId + "/" + userData._id
      );
      console.log(response);
      return response.data.reacted;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleReaction = (postId, reactionType) => {
    const reaction = {
      userId: userData._id,
      postId: postId,
      reaction: reactionType,
    };

    console.log(reaction);

    axios
      .post(apiUrl + "/react", reaction)
      .then((response) => {
        console.log(response);
        fetchLikes(dataPosts);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <NavBar handleSideBar={handleSideBar} />
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
            closeModal={() => handleShowModal(false)}
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
                    handleReaction={() => handleReaction(post._id, 1)}
                    showComments={() => handleShowComment(post)}
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
