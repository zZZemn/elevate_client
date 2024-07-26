import PostActionButton from "../components/PostActionButton";
import HeartIcon from "../components/Icons/HeartIcon";
import HeartIconSolid from "./Icons/HeartIconSolid";
import CommentIcon from "../components/Icons/CommentIcon";
import ShareIcon from "../components/Icons/ShareIcon";
import { Link } from "react-router-dom";

function Post({
  post,
  btnLikeDisable,
  btnCommentDisable,
  btnShareDisable,
  isLiked,
  handleReaction,
  showComments,
}) {
  return (
    <>
      <div key={post._id} className="bg-white p-2 rounded shadow w-4/5">
        <Link
          className="flex items-center"
          to={`/profile/${post.postedBy.username}`}
        >
          <img
            src={post.postedBy.picture}
            alt={`${post.postedBy.firstName}'s profile`}
            className="w-5 h-5 rounded-full"
          />
          <p className="text-sm font-medium mx-3">
            {post.postedBy.firstName + " " + post.postedBy.lastName}
          </p>
        </Link>
        <Link
          className="mt-4 bg-black flex justify-center"
          to={`/post/${post._id}`}
        >
          <img
            src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
            alt="sample"
          />
        </Link>
        <div className="flex mt-2">
          <PostActionButton
            IconComponent={isLiked ? HeartIconSolid : HeartIcon}
            isDisabled={btnLikeDisable}
            handleClick={handleReaction}
          />
          <PostActionButton
            IconComponent={CommentIcon}
            isDisabled={btnCommentDisable}
            handleClick={showComments}
          />
          <PostActionButton
            IconComponent={ShareIcon}
            isDisabled={btnShareDisable}
          />
        </div>
      </div>
    </>
  );
}

export default Post;
