import PostActionButton from "../components/PostActionButton";
import HeartIcon from "../components/Icons/HeartIcon";
import CommentIcon from "../components/Icons/CommentIcon";
import ShareIcon from "../components/Icons/ShareIcon";

function Post({ post }) {
  return (
    <>
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
          <PostActionButton IconComponent={HeartIcon} isDisabled={true} />
          <PostActionButton IconComponent={CommentIcon} isDisabled={true} />
          <PostActionButton IconComponent={ShareIcon} isDisabled={false} />
        </div>
      </div>
    </>
  );
}

export default Post;
