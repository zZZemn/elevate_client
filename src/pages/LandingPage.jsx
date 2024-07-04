import { useEffect, useState } from "react";
import axios from "axios";
import LandingNavBar from "../components/LandingNavBar";
import Loading from "../components/Loading";
import Post from "../components/Post";

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
              <Post
                key={post._id}
                post={post}
                btnLikeDisable={true}
                btnCommentDisable={true}
                btnShareDisable={false}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPage;
