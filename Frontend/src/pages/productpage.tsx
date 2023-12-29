import { useEffect, useState } from "react";
import Product from "../types/products";
import sampleProducts from "../data";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet";

const Productpage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const getData = async () => {
    const foundProduct = sampleProducts.find((p: Product) => p.slug === slug);
    setProduct(foundProduct || null);
  };

  useEffect(() => {
    console.log("Slug:", slug);

    getData();
    console.log("Product:", product);
  }, [slug]);

  return (
    <div>
      <Helmet>
        <title>{product ? product.name : "Product Not Found"}</title>
      </Helmet>
      <div className="mb-10">
        <Navbar />
      </div>
      <div>
        {product === null ? (
          <div className="flex justify-center font-bold text-4xl">
            Product does not exist Sorry for the inconvinience
          </div>
        ) : (
          <div className="flex justify-center space-x-7 w-full">
            <div className="h-1/3 w-1/3">
              <img src={product.image}></img>
            </div>
            <div>
              <div className="font-bold text-5xl  ">{product.name}</div>
              <hr className="w-full pt-5"></hr>
              <Rating
                reviews={product.numReviews}
                rating={product.rating}
              ></Rating>
              <hr className="w-full pt-5"></hr>
              <div>Price : ${product.price}</div>
              <hr className="w-full pt-5"></hr>
              <div>Description : {product.description}</div>
              <div></div>
            </div>
            <div className="border border-dotted border-black p-6 h-1/4">
              <div className="border border-dotted border-black ">
                <div className="p-4">Price : $150 </div>
                <hr className="w-full" />
                <div className="flex p-4">
                  <span className="pr-6">Status :</span>
                  {product.countInStock !== 0 ? (
                    <div className="bg-green-600 text-white  rounded-lg">
                      Instock
                    </div>
                  ) : (
                    <div className="bg-red-600 text-white  rounded-lg">
                      Unavailable
                    </div>
                  )}
                </div>
                <hr />
                <div className="p-2">
                  <button className="w-full bg-yellow-500 rounded-lg p-2 hover:bg-blue-800 hover:text-white">
                    Add to cart
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productpage;
