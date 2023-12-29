import { Link } from "react-router-dom";
import { Product } from "../types/products";
import Rating from "./Rating";

type Props = {
  product: Product;
};

const ProductItems = (props: Props) => {
  const { image, name, numReviews, price, rating, slug } = props.product;
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
      <button className="bg-yellow-400 m-4 p-2 rounded-lg h-10 hover:bg-blue-700 hover:text-white w-30 border border-solid border-black">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItems;
