import { useRecoilState, useRecoilValue } from "recoil";
import CheckoutSteps from "../components/CheckoutSteps";
import Navbar from "../components/Navbar";
import { PaymentAmount, amountDetails, progress, theme } from "../atoms";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { shippingaddress } from "../types/shippingAddress";
import { Link } from "react-router-dom";
import { CartItem } from "../types/cart";
import { useNavigate } from "react-router-dom";

const Placeorderpage = () => {
  const [, setProgress] = useRecoilState(progress);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [amountDetailsVal, setAmountDetailsVal] =
    useRecoilState<PaymentAmount>(amountDetails);

  const themeVal = useRecoilValue(theme);
  const navigate = useNavigate();

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
  const [sum, setSum] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
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
      setTotalPrice(tempSum + tempTax + tempShipping);

      const tempAmountObj = {
        itemsAmount: tempSum,
        taxAmount: tempTax,
        shippingAmount: tempShipping,
        totalAmount: totalPrice,
      };

      setAmountDetailsVal(tempAmountObj);
    }
  };

  const handlePlaceOrderClick = async () => {
    const cartItems = JSON.parse(
      localStorage.getItem("cartItems")!
    ) as CartItem[];

    const orderItems = cartItems.map((cartItem) => ({
      productSlug: cartItem.slug,
      quantity: cartItem.quantity,
    }));

    const paymentMethod = localStorage.getItem("paymentMethod");

    const response = await fetch(
      "http://localhost:5000/api/orders/placeorder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token")!,
        },
        body: JSON.stringify({
          orderItems,
          paymentMethod,
          itemsPrice: sum,
          taxPrice: tax,
          shippingPrice: shipping,
          totalPrice,
        }),
      }
    );

    const responseData = await response.json();
    console.log(responseData);

    navigate(`/order/${responseData}`);
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div
      className={`${
        themeVal === "Dark" ? "bg-black text-white" : "bg-white text-black"
      } w-screen h-full `}
    >
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <Navbar />
      <CheckoutSteps />
      <div
        className={`${
          themeVal === "Dark" ? "text-white" : "text-black"
        } text-5xl font-bold flex justify-center m-5`}
      >
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
            <span className=" p-2 mt-10">Order Total</span>${totalPrice}
            <hr></hr>
          </div>
          <div className="m-5">
            <button
              className="w-full h-full bg-yellow-500 rounded-md hover:bg-blue-800 hover:text-white"
              onClick={handlePlaceOrderClick}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeorderpage;
