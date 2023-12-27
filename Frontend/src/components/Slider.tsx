import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const Slider = () => {
  const slides = [
    { url: "./src/images/tshirt1.jpg" },
    { url: "./src/images/tshirt2.jpg" },
    { url: "./src/images/shirt1.jpg" },
    { url: "./src/images/shirt2.jpg" },
    { url: "./src/images/jeans1.jpg" },
    { url: "./src/images/jeans2.jpg" },
    { url: "./src/images/jacket1.jpg" },
    { url: "./src/images/jacket2.jpg" },
    { url: "./src/images/trouser1.jpg" },
    { url: "./src/images/trouser2.jpg" },
    { url: "./src/images/shoe1.jpg" },
    { url: "./src/images/shoe2.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: React.SetStateAction<number>) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    // Auto change slide every 3 seconds
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      // Clear the interval on component unmount
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <div className="bg-gray-200 h-screen w-screen">
      <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group flex justify-center">
        <div
          style={{
            backgroundImage: `url(${slides[currentIndex].url})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full h-full rounded-2xl duration-500 "
        ></div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((_slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
