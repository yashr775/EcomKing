import { CiSearch } from "react-icons/ci";
import { PiShoppingCart } from "react-icons/pi";
import { IoMdArrowDropdownCircle } from "react-icons/io";

const Navbar = () => {
  return (
    <div>
      <div className="bg-black h-16 flex">
        <div className=" p-3 flex-grow flex items-center">
          <div className="text-white font-bold text-3xl">ECOM KING</div>
          <form className="pl-3  flex-grow flex">
            <input
              className="rounded-lg w-full h-10 pl-5"
              placeholder="Search ECOM KING"
            ></input>
            I
            <CiSearch className="bg-orange-300 h-10 w-10 cursor-pointer rounded-lg" />
          </form>
        </div>
        <ul className="text-white space-x-6 font-bold p-6 flex-grow flex justify-end ">
          <li className="cursor-pointer  ">Light</li>
          <li className="cursor-pointer flex">
            Hello,sign in
            <IoMdArrowDropdownCircle className="size-6" />
          </li>
          <li className="cursor-pointer">Orders</li>
          <li className="cursor-pointer flex">
            <PiShoppingCart className="size-7" /> Cart
          </li>
        </ul>
      </div>
      <div className="bg-slate-800 h-10 text-white">
        <ul className="font-bold flex space-x-6 p-3">
          <li className="cursor-pointer hover:border-2 hover:border-white">
            All
          </li>
          <li className="cursor-pointer hover:border-2 hover:border-white">
            Todays Deal
          </li>
          <li className=" cursor-pointer hover:border-2 hover:border-white">
            Gifts
          </li>
          <li className=" cursor-pointer hover:border-2 hover:border-white">
            On Sale
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
