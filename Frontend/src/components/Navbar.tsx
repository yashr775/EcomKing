import { CiSearch } from "react-icons/ci";
import { PiShoppingCart } from "react-icons/pi";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { theme } from "../atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [themeMode, setThemeMode] = useRecoilState(theme);
  const [IsLogin, SetIsLogin] = useState<string | null>(null);

  const navigate = useNavigate();

  const goToHome = () => {
    window.location.href = "/";
  };

  const goToCart = () => {
    window.location.href = "/cart";
  };

  const goToSignin = () => {
    window.location.href = "/signin";
  };

  const goToSignup = () => {
    window.location.href = "/signup";
  };

  const handleThemeClick = () => {
    if (themeMode === "Light") {
      setThemeMode("Dark");
    } else {
      setThemeMode("Light");
    }
  };

  const handleSignoutClick = () => {
    localStorage.removeItem("auth-token");
    navigate("/");
  };

  useEffect(() => {
    const authToken = localStorage.getItem("auth-token");
    SetIsLogin(authToken);
  }, [IsLogin]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className={`${themeMode === "Dark" ? "bg-black" : "text-white"}`}>
      <div className="bg-black h-16 flex">
        <div className=" p-3 flex-grow flex items-center">
          <div
            className="text-white font-bold text-3xl cursor-pointer"
            onClick={goToHome}
          >
            ECOM KING
          </div>
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
          <li className="cursor-pointer  " onClick={handleThemeClick}>
            {themeMode}
          </li>
          <li className="cursor-pointer flex" onClick={toggleDropdown}>
            Hello,sign in
            <IoMdArrowDropdownCircle
              className="size-6"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <ul className="absolute bg-black text-white mt-10  p-4">
                {!IsLogin ? (
                  <>
                    <li onClick={goToSignin}>Sign In</li>
                    <li onClick={goToSignup}>Sign Up</li>
                  </>
                ) : (
                  <li onClick={handleSignoutClick}>Sign Out</li>
                )}
              </ul>
            )}
          </li>
          <li className="cursor-pointer">Orders</li>
          <li className="cursor-pointer flex " onClick={goToCart}>
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
