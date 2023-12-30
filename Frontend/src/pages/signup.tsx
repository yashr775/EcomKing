import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";

const signup = () => {
  return (
    <div>
      <Helmet>
        <title>Sign Up </title>
      </Helmet>
      <Navbar />
      <div className="text-5xl font-semibold flex justify-center mt-10">
        Sign Up
      </div>
      <form className="mt-10  p-4">
        <label className="text-xl flex justify-center ">Name</label>
        <input className=" w-1/4 h-10 rounded-lg border mx-auto border-black flex justify-center"></input>
        <label className="text-xl flex justify-center mt-10">Email</label>
        <input className=" w-1/4 h-10 rounded-lg border mx-auto border-black flex justify-center"></input>
        <label className="text-xl flex justify-center mt-10">Password</label>
        <input className=" w-1/4 h-10 rounded-lg border border-black mx-auto flex justify-center"></input>
        <label className="text-xl flex justify-center mt-10">
          Confirm Password
        </label>
        <input className=" w-1/4 h-10 rounded-lg border border-black mx-auto flex justify-center"></input>
        <button className="bg-yellow-500 flex justify-center mx-auto mt-10 w-1/4 h-10 rounded-lg py-2 text-lg hover:bg-blue-600 hover:text-white">
          Sign Up
        </button>
      </form>
      <div className="flex justify-center">
        <span>Already have an account ?</span>
        <span className="pl-2 text-blue-500 underline cursor-pointer">
          Sign In
        </span>
      </div>
    </div>
  );
};

export default signup;
