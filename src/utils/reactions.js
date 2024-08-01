import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const checkReaction = async (postId, userId) => {
  try {
    const response = await axios.get(
      apiUrl + "/react/" + postId + "/" + userId
    );
    console.log(response);
    return response.data.reacted;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const fetchLikes = async (posts, userId, setLikes) => {
  if (!posts || posts.length === 0) {
    return;
  }

  const likesMap = {};
  for (const post of posts) {
    const isLiked = await checkReaction(post._id, userId);
    likesMap[post._id] = isLiked;
  }
  setLikes(likesMap);

  console.log("Fetch function");
};

export const handleReaction = (
  postId,
  reactionType,
  userData,
  dataPosts,
  setLikes
) => {
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
      fetchLikes(dataPosts, userData._id, setLikes);
    })
    .catch((err) => console.error(err));
};
