import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import { Helmet } from "react-helmet";
import sampleProducts from "../data";
import ProductItems from "../components/ProductItems";

const Home = () => {
  // const cartItemArr = useRecoilValue(cartItems);

  return (
    <div className="bg-gray-200">
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
      <div className="m-4 grid grid-cols-4 gap-4">
        {sampleProducts!.map((product) => {
          return (
            <div className="bg-white m-4 rounded-xl pb-4 w-auto">
              <ProductItems key={product.slug} product={product}></ProductItems>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center p-10">All rights reserved</div>
    </div>
  );
};

export default Home;
