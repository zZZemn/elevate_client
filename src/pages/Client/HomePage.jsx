import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userData, setuserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ctoken = sessionStorage.getItem("ctoken");

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

  return (
    <>
      <h1>
        <center>Client</center>
        <button onClick={handleLogout}>Log Out</button>
      </h1>
    </>
  );
}

export default HomePage;
