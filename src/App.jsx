import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoPage from "./pages/NoPage";
import ClientHomePage from "./pages/Client/HomePage";
import AdminHomePage from "./pages/Admin/HomePage";
import "./App.css";

function App() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const ctoken = sessionStorage.getItem("ctoken");
    const atoken = sessionStorage.getItem("atoken");
    if (ctoken) {
      setUserType("client");
    } else if (atoken) {
      setUserType("admin");
    }
  }, []);
  

  return (
    <BrowserRouter>
      <Routes>
        {userType === "client" ? (
          <>
            <Route path="/" element={<ClientHomePage />} />
            <Route path="/home" element={<ClientHomePage />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : userType === "admin" ? (
          <>
            <Route path="/" element={<AdminHomePage />} />
            <Route path="/home" element={<AdminHomePage />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route index element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NoPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
