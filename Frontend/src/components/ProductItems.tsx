import { Link } from "react-router-dom";
import { Product } from "../types/products";
import Rating from "./Rating";
import { useRecoilState } from "recoil";
import { cartItems } from "../atoms";
import { CartItem } from "../types/cart";
import { useEffect } from "react";

type Props = {
  product: Product;
};

const ProductItems = (props: Props) => {
  const { image, name, numReviews, price, rating, slug, countInStock } =
    props.product;
  const [cartItemArr, setCartItemArr] = useRecoilState(cartItems);

  const addToCart = () => {
    const existItem = cartItemArr.find((x) => x.slug === slug);
    const updatedCart = [...cartItemArr];

    if (existItem) {
      // If the item already exists in the cart, update its quantity
      const updatedItem = { ...existItem, quantity: existItem.quantity + 1 };
      const itemIndex = updatedCart.findIndex((x) => x.slug === slug);
      updatedCart[itemIndex] = updatedItem;

      if (updatedItem.quantity > countInStock) {
        alert("Product out of stock");
        return;
      }
    } else {
      // If the item is not in the cart, add it with quantity 1
      const newItem: CartItem = {
        image,
        slug,
        quantity: 1,
        countInStock,
        price,
        name,
      };
      updatedCart.push(newItem);
    }
    setCartItemArr(updatedCart);
    console.log(updatedCart);
    alert("Item updated successfull");
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    setCartItemArr(JSON.parse(localStorage.getItem("cartItems") ?? ""));
  }, []);
  return (
    <div>
      <div className="max-w-content max-h-content">
        <img src={image} alt={name} />
      </div>
      <div className="p-4 text-2xl text-blue-600 underline cursor-pointer">
        <Link to={`/product/${slug}`}>{name}</Link>
      </div>
      <div className="pl-4 ">
        <Rating reviews={numReviews} rating={rating} />
      </div>
      <div className="pl-4">${price}</div>
      <button
        className="bg-yellow-400 m-4 p-2 rounded-lg h-10 hover:bg-blue-700 hover:text-white w-30 border border-solid border-black"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItems;
