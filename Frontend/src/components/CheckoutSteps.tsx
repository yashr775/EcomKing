import { useRecoilValue } from "recoil";
import { progress } from "../atoms";
import { useEffect } from "react";

const CheckoutSteps = () => {
  const currProgress = useRecoilValue(progress);

  useEffect(() => {}, [currProgress]);

  return (
    <div>
      <div className="flex justify-center space gap-x-60 mt-20">
        <div>Sign In</div>
        <div>Shipping</div>
        <div>Payment</div>
        <div>PlaceOrder</div>
      </div>

      <div className="flex justify-center">
        <div className="w-3/4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ">
          <div
            className="bg-yellow-600 h-2.5 rounded-full"
            style={{ width: currProgress }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
