import React, { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const NewArrivals = () => {
  const [expandedCategories, setExpandedCategories] = useState([]);

  const groupedByCategory = products.reduce((acc, product) => {
    const key = product.category || "Others";
    acc[key] = acc[key] || [];
    acc[key].push(product);
    return acc;
  }, {});

  return (
    <div className="max-w-8xl mx-5 px-4 py-10 font-sans  min-h-screen">
      <div className="flex items-center justify-center px-4 py-2">
        <h2 className="text-5xl font-serif text-[#000000]">New Arrivals</h2>
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

export default NewArrivals;
