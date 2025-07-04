import React, { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { NavLink } from "react-router-dom";

const NewTrending = () => {
  const [expandedCategories, setExpandedCategories] = useState([]);

  const groupedByCategory = products.reduce((acc, product) => {
    const key = product.category || "Others";
    acc[key] = acc[key] || [];
    acc[key].push(product);
    return acc;
  }, {});

  return (
    <div className="max-w-8xl mx-5 px-4 py-10 font-sans bg-white min-h-screen">
       <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-4 px-2 py-6">
    {/* Heading */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-center md:text-left text-[#000000]">
      New Trending
    </h2>

    {/* Category Menu Buttons */}
    <div className="w-full md:w-auto">
      <div className="mt-2 md:mt-0 flex justify-center md:justify-end overflow-x-auto no-scrollbar">
        <div className="flex gap-3 w-max">
          {["BAMBOO", "BAR SOAP", "CANDLE", "CEREMICS", "JEWELERY"].map((item, index) => (
            <button
              key={index}
              className="px-4 py-2 whitespace-nowrap bg-white border border-gray-200 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition"
            >
             <NavLink
                to="/category">
              {item}
                </NavLink>
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>

      {Object.entries(groupedByCategory).map(([category, items]) => {
        const visibleItems = expandedCategories.includes(category)
          ? items
          : items.slice(0, 4);

        return (
          <div key={category} className="mb-12 mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {visibleItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewTrending;
