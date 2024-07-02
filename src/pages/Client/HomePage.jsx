import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

function HomePage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userData, setuserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ctoken = sessionStorage.getItem("ctoken");
  const [sideBar, setSideBar] = useState(false);

  useEffect(() => {
    axios
      .get(apiUrl + "/user/" + ctoken)
      .then((response) => {
        setuserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("ctoken");
    console.log("Token removed");
    window.location.reload();
  };

  console.log(ctoken);

  const handleSideBar = () => {
    setSideBar(!sideBar);
    console.log(sideBar);
  };

  return (
    <>
      <h1>
        <NavBar handleSideBar={handleSideBar} />
        {sideBar && <SideBar />}
        <center>Client</center>
      </h1>
    </>
  );
}

export default HomePage;
