import React, { useState } from "react";
import { products } from "../data/products";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import { toast } from "react-hot-toast";
import {
  ShoppingCart,
  Eye,
  Heart,
  RefreshCcw,
} from "lucide-react";

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
        <h2 className="text-5xl font-bold text-[#0f2c5c]">New Arrivals</h2>
        <button className="text-blue-600 hover:underline text-sm font-medium">
          Shop Now →
        </button>
      </div>

      {Object.entries(groupedByCategory).map(([category, items]) => {
        const showAll = expandedCategories.includes(category);
        const visibleItems = showAll ? items : items.slice(0, 4);

        return (
          <div key={category} className="mb-12 mt-10">  

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleItems.map((product) => (
                <div
                  key={product.id}
                  className="relative group bg-white overflow-hidden rounded-xl shadow hover:shadow-xl transition-all"
                >
                  {/* Product Images with Hover Transition */}
                  <div className="relative overflow-hidden w-full h-72">
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

                    {/* Animated Hover Buttons */}
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col items-center space-y-2 z-10">
                      {/* Button 1 - Add to Cart */}
                      <button
                        onClick={() => {
                          addToCart(product);
                          toast.success("Added to Cart");
                        }}
                        className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition transform opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 duration-300 delay-100"
                      >
                        <ShoppingCart size={16} className="text-gray-600" />
                      </button>

                      {/* Button 2 - View */}
                      <Link
                        to={`/product/${product.id}`}
                        className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition transform opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 duration-300 delay-200"
                      >
                        <Eye size={16} className="text-gray-600" />
                      </Link>

                      {/* Button 3 - Favorite */}
                      <button
                        onClick={() => {
                          addToFavorites(product);
                          toast.success("Added to Favorites");
                        }}
                        className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition transform opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 duration-300 delay-300"
                      >
                        <Heart size={16} className="text-gray-600" />
                      </button>

                      {/* Button 4 - Refresh/Compare */}
                      <button
                        className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition transform opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 duration-300 delay-400"
                      >
                        <RefreshCcw size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Product Text Info */}
                  <div className="px-4 py-5">
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
