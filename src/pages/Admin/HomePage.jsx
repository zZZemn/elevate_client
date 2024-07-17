import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import Loading from "../../components/Loading";

function HomePage() {
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
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <table className="table-fixed w-full border-gray-600">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posted By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Caption
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posted On
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {dataPosts.map((post) => (
              <tr key={post._id}>
                <td className="text-xs p-1">{post._id}</td>
                <td className="text-xs p-1">
                  {post.postedBy.firstName + " " + post.postedBy.LastName}
                </td>
                <td className="text-xs p-1">{post.caption}</td>
                <td className="text-xs p-1">{post.createdAt}</td>
                <td className="text-xs p-1">30</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default HomePage;
