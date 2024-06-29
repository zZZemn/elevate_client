import { useEffect, useState } from "react";
import axios from "axios";
import LandingNavBar from "../components/LandingNavBar";
import Loading from "../components/Loading";
import FormBtnSubmit from "../components/FormBtnSubmit";
import FormTextField from "../components/FormTextField";
import FormSelect from "../components/FormSelect";

function Signup() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [professions, setProfessions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (error) {
    return <center>Error: {error.message}</center>;
  }

  console.log(professions);

  return (
    <>
      <LandingNavBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-login flex justify-center items-center">
          <div className="bg-login-form  w-full max-w-sm p-3 py-10 mb-40 rounded-lg shadow-md">
            <center className="font-extrabold text-xl">SIGN UP</center>
            <div className="mt-10">
              <FormTextField type={"text"} label={"First Name"} />
              <FormTextField type={"text"} label={"Last Name"} />
              <FormSelect label={"Profession"} professions={professions} />
              <FormTextField type={"email"} label={"Email"} />
              <FormTextField type={"text"} label={"Username"} />
              <FormTextField type={"password"} label={"Password"} />
              <FormBtnSubmit label={"Sign up"} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
