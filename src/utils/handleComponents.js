export const handleSideBar = (setShowSideBar, showSideBar) => {
  setShowSideBar(!showSideBar);
  console.log(showSideBar);
};

export const handleShowModal = (setShowModal, setShowComments, val) => {
  setShowModal(val);
  setShowComments(val);
};

export const handleShowComment = (
  setShowComments,
  setPostViewComments,
  post
) => {
  setShowComments(true);
  setPostViewComments(post);
};
