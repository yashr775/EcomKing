import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import { Helmet } from "react-helmet";
// import sampleProducts from "../data";
import ProductItems from "../components/ProductItems";
import { useGetProduct } from "../hooks/productHooks";
import { theme } from "../atoms";
import { useRecoilValue } from "recoil";

const Home = () => {
  // const cartItemArr = useRecoilValue(cartItems);
  const themeVal = useRecoilValue(theme);

  //
  const sampleProducts = useGetProduct();

  return (
    <div className={` ${themeVal === "Dark" ? "bg-black" : "bg-gray-200"}`}>
      <Helmet>
        <title>ECOM KING</title>
      </Helmet>
      <Navbar />
      <Slider />
      {/* {cartItemArr.map((item) => (
        <div key={item.slug} className="font-bold flex justify-center">
          {item.name}
        </div>
      ))} */}
      <div
        className={`${
          themeVal === "Dark" ? "bg-black" : "bg-gray-200"
        } m-4 grid grid-cols-4 gap-4`}
      >
        {sampleProducts!.map((product) => {
          return (
            <div className="m-4 rounded-xl pb-4 w-auto">
              <ProductItems key={product.slug} product={product}></ProductItems>
            </div>
          );
        })}
      </div>
      <div
        className={`${
          themeVal === "Dark" ? "bg-black text-white" : "bg-gray-200"
        } flex justify-center p-10`}
      >
        All rights reserved
      </div>
    </div>
  );
};

export default Home;
