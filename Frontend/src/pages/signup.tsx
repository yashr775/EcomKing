import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../atoms";
import { useRecoilState } from "recoil";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuthenticatedVal, setIsAuthenticated] =
    useRecoilState(isAuthenticated);

  const [formData, setFormdata] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormdata((prevData) => ({ ...prevData, [name]: value }));
    setPasswordMismatch(false); // Reset the passwordMismatch state on each change
  };

  const handleSubmitClick = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { name, email, password, confirmPassword } = formData;

      if (password !== confirmPassword) {
        setPasswordMismatch(true);
        return;
      }
      const response = await fetch(
        "http://localhost:5000/api/user/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const json = await response.json();

      if (json.success === true) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Some error occurred");
      console.error("Internal serverError :: " + error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Sign Up </title>
      </Helmet>
      <Navbar />
      <div className="text-5xl font-semibold flex justify-center mt-10">
        Sign Up
      </div>
      <form className="mt-10 p-4" onSubmit={handleSubmitClick}>
        <label className="text-xl flex justify-center" htmlFor="name">
          Name
        </label>
        <input
          className="w-1/4 h-10 rounded-lg border mx-auto border-black flex justify-center"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        ></input>
        <label className="text-xl flex justify-center mt-10">Email</label>
        <input
          className="w-1/4 h-10 rounded-lg border mx-auto border-black flex justify-center"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        ></input>
        <label className="text-xl flex justify-center mt-10">Password</label>
        <input
          className="w-1/4 h-10 rounded-lg border border-black mx-auto flex justify-center"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        ></input>
        <label className="text-xl flex justify-center mt-10">
          Confirm Password
        </label>
        <input
          className={`w-1/4 h-10 rounded-lg border border-black mx-auto flex justify-center ${
            passwordMismatch ? "border-red-500" : ""
          }`}
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        ></input>
        {passwordMismatch && (
          <div className="text-red-500 mt-2">
            Password and Confirm Password do not match
          </div>
        )}
        <button
          type="submit"
          className="bg-yellow-500 flex justify-center mx-auto mt-10 w-1/4 h-10 rounded-lg py-2 text-lg hover:bg-blue-600 hover:text-white"
        >
          Sign Up
        </button>
      </form>
      <div className="flex justify-center">
        <span>Already have an account ?</span>
        <span className="pl-2 text-blue-500 underline cursor-pointer">
          <Link to="/signin">Sign In</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
