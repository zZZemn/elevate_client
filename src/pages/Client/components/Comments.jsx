import SendIcon from "../../../components/Icons/SendIcon";

function Comments() {
  return (
    <>
      <div className="flex justify-between mt-1 w-4/5">
        <input
          type="text"
          className="w-full border border-gray-900 rounded-md p-1 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
        />
        <button className="">
          <SendIcon />
        </button>
      </div>
    </>
  );
}

export default Comments;
