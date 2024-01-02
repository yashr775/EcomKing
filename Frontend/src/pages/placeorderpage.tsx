import { useRecoilState } from "recoil";
import CheckoutSteps from "../components/CheckoutSteps";
import Navbar from "../components/Navbar";
import { progress } from "../atoms";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { shippingaddress } from "../types/shippingAddress";
import { Link } from "react-router-dom";
import { CartItem } from "../types/cart";

const Placeorderpage = () => {
  const [, setProgress] = useRecoilState(progress);

  useEffect(() => {
    setProgress("100%");
  }, []);

  const defaultShippingAddress: shippingaddress = {
    fullname: "",
    address: "",
    city: "",
    country: "",
    postalcode: "",
  };

  const [shippingAddressVal, setShippingAddressVal] = useState<shippingaddress>(
    defaultShippingAddress
  );

  const [paymentMethod, setPaymentMethod] = useState();
  const [sum, setSum] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getDatas = () => {
    const storedShippingAddress = localStorage.getItem("shippingAddress");
    const paymentMethodVal = JSON.parse(localStorage.getItem("paymentMethod")!);
    const cartItemsArr = JSON.parse(localStorage.getItem("cartItems")!);

    if (storedShippingAddress) {
      setShippingAddressVal(JSON.parse(storedShippingAddress));
    }

    if (paymentMethodVal) {
      setPaymentMethod(paymentMethodVal);
    }

    if (cartItemsArr) {
      setCartItems(cartItemsArr);

      let tempSum = 0;
      for (let i = 0; i < cartItemsArr.length; i++) {
        tempSum += cartItemsArr[i].price;
      }

      setSum(tempSum);
      const tempTax = 0.15 * tempSum;
      setTax(tempTax);
      let tempShipping = 0;
      if (tempSum < 1000) {
        tempShipping = 0.1 * tempSum;
      }
      setShipping(tempShipping);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <Navbar />
      <CheckoutSteps />
      <div className="text-5xl font-bold flex justify-center m-5">
        Preview Order
      </div>
      <div className="flex justify-center w-screen">
        <div className=" w-1/4">
          <div className="border border-solid p-2 w-full rounded-lg">
            <div className="text-2xl font-semibold grid grid-col-1 pb-5">
              Shipping
            </div>
            <div>
              <span className="font-bold">Name</span> :{" "}
              {shippingAddressVal.fullname},{shippingAddressVal.city},
              {shippingAddressVal.postalcode},{shippingAddressVal.country}
            </div>
            <div>
              <span className="font-bold">Address</span> :{" "}
              {shippingAddressVal.address},{shippingAddressVal.city},
              {shippingAddressVal.postalcode},{shippingAddressVal.country}
            </div>
            <div className="mt-5 text-blue-500 underline">
              <Link to="/shippingaddress">Edit</Link>
            </div>
          </div>
          <div className="mt-5 border border-solid p-2 rounded-lg">
            <div className="text-2xl font-semibold grid grid-col-1 pb-1">
              Payment
            </div>
            <div className="pb-3">
              <span className="font-bold">Method : </span>
              {paymentMethod}
            </div>
            <div className="text-blue-500 underline">
              <Link to="/paymentpage">Edit</Link>
            </div>
          </div>
          <div className="mt-5 border border-solid p-2 mb-10 rounded-lg">
            <div className="text-2xl font-semibold grid grid-col-1 ">Items</div>
            <div className="">
              {cartItems.map((item) => (
                <div key={item.slug} className="flex  m-2 p-2 w-full h-full">
                  <div className="w-20 h-20">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="text-xl pl-5 pt-5 text-blue-500 underline">
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                  </div>
                  <div className="pl-16 pt-6">{item.quantity}</div>
                  <div className="pl-16 pt-6">${item.price} </div>
                  <hr></hr>
                </div>
              ))}
            </div>
            <div className="text-blue-500 underline pt-5">
              <Link to="/cart">Edit</Link>
            </div>
          </div>
        </div>
        <div className="border border-solid ml-16 h-full rounded-lg ">
          <div className="text-xl font-semibold p-2">Order Summary</div>
          <div className="m-2">
            <span className=" p-2 mt-10">Items</span>${sum}
            <hr></hr>
          </div>
          <div className="m-2">
            <span className=" p-2 mt-10">Shipping</span>${shipping}
            <hr></hr>
          </div>
          <div className="m-2">
            <span className=" p-2 mt-10">Tax</span>${tax}
            <hr></hr>
          </div>
          <div className="font-bold m-2">
            <span className=" p-2 mt-10">Order Total</span>$
            {sum + shipping + tax}
            <hr></hr>
          </div>
          <div className="m-5">
            <button className="w-full h-full bg-yellow-500 rounded-md hover:bg-blue-800 hover:text-white">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeorderpage;
