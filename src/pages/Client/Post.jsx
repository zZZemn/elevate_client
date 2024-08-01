import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Post from "../../components/Post";
import Loading from "../../components/Loading";
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
import { fetchUserData, fetchPostByPostId } from "../../utils/request";

function UserPost() {
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

  // Post
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  console.log("id: " + postId);

  useEffect(() => {
    fetchUserData(ctoken, setUserData, setLoading, setError);
    fetchPostByPostId(postId, setLoading, setDataPosts, setError, navigate);
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
          <h5>Post</h5>
          <Comments
            post={postViewComments}
            display={!showComments ? "hidden" : "flex"}
            closeModal={() =>
              handleShowModal(setShowModal, setShowComments, false)
            }
            userId={userData._id}
          />
          <div className="flex justify-center mt-5">
            <div className="flex justify-center mt-5 max-w-screen-sm">
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

export default UserPost;
