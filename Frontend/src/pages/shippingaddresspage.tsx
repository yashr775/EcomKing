import CheckoutSteps from "../components/CheckoutSteps";
import Navbar from "../components/Navbar";
import { useRecoilState } from "recoil";
import { progress, shippingAddress } from "../atoms";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { shippingaddress } from "../types/shippingAddress";

const Shippingaddresspage = () => {
  const [, setProgresss] = useRecoilState(progress);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [shippingAddressValue, setShippingAddressValue] =
    useRecoilState(shippingAddress);
  const navigate = useNavigate();

  useEffect(() => {
    setProgresss("50%");
  }, []);

  const [formData, setFormData] = useState<shippingaddress>({
    fullname: "",
    address: "",
    city: "",
    postalcode: "",
    country: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleContinueClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { fullname, address, city, postalcode, country } = formData;

    const shippingObject = {
      fullname,
      address,
      city,
      postalcode,
      country,
    };

    setShippingAddressValue(shippingObject);

    localStorage.setItem("shippingAddress", JSON.stringify(shippingObject));
    navigate("/paymentpage");
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <Navbar />
      <CheckoutSteps />
      <div className="flex justify-center text-5xl font-semibold">
        Shipping Address
      </div>
      <form className="mt-10  p-4 mb-10" onSubmit={handleContinueClick}>
        <label className="text-xl flex justify-center ">Full Name</label>
        <input
          className=" w-1/4 h-10 rounded-lg border mx-auto border-black flex justify-center"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
        ></input>
        <label className="text-xl flex justify-center mt-10">Address</label>
        <input
          className=" w-1/4 h-10 rounded-lg border mx-auto border-black flex justify-center"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        ></input>
        <label className="text-xl flex justify-center mt-10">City</label>
        <input
          className=" w-1/4 h-10 rounded-lg border border-black mx-auto flex justify-center"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        ></input>
        <label className="text-xl flex justify-center mt-10">Postal Code</label>
        <input
          className=" w-1/4 h-10 rounded-lg border border-black mx-auto flex justify-center"
          name="postalcode"
          value={formData.postalcode}
          onChange={handleChange}
          required
        ></input>
        <label className="text-xl flex justify-center mt-10">Country</label>
        <input
          className=" w-1/4 h-10 rounded-lg border border-black mx-auto flex justify-center"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        ></input>
        <button className="bg-yellow-500 flex justify-center mx-auto mt-10 w-1/4 h-10 rounded-lg py-2 text-lg hover:bg-blue-600 hover:text-white">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Shippingaddresspage;
