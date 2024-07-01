import { useState, useEffect } from "react";
import axios from "axios";
import LandingNavBar from "../components/LandingNavBar";
import FormBtnSubmit from "../components/FormBtnSubmit";
import FormTextField from "../components/FormTextField";
import Loading from "../components/Loading";
import Alert from "../components/Alert";

function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(apiUrl + "/user/login", formData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Form submitted successfully:", response.data);
          if (response.data.userType == "Creator") {
            sessionStorage.setItem("ctoken", response.data._id);
            window.location.reload();
          } else if (response.data.userType == "Admin") {
            sessionStorage.setItem("atoken", response.data._id);
            window.location.reload();
          } else {
            setError("error");
          }
        } else {
          console.error("Form submission failed with status:", response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        if (error.response) {
          console.log("Error message: ", error.response.data.message);
        } else {
          console.error("Error message:", error.message);
        }
      });
  };

  return (
    <>
      <LandingNavBar />
      {error && (
        <Alert
          alertType="danger"
          alertTitle="Login Failed"
          alertMessage={"Wrong username or password."}
        />
      )}
      {loading && <Loading />}
      <div className="bg-login flex justify-center items-center">
        <div className="bg-login-form  w-full max-w-sm p-3 py-10 mb-40 rounded-lg shadow-md">
          <center className="font-extrabold text-xl">LOGIN</center>
          <form className="mt-10" onSubmit={handleSubmit}>
            <FormTextField
              type={"text"}
              label={"Username"}
              name={"username"}
              value={formData.username}
              onChange={handleChange}
            />
            <FormTextField
              type={"password"}
              label={"Password"}
              name={"password"}
              value={formData.password}
              onChange={handleChange}
            />
            <label className="text-xs text-red-700 mx-1">
              Forgot password?
            </label>
            <FormBtnSubmit label={"Login"} />
          </form>
        </div>
      </div>
    </>
  );
}
// className="w-full max-w-sm border border-gray-300 rounded-lg px-2 py-2 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
export default Login;
