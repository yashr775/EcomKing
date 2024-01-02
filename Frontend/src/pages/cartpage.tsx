import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import { useRecoilState } from "recoil";
import { cartItems } from "../atoms";
import { useEffect, useState } from "react";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartItem } from "../types/cart";

const Cartpage = () => {
  const [cartItemsArr, setCartItemArr] = useRecoilState(cartItems);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
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
      if (cartItem.slug === item.slug) {
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

  return (
    <div>
      <Helmet>
        <title>Cart Page</title>
      </Helmet>
      <Navbar />
      <div className="text-5xl font-bold flex justify-center mt-10">
        Shopping Cart
      </div>
      <div className="grid justify-items-center grid-cols-2 space-x-2 mt-10">
        <div className="main border border-solid w-3/4 h-fit m-4">
          {cartItemsArr === null || cartItemsArr.length === 0 ? (
            <div>No Items Available </div>
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
                    className="pt-2 size-6"
                    onClick={() => handleMinusClick(item)}
                  />
                  {item.quantity}
                  <FaPlusCircle
                    className="pt-2 size-6"
                    onClick={() => handleAddClick(item)}
                  />
                </div>
                <div className="pl-10 pt-6">
                  <FaTrashAlt />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border border-solid w-fit h-fit">
          <div className="text-3xl  font-semibold p-4">
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
