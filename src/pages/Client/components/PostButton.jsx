import UploadIcon from "../../../components/Icons/UploadIcon";

function PostButton() {
  return (
    <>
      <button className="bg-black text-white p-2 rounded-md flex">
        <UploadIcon size={"size-5"} />
        <span className="mx-1">Upload</span>
      </button>
    </>
  );
}

export default PostButton;
