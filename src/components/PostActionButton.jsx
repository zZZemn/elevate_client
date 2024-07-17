function PostActionButton({ IconComponent, isDisabled, handleClick }) {
  return (
    <>
      <button
        className={`mx-1 ${isDisabled && "text-gray-400"}`}
        disabled={isDisabled}
        onClick={handleClick}
      >
        <IconComponent />
      </button>
    </>
  );
}

export default PostActionButton;
