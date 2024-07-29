export const handleLogout = (navigate) => {
  sessionStorage.removeItem("ctoken");
  console.log("Token removed");
  navigate("/login");

  window.location.reload();
};
