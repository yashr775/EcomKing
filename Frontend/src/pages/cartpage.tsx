import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItems, theme } from "../atoms";
import { useEffect, useState } from "react";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartItem } from "../types/cart";

const Cartpage = () => {
  const [cartItemsArr, setCartItemArr] = useRecoilState(cartItems);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const themeVal = useRecoilValue(theme);

  const navigate = useNavigate();

  useEffect(() => {
    let sum = 0;
    let temp = 0;
    if (cartItemsArr && cartItemsArr.length) {
      for (let i = 0; i < cartItemsArr.length; i++) {
        sum += cartItemsArr[i].price * cartItemsArr[i].quantity;
        temp += cartItemsArr[i].quantity;
      }
    }
    setTotalPrice(sum);
    setTotalQuantity(temp);
  }, [cartItemsArr]);

  const getCartData = () => {
    const cartArr = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItemArr(cartArr);
  };

  const updateCartData = (updatedCartItems: CartItem[]) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItemArr(updatedCartItems);
  };

  useEffect(() => {
    getCartData();
  }, []);

  const handleProceedToCheckout = () => {
    navigate("/shippingaddress");
  };

  const handleAddClick = (item: CartItem) => {
    const updatedCartItems = cartItemsArr.map((cartItem) => {
      if (
        cartItem.slug === item.slug &&
        cartItem.quantity < item.countInStock
      ) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });

    updateCartData(updatedCartItems);
  };

  const handleMinusClick = (item: CartItem) => {
    const updatedCartItems = cartItemsArr.map((cartItem) => {
      if (cartItem.slug === item.slug && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });

    updateCartData(updatedCartItems);
  };

  const handleDeleteClick = (item: CartItem) => {
    const updatedCartItems = cartItemsArr.filter(
      (cartItem) => cartItem.slug !== item.slug
    );

    updateCartData(updatedCartItems);
  };

  return (
    <div
      className={`${
        themeVal === "Dark" ? "bg-black" : "bg-gray-200"
      } w-screen h-screen`}
    >
      <Helmet>
        <title>Cart Page</title>
      </Helmet>
      <Navbar />
      <div
        className={`${
          themeVal === "Dark" ? "bg-black text-white" : "bg-gray-200 text-black"
        } text-5xl font-bold flex justify-center mt-10`}
      >
        Shopping Cart
      </div>
      <div
        className={`${
          themeVal === "Dark" ? "bg-black" : "bg-gray-200"
        } grid justify-items-center grid-cols-2 space-x-2 mt-10`}
      >
        <div className="main border border-solid w-3/4 h-fit m-4">
          {cartItemsArr === null || cartItemsArr.length === 0 ? (
            <div
              className={`${
                themeVal === "Dark"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              No Items Available{" "}
            </div>
          ) : (
            cartItemsArr.map((item) => (
              <div
                key={item.slug}
                className="flex justify-center border m-2 p-2 border-solid mt-20"
              >
                <div className="w-20">
                  <img src={item.image} alt={item.name}></img>
                </div>
                <div className="pl-10 pt-5 text-xl items-center cursor-pointer text-blue-500">
                  <Link to={`/product/${item.slug}`}>{item.name} </Link>
                </div>
                <div className="px-20 pt-5 text-lg flex">
                  <FaMinusCircle
                    className="bg-white pt-2 size-6 cursor-pointer"
                    onClick={() => handleMinusClick(item)}
                  />
                  <span
                    className={`${
                      themeVal === "Dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {item.quantity}
                  </span>

                  <FaPlusCircle
                    className="bg-white pt-2 size-6 cursor-pointer"
                    onClick={() => handleAddClick(item)}
                  />
                </div>
                <div className=" pl-10 pt-6">
                  <FaTrashAlt
                    onClick={() => handleDeleteClick(item)}
                    className="bg-white cursor-pointer"
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div
          className={`${
            themeVal === "Dark" ? "bg-black" : "bg-gray-200"
          } border border-solid w-fit h-fit`}
        >
          <div
            className={`${
              themeVal === "Dark"
                ? "bg-black text-white"
                : "bg-gray-200 text-black "
            } text-3xl  font-semibold p-4`}
          >
            Subtotal ({totalQuantity} items) : ${totalPrice}
          </div>
          <hr className=""></hr>
          <div className="p-2 w-full h-14">
            <button
              className="bg-yellow-500 rounded-lg w-full h-full hover:bg-blue-800 hover:text-white"
              onClick={handleProceedToCheckout}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartpage;
