import { Helmet } from "react-helmet";
import CheckoutSteps from "../components/CheckoutSteps";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { progress } from "../atoms";

const Paymentmethodpage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // Add state to track selected payment method
  const [, setProgresss] = useRecoilState(progress);

  useEffect(() => {
    setProgresss("50%");
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePaymentMethodChange = (event: { target: { value: any } }) => {
    const selectedMethod = event.target.value;
    setSelectedPaymentMethod(selectedMethod);
  };

  return (
    <div>
      <Helmet>
        <title>Payment Page</title>
      </Helmet>
      <Navbar />
      <CheckoutSteps />
      <div className=" mt-15">
        <div className=" flex justify-center text-5xl font-semibold">
          Payment Method
        </div>
        <div className="flex justify-center mt-5">
          <input
            type="radio"
            value="PayPal"
            checked={selectedPaymentMethod === "PayPal"} // Set checked based on state
            onChange={handlePaymentMethodChange}
            className="flex pr-4"
          ></input>
          PayPal
        </div>
        <div className="flex justify-center mt-5">
          <input
            type="radio"
            className="flex pr-4 "
            value="Stripe"
            checked={selectedPaymentMethod === "Stripe"} // Set checked based on state
            onChange={handlePaymentMethodChange}
          ></input>
          Stripe
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="flex justify-center bg-yellow-500 p-2 rounded-lg hover:bg-blue-800 hover:text-white"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Paymentmethodpage;
