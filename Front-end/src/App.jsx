import React, { useState, useEffect } from "react";

const categories = [
  {
    name: "Bamboo",
    image: "/images/bamboo.jpg",  // 👉 Replace with your image path
  },
  {
    name: "Bar Soap",
    image: "/images/bar-soap.jpg",
  },
  {
    name: "Ceramics",
    image: "/images/ceramics.jpg",
  },
  {
    name: "Candle",
    image: "/images/candle.jpg",
  },
];

const CategorySlider = () => {
  const [index, setIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIn(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % categories.length);
        setSlideIn(true);
      }, 500); // Time for slide-out
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-beige">
      {/* Image Slide-in */}
      <div
        className={`transition-all duration-500 ${
          slideIn ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } w-1/3`}
      >
        <img
          src={categories[index].image}
          alt={categories[index].name}
          className="w-full h-auto object-cover shadow-lg"
        />
      </div>

      {/* Category Text Box */}
      <div className="ml-8 p-6 bg-white shadow-lg">
        <p className="text-sm text-gray-500 mb-2">SHOP BY CATEGORY</p>
        {categories.map((cat, i) => (
          <div
            key={i}
            className={`py-2 border-b ${
              i === index ? "text-orange-600 font-semibold" : "text-gray-800"
            }`}
          >
            {cat.name} {i === index && "→"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
