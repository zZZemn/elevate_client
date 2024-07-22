import { useState, useEffect } from "react";
import axios from "axios";
import CloseIcon from "../../../components/Icons/CloseIcon";
import SendIcon from "../../../components/Icons/SendIcon";
import { comment } from "postcss";

function Comments({ post, display, closeModal }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [comments, setComments] = useState([]);

  console.log(post._id);

  useEffect(() => {
    if (!post || !post._id) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/comment/${post._id}`);

        console.log(`${apiUrl}/comment/${post._id}`);
        setComments(response.data);
      } catch (err) {
        console.error(err);
        return false;
      }
    };

    fetchData();
  }, [post]);

  useEffect(() => {
    console.log("Comments |");
    console.log(comments);
  }, [comments]);

  return (
    <>
      <div className={`flex flex-col items-center modal ${display}`}>
        <button
          onClick={closeModal}
          className="text-white absolute right-10 top-10"
        >
          <CloseIcon />
        </button>
        <div className="w-4/5 mt-20">
          <div className="flex items-center">
            <img
              src={post.postedBy.picture}
              alt={`${post.postedBy.firstName}'s profile`}
              className="w-10 h-10 rounded-full bg-white p-1"
            />
            <p className="text-lg font-medium mx-3 text-white">
              {post.postedBy.firstName + " " + post.postedBy.lastName}
            </p>
          </div>
          <div className="mt-5">
            {comments.map((comment, index) => {
              return (
                <div
                  key={`${comment._id}-${index}`}
                  className="comment-container mt-3 rounded-md p-2"
                >
                  <div className="flex items-center">
                    <img
                      src={comment.commentedBy.picture}
                      alt={`${comment.commentedBy.firstName}'s profile`}
                      className="w-5 h-5 rounded-full bg-white p-1"
                    />
                    <p className="text-white mx-3 font-medium text-sm">
                      {comment.commentedBy.firstName +
                        " " +
                        comment.commentedBy.lastName}
                    </p>
                  </div>
                  <p className="text-white text-sm mt-3 ml-8">{comment.comment}</p>
                </div>
              );
            })}
          </div>
          <div className="flex mt-10">
            <input
              type="text"
              className="w-full border border-gray-900 rounded-md p-1 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
            />
            <button className="bg-white rounded-md p-1 mx-1">
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comments;
