import { Product } from "../types/products";

type Props = {
  product: Product;
};

const ProductItems = (props: Props) => {
  const { image, name, numReviews, price } = props.product;
  return (
    <div>
      <div className="max-w-content max-h-content">
        <img src={image} alt={name} />
      </div>
      <div className="p-4 text-2xl text-blue-600 underline">{name}</div>
      <div className="pl-4">{numReviews} Reviews</div>
      <div className="pl-4">${price}</div>
      <button className="bg-yellow-400 m-4 p-2 rounded-lg h-10 hover:bg-blue-700 hover:text-white w-30 border border-solid border-black">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItems;
