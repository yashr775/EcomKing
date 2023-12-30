import CheckoutSteps from "../components/CheckoutSteps";
import Navbar from "../components/Navbar";
import { useRecoilState } from "recoil";
import { progress } from "../atoms";
import { Helmet } from "react-helmet";

const Shippingaddresspage = () => {
  const [progresss, setProgresss] = useRecoilState(progress);

  const handleContinueClick = () => {
    setProgresss("50%");
    console.log(progresss);
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <Navbar />
      <CheckoutSteps />
      <div className="flex justify-center text-5xl font-semibold">
        Shipping Address
      </div>
      <form className="mt-10  p-4 mb-10" onSubmit={handleContinueClick}>
        <label className="text-xl flex justify-center ">Full Name</label>
        <input className=" w-1/4 h-10 rounded-lg border mx-auto border-black flex justify-center"></input>
        <label className="text-xl flex justify-center mt-10">Address</label>
        <input className=" w-1/4 h-10 rounded-lg border mx-auto border-black flex justify-center"></input>
        <label className="text-xl flex justify-center mt-10">City</label>
        <input className=" w-1/4 h-10 rounded-lg border border-black mx-auto flex justify-center"></input>
        <label className="text-xl flex justify-center mt-10">Postal Code</label>
        <input className=" w-1/4 h-10 rounded-lg border border-black mx-auto flex justify-center"></input>
        <label className="text-xl flex justify-center mt-10">Country</label>
        <input className=" w-1/4 h-10 rounded-lg border border-black mx-auto flex justify-center"></input>
        <button className="bg-yellow-500 flex justify-center mx-auto mt-10 w-1/4 h-10 rounded-lg py-2 text-lg hover:bg-blue-600 hover:text-white">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Shippingaddresspage;
