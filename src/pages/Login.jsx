import LandingNavBar from "../components/LandingNavBar";
import FormBtnSubmit from "../components/FormBtnSubmit";
import FormTextField from "../components/FormTextField";

function Login() {
  return (
    <>
      <LandingNavBar />
      <div className="bg-login flex justify-center items-center">
        <div className="bg-login-form  w-full max-w-sm p-3 py-10 mb-40 rounded-lg shadow-md">
          <center className="font-extrabold text-xl">LOGIN</center>
          <div className="mt-10">
            <FormTextField type={"text"} label={"Username"} />
            <FormTextField type={"password"} label={"Password"} />
            <label className="text-xs text-red-700 mx-1">
              Forgot password?
            </label>
            <FormBtnSubmit label={"Login"} />
          </div>
        </div>
      </div>
    </>
  );
}
// className="w-full max-w-sm border border-gray-300 rounded-lg px-2 py-2 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
export default Login;
