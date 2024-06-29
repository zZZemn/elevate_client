function PostActionButton({ IconComponent, isDisabled }) {
  return (
    <>
      <button
        className={`mx-1 ${isDisabled && "text-gray-400"}`}
        disabled={isDisabled}
      >
        <IconComponent />
      </button>
    </>
  );
}

export default PostActionButton;
