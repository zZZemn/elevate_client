export const handleLogout = () => {
  sessionStorage.removeItem("ctoken");
  console.log("Token removed");
  window.location.reload();
};
