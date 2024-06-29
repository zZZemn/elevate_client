import { useEffect, useState } from "react";
import axios from "axios";
import LandingNavBar from "../components/LandingNavBar";
import Loading from "../components/Loading";
import PostActionButton from "../components/PostActionButton";
import HeartIcon from "../components/Icons/HeartIcon";
import CommentIcon from "../components/Icons/CommentIcon";
import ShareIcon from "../components/Icons/ShareIcon";

function LandingPage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [dataPosts, setDataPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(apiUrl + "/post")
      .then((response) => {
        setDataPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <center>Error: {error.message}</center>;
  }

  console.log(dataPosts);

  return (
    <>
      <LandingNavBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Posts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {dataPosts.map((post) => (
              <div key={post._id} className="bg-white p-2 rounded shadow w-4/5">
                <div className="flex items-center">
                  <img
                    src={post.postedBy.picture}
                    alt={`${post.postedBy.firstName}'s profile`}
                    className="w-5 h-5 rounded-full"
                  />
                  <p className="text-sm font-medium mx-3">
                    {post.postedBy.firstName + " " + post.postedBy.lastName}
                  </p>
                </div>
                <div className="mt-4 bg-black flex justify-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXOmr3zAEaBLWe9jQbBVgDAMORmnpRzHO-tQ&s"
                    alt="sample"
                  />
                </div>
                <div className="flex mt-2">
                  <PostActionButton
                    IconComponent={HeartIcon}
                    isDisabled={true}
                  />
                  <PostActionButton
                    IconComponent={CommentIcon}
                    isDisabled={true}
                  />
                  <PostActionButton
                    IconComponent={ShareIcon}
                    isDisabled={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPage;
