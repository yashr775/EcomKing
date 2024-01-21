import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";

const Orderpage = () => {
  const { orderId } = useParams();
  const [shippingData, setShippingData] = useState();
  useEffect(() => {
    setShippingData(JSON.parse(localStorage.getItem("shippingAddress")!));
  }, []);

  return (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <Navbar />
      <div className="flex justify-center mt-10">
        <div>
          <div className="font-semibold text-4xl">Order {orderId}</div>
          <div className="">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orderpage;
