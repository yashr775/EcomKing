import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { CartItem } from "../types/cart";
import { amountDetails } from "../atoms";
import { useRecoilValue } from "recoil";

interface ShippingData {
  fullname: string;
  address: string;
  city: string;
  country: string;
  postalcode: string;
}

const Orderpage = () => {
  const { orderId } = useParams();
  const [shippingData, setShippingData] = useState<ShippingData | undefined>();
  const [paymentData, setPaymentData] = useState();
  const [cartData, setCartData] = useState<CartItem[] | undefined>();

  const amountDetailsVal = useRecoilValue(amountDetails);

  const { taxAmount, itemsAmount, shippingAmount } = amountDetailsVal;

  useEffect(() => {
    setShippingData(JSON.parse(localStorage.getItem("shippingAddress")!));
    const storedData = JSON.parse(localStorage.getItem("paymentMethod")!);

    setPaymentData(storedData);

    setCartData(JSON.parse(localStorage.getItem("cartItems")!));
  }, []);

  const handlePaymentClick = async () => {
    const { taxAmount, itemsAmount, shippingAmount } = amountDetailsVal;
    const amount = (taxAmount + itemsAmount + shippingAmount) * 100;

    const response = await fetch("http://localhost:5000/api/payment/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    const responseData = await response.json();

    console.log(responseData);
  };

  return (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <Navbar />
      <div className="flex justify-center mt-10">
        <div>
          <div className="font-semibold text-4xl">Order {orderId}</div>

          <div className="shipping mt-10 border border-slate-950 rounded-lg p-4">
            <div className="text-2xl font-semibold">Shipping</div>
            {shippingData ? (
              <>
                <div className="mt-2 text-lg">
                  <span className="font-bold">Name: </span>{" "}
                  {shippingData.fullname}
                </div>{" "}
                <div className="mt-2 text-lg">
                  <span className="font-bold">Address: </span>
                  {shippingData.address},{shippingData.city},
                  {shippingData.postalcode},{shippingData.country}
                </div>
              </>
            ) : (
              <div>Loading shipping data...</div>
            )}
          </div>
          <div className="payment mt-10 border border-slate-950 p-4">
            <div className="text-2xl font-semibold">Payment</div>
            {paymentData ? (
              <>
                <div className="mt-2 text-lg">
                  <span className="font-bold">Method: </span>
                  {paymentData}
                </div>
              </>
            ) : (
              <div>No PaymentData Available</div>
            )}
          </div>
          <div className="cartItems mt-10 border border-slate-950 p-4 mb-10">
            <div className="text-2xl font-semibold">Items</div>
            {cartData ? (
              cartData.map((data) => {
                return (
                  <>
                    <div key={data.slug} className="flex  m-4">
                      <div>
                        <img src={data.image} alt="" className="w-24 h-20" />
                      </div>
                      <div className="ml-4 mt-6 text-xl underline text-blue-600 cursor-pointer">
                        <Link to={`/product/${data.slug}`}>{data.slug}</Link>
                      </div>
                      <div className="pl-48 pt-6 text-lg">{data.quantity}</div>
                      <div className="pl-48 pt-6 text-lg">${data.price}</div>
                    </div>
                  </>
                );
              })
            ) : (
              <div>No Items to display</div>
            )}
          </div>
        </div>
        <div className="border border-blue-100 m-24 h-full p-4">
          <div className="font-semibold text-3xl p-4">Order Summary</div>
          <div className="py-2">
            Items:<span className="pl-20">${itemsAmount}</span>
          </div>
          <hr />
          <div className="py-2">
            Shipping:<span className="pl-14">${shippingAmount}</span>
          </div>
          <hr />
          <div className="py-2">
            Tax: <span className="pl-24">${taxAmount}</span>
          </div>
          <hr />
          <div className="py-2 font-bold">
            Total Amount :{" "}
            <span className="pl-3">
              ${itemsAmount + shippingAmount + taxAmount}
            </span>
          </div>
          <div className="py-2 flex justify-center bg-blue-600 rounded-xl text-white hover:bg-blue-900">
            <button onClick={handlePaymentClick}>PAY</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orderpage;
