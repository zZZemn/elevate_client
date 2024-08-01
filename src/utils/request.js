import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const fetchUserData = async (
  ctoken,
  setUserData,
  setLoading,
  setError
) => {
  try {
    const [userResponse] = await Promise.all([
      axios.get(apiUrl + "/user/" + ctoken),
    ]);

    setUserData(userResponse.data);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};

export const fetchPostByPostId = async (
  postId,
  setLoading,
  setDataPosts,
  setError,
  navigate
) => {
  try {
    const [postResponse] = await Promise.all([
      axios.get(apiUrl + "/post/getpost/" + postId),
    ]);

    if (postResponse.data.length === 0) {
      navigate("/home");
    } else {
      setDataPosts(postResponse.data);
      setLoading(false);
    }
  } catch (error) {
    navigate("/home");
    setError(error);
    setLoading(false);
  }
};

export const fetchUserAndPostData = async (
  ctoken,
  setUserData,
  setDataPosts,
  setLoading,
  setError
) => {
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

export const fetchUserAndVisitedData = async (
  ctoken,
  setUserData,
  setVisitedData,
  setLoading,
  setError,
  username
) => {
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
