import { useRecoilValue } from "recoil";
import { progress, theme } from "../atoms";
import { useEffect } from "react";

const CheckoutSteps = () => {
  const currProgress = useRecoilValue(progress);
  const themeVal = useRecoilValue(theme);

  useEffect(() => {}, [currProgress]);

  return (
    <div className={`${themeVal === "Dark" ? "bg-black" : "bg-white"}`}>
      <div
        className={`${
          themeVal === "Dark" ? "bg-black" : "bg-white"
        } flex justify-center space gap-x-60 mt-20`}
      >
        <div className={`${themeVal === "Dark" ? "text-white" : "text-black"}`}>
          Sign In
        </div>
        <div className={`${themeVal === "Dark" ? "text-white" : "text-black"}`}>
          Shipping
        </div>
        <div className={`${themeVal === "Dark" ? "text-white" : "text-black"}`}>
          Payment
        </div>
        <div className={`${themeVal === "Dark" ? "text-white" : "text-black"}`}>
          PlaceOrder
        </div>
      </div>

      <div className="flex justify-center pb-10">
        <div className="w-3/4 bg-gray-200 rounded-full h-2 dark:bg-gray-700 ">
          <div
            className="bg-yellow-600 h-2 rounded-full"
            style={{ width: currProgress }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
