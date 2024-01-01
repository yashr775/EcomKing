import { useRecoilState } from "recoil";
import CheckoutSteps from "../components/CheckoutSteps";
import Navbar from "../components/Navbar";
import { progress } from "../atoms";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Placeorderpage = () => {
  const [, setProgress] = useRecoilState(progress);

  useEffect(() => {
    setProgress("75%");
  }, []);

  return (
    <div>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <Navbar />
      <CheckoutSteps />
    </div>
  );
};

export default Placeorderpage;
