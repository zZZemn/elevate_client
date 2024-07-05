import UploadIcon from "../../../components/Icons/UploadIcon";

function PostButton({ onClick }) {
  return (
    <>
      <button
        className="bg-black text-white p-2 rounded-md flex"
        onClick={onClick}
      >
        <UploadIcon size={"size-5"} />
        <span className="mx-1">Upload</span>
      </button>
    </>
  );
}

export default PostButton;
