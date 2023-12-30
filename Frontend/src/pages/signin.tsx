import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";

const Signin = () => {
  const goToSignup = () => {
    window.location.href = "/signup";
  };

  return (
    <div>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Navbar />
      <div className="flex justify-center text-5xl font-semibold mt-10">
        Sign In
      </div>
      <form className="mt-10  p-4">
        <label className="text-xl flex justify-center ">Email</label>
        <input className=" w-1/4 h-10 rounded-lg border mx-auto border-black flex justify-center"></input>
        <label className="text-xl flex justify-center mt-10">Password</label>
        <input className=" w-1/4 h-10 rounded-lg border border-black mx-auto flex justify-center"></input>
        <button className="bg-yellow-500 flex justify-center mx-auto mt-10 w-1/4 h-10 rounded-lg py-2 text-lg hover:bg-blue-600 hover:text-white">
          Sign In
        </button>
      </form>
      <div className="flex justify-center">
        <span className="pr-2">New Customer ?</span>
        <span
          onClick={goToSignup}
          className="cursor-pointer text-blue-500 underline"
        >
          Create your Account
        </span>
      </div>
    </div>
  );
};

export default Signin;
