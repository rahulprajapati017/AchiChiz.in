import React, { useState } from "react";
import { products } from "../data/products";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import { toast } from "react-hot-toast";
import { Eye, Heart, RefreshCcw } from "lucide-react";

const NewArrivals = () => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const { addToCart } = useCart();
  const { addToFavorites } = useFavorites();

  const groupedByCategory = products.reduce((acc, product) => {
    const key = product.category || "Others";
    acc[key] = acc[key] || [];
    acc[key].push(product);
    return acc;
  }, {});

  const toggleCategory = (cat) => {
    setExpandedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="max-w-8xl mx-auto mb-3 px-4 py-10 font-sans bg-white min-h-screen">
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-5xl font-bold text-[#0f2c5c]">New Trending</h2>
           <div className="flex gap-7 flex-wrap">
    <button className="text-black-600 hover:underline underline-offset-8 text-sm font-medium">BAMBOO</button>
    <button className="text-black-600 hover:underline underline-offset-8 text-sm font-medium">BAR SOAP</button>
    <button className="text-black-600 hover:underline underline-offset-8 text-sm font-medium">CANDLE</button>
    <button className="text-black-600 hover:underline underline-offset-8 text-sm font-medium">CEREMICS</button>
    <button className="text-black-600 hover:underline underline-offset-8 text-sm font-medium">JEWELERY</button>
  </div>
      </div>
    

      {Object.entries(groupedByCategory).map(([category, items]) => {
        const showAll = expandedCategories.includes(category);
        const visibleItems = showAll ? items : items.slice(0, 4);

        return (
          <div key={category} className="mb-12 mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {visibleItems.map((product) => (
                <div
                  key={product.id}
                  className="relative bg-white overflow-hidden shadow transition-all"
                >
                  {/* Image Hover Group */}
                  <div className="relative overflow-hidden w-full h-100 group">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 group-hover:scale-105"
                    />
                    {product.images[1] && (
                      <img
                        src={product.images[1]}
                        alt={product.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-105"
                      />
                    )}

                    <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      Hot
                    </div>

                    {/* Hover Buttons */}
                    <div className="absolute top-1/2 right-4 -translate-y-1/1 flex flex-col items-center space-y-2 z-10">
                      <Link
                        to={`/product/${product.id}`}
                        className="bg-white w-12 h-12 flex items-center justify-center rounded-full shadow hover:bg-red-500 text-gray-600 hover:text-white transition transform opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 duration-300 delay-200"
                      >
                        <Eye size={18} />
                      </Link>

                      <button
                        onClick={() => {
                          addToFavorites(product);
                          toast.success("Added to Favorites");
                        }}
                        className="bg-white w-12 h-12 flex items-center justify-center rounded-full shadow hover:bg-red-500 text-gray-600 hover:text-white transition transform opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 duration-300 delay-200"
                      >
                        <Heart size={16} />
                      </button>

                      <button className="bg-white w-12 h-12 flex items-center justify-center rounded-full shadow hover:bg-red-500 text-gray-600 hover:text-white transition transform opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 duration-300 delay-200">
                        <RefreshCcw size={16} />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="absolute bottom-0 left-0 mb-2 pr-2 pl-2 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button
                        onClick={() => {
                          addToCart(product);
                          toast.success("Added to Cart");
                        }}
                        className="w-full h-15 relative overflow-hidden px-6 py-2 text-white font-bold z-10 bg-[#d75a3c] group/button"
                      >
                        <span className="absolute inset-0 bg-[#c44b2e] transition-all duration-500 ease-out transform -translate-x-full group-hover/button:translate-x-0 z-0"></span>
                        <span className="relative z-10">Add to Cart</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Info (No Hover Effect) */}
                  <div className="px-4 py-2">
                    <p className="text-xs uppercase text-gray-400 tracking-widest">
                      {product.subcategory || "Handmade"}
                    </p>
                    <h2 className="text-md font-semibold text-gray-800 truncate">
                      {product.title}
                    </h2>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewArrivals;