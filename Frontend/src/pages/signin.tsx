import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { isAuthenticated } from "../atoms";

interface FormData {
  email: string;
  password: string;
}

const Signin = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuthenticatedVal, setIsAuthenticated] =
    useRecoilState(isAuthenticated);

  const goToSignup = () => {
    window.location.href = "/signup";
  };

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitClick = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { email, password } = formData;

      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      console.log(response);
      if (json.success === true) {
        console.log("hgdghdfghdfgjdfghdsfghdfgdfg");
        setIsAuthenticated(true);
        localStorage.setItem("auth-token", json.token);
      }
    } catch (error) {
      console.log("Some error occured");
      console.log("Internal Server Error :: " + error);
    }
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
      <form className="mt-10  p-4" onSubmit={handleSubmitClick}>
        <label className="text-xl flex justify-center " htmlFor="name">
          Email
        </label>
        <input
          className=" w-1/4 h-10 rounded-lg border mx-auto border-black flex justify-center"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <label className="text-xl flex justify-center mt-10" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className=" w-1/4 h-10 rounded-lg border border-black mx-auto flex justify-center"
          name="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
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
