import { Helmet } from "react-helmet";
import CheckoutSteps from "../components/CheckoutSteps";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { paymentMethod, progress, theme } from "../atoms";
import { useNavigate } from "react-router-dom";

const Paymentmethodpage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // Add state to track selected payment method
  const [, setProgresss] = useRecoilState(progress);
  const [, setPaymentMethod] = useRecoilState(paymentMethod);
  const themeVal = useRecoilValue(theme);

  const navigate = useNavigate();

  useEffect(() => {
    setProgresss("75%");
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePaymentMethodChange = (event: { target: { value: any } }) => {
    const selectedMethod = event.target.value;
    setSelectedPaymentMethod(selectedMethod);
  };

  const handleContinueClick = () => {
    setPaymentMethod(selectedPaymentMethod);
    localStorage.setItem(
      "paymentMethod",
      JSON.stringify(selectedPaymentMethod)
    );
    navigate("/placeorder");
  };

  return (
    <div
      className={`${
        themeVal === "Dark" ? "bg-black" : "bg-white-200"
      } w-screen h-screen`}
    >
      <Helmet>
        <title>Payment Page</title>
      </Helmet>
      <Navbar />
      <CheckoutSteps />
      <div className=" mt-15">
        <div
          className={` ${
            themeVal === "Dark" ? "text-white" : "text-black"
          } flex justify-center text-5xl font-semibold`}
        >
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
          <span
            className={`${themeVal === "Dark" ? "text-white" : "text-black"}`}
          >
            PayPal
          </span>
        </div>
        <div className="flex justify-center mt-5">
          <input
            type="radio"
            className="flex pr-4 "
            value="Stripe"
            checked={selectedPaymentMethod === "Stripe"} // Set checked based on state
            onChange={handlePaymentMethodChange}
          ></input>
          <span
            className={`${themeVal === "Dark" ? "text-white" : "text-black"}`}
          >
            Stripe
          </span>
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="flex justify-center bg-yellow-500 p-2 rounded-lg hover:bg-blue-800 hover:text-white"
            onClick={handleContinueClick}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Paymentmethodpage;
