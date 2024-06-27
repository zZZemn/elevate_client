import { useEffect, useState } from "react";
import axios from "axios";
import LandingNavBar from "../components/LandingNavBar";
import Loading from "../components/Loading";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataPosts.map((post) => (
              <div key={post._id} className="bg-white p-4 rounded shadow">
                <img
                  src={post.postedBy.picture}
                  alt={`${post.postedBy.firstName}'s profile`}
                  className="w-16 h-16 rounded-full"
                />
                <h2 className="text-xl font-semibold">{post.caption}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPage;
