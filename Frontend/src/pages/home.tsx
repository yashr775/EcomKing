import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import { Helmet } from "react-helmet";
import { sampleProducts } from "../data";
import ProductItems from "../components/ProductItems";

const home = () => {
  return (
    <div className="bg-gray-200">
      <Helmet>
        <title>ECOM KING</title>
      </Helmet>
      <Navbar />
      <Slider />
      <div className="m-4 grid grid-cols-4 max-w-content max-h-content gap-4">
        {sampleProducts!.map((product) => {
          return (
            <div className="bg-white m-4 rounded-lg pb-4 w-auto">
              <ProductItems key={product.slug} product={product}></ProductItems>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default home;
