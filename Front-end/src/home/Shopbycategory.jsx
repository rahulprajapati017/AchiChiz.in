import React, { useState, useEffect } from "react";

const categories = [
  {
      name: "Bamboo",
      image: "https://img.freepik.com/free-photo/tropical-green-bamboo-forest_23-2149011457.jpg?semt=ais_items_boosted&w=740",
    },
    {
      name: "Bar Soap",
      image: "https://img.freepik.com/premium-photo/cultivated-traditional-bamboo-crafts-isolated-white-background_787273-8551.jpg?ga=GA1.1.648111341.1750933740&semt=ais_items_boosted&w=740",
    },
    {
      name: "Ceramics",
      image: "https://img.freepik.com/free-photo/tropical-green-bamboo-forest_23-2149011457.jpg?semt=ais_items_boosted&w=740",
    },
    {
      name: "Candle",
      image: "https://img.freepik.com/premium-photo/cultivated-traditional-bamboo-crafts-isolated-white-background_787273-8551.jpg?ga=GA1.1.648111341.1750933740&semt=ais_items_boosted&w=740",
    },
];

export default function CategorySlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % categories.length);
        setAnimating(false);
      }, 500); // Animation duration
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle category click
  const handleCategory = (idx) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 500);
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-[#f6f3ed]">
      <div className="flex ">
        {/* Image with slide animation */}
        <div className="relative w-[400px] h-[500px] overflow-hidden">
          <img
            src={categories[current].image}
            alt={categories[current].name}
            className={`absolute w-full h-full object-cover transition-transform duration-500 ${
              animating ? "translate-x-full animate-slide-in" : ""
            }`}
            style={{ backgroundColor: "#e25a2e", mixBlendMode: "multiply" }}
          />
          {/* Tailwind custom animation */}
          <style>
            {`
              @keyframes slide-in {
                0% { transform: translateX(100%); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
              }
              .animate-slide-in {
                animation: slide-in 0.5s forwards;
              }
            `}
          </style>
        </div>
        {/* Category List */}
        <div className="bg-white p-8 ml-[-60px] shadow-lg w-[450px] z-2">
          <h4 className="uppercase text-md tracking-widest mb-4 text-gray-700">Shop by category</h4>
          <ul>
            {categories.map((cat, idx) => (
              <li
                key={cat.name}
                onClick={() => handleCategory(idx)}
                className={`flex  items-center justify-between cursor-pointer py-2 border-b border-gray-200 transition-colors ${
                  idx === current
                    ? "text-[#e25a2e] font-semibold"
                    : "text-black hover:text-[#e25a2e]"
                }`}
              >
                {cat.name}
                {idx === current && (
                  <span className="ml-2 text-[#e25a2e]">&rarr;</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
