import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Post from "../../components/Post";
import Loading from "../../components/Loading";
import PostButton from "./components/PostButton";
import PostModal from "./components/PostModal";
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
import { fetchUserAndPostData } from "../../utils/request";

function HomePage() {
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

  useEffect(() => {
    fetchUserAndPostData(
      ctoken,
      setUserData,
      setDataPosts,
      setLoading,
      setError
    );
  }, [apiUrl, ctoken]);

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
        <div className="p-5">
          <div className="flex justify-end">
            <PostButton
              onClick={() =>
                handleShowModal(setShowModal, setShowComments, true)
              }
            />
          </div>

          <PostModal
            userId={userData._id}
            display={!showModal ? "hidden" : "flex"}
            closeModal={() =>
              handleShowModal(setShowModal, setShowComments, false)
            }
          />

          <Comments
            post={postViewComments}
            display={!showComments ? "hidden" : "flex"}
            closeModal={() =>
              handleShowModal(setShowModal, setShowComments, false)
            }
            userId={userData._id}
          />

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5 max-w-screen-lg">
              {dataPosts.map((post) => {
                return (
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
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
