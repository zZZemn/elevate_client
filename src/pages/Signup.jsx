import { useEffect, useState } from "react";
import axios from "axios";
import LandingNavBar from "../components/LandingNavBar";
import Loading from "../components/Loading";
import FormBtnSubmit from "../components/FormBtnSubmit";
import FormTextField from "../components/FormTextField";
import FormSelect from "../components/FormSelect";
import Alert from "../components/Alert";

function Signup() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [professions, setProfessions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get(apiUrl + "/profession")
      .then((response) => {
        setProfessions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

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
      .post(apiUrl + "/user", formData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Form submitted successfully:", response.data);
          sessionStorage.setItem("ctoken", response.data._id);
          window.location.reload();
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
          alertTitle="Error"
          alertMessage={error.response.data.message}
        />
      )}
      {loading && <Loading />}
      <div className="bg-login flex justify-center items-center">
        <div className="bg-login-form  w-full max-w-sm p-3 py-10 mb-40 rounded-lg shadow-md">
          <center className="font-extrabold text-xl">SIGN UP</center>
          <form className="mt-10" onSubmit={handleSubmit}>
            <FormTextField
              type="text"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <FormTextField
              type="text"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <FormSelect
              label="Profession"
              name="profession"
              value={formData.profession}
              professions={professions}
              onChange={handleChange}
            />
            <FormTextField
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormTextField
              type="text"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <FormTextField
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormBtnSubmit label="Sign up" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
