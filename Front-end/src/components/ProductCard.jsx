import React, { useState } from "react";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import { toast } from "react-hot-toast";
import Quickviews from "../pages/Quickviews";

const ProductCard = ({ product }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [wishlistIds, setWishlistIds] = useState([]);

  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites } = useFavorites();

  const toggleWishlist = () => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds(wishlistIds.filter((id) => id !== product.id));
      removeFromFavorites(product.id);
      toast.success("Removed from Favorites");
    } else {
      setWishlistIds([...wishlistIds, product.id]);
      addToFavorites(product);
      toast.success("Added to Favorites");
    }
  };

  const isWishlisted = wishlistIds.includes(product.id);

  return (
    <div className="relative bg-white ml-3 overflow-hidden transition-all group">
      {/* Image Section */}
      <div className="relative overflow-hidden w-full h-80 sm:h-70  md:h-100">
        <Link to={`/product/${product.id}`}>
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
        </Link>

        {/* Hot Badge */}
        <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-4xl shadow-md">
          Hot
        </div>

        {/* Action Buttons */}
        <div className="absolute top-1/2 right-4 -translate-y-1/1 flex flex-col items-center space-y-2 z-10">
          <button
            onClick={() => {
              addToCart(product);
              toast.success("Added to Cart");
            }}
            className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-red-500 text-gray-600 hover:text-white transition 
              transform opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-100"
          >
            <ShoppingCart size={20} />
          </button>

          <button
            onClick={() => setShowQuickView(true)}
            className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-red-500 text-gray-600 hover:text-white transition 
              transform opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-200"
          >
            <Eye size={20} />
          </button>

          <button
            onClick={toggleWishlist}
            className={`w-10 h-10 flex items-center justify-center rounded-full shadow transition 
              transform opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-300 
              ${
                isWishlisted
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
              }`}
          >
            <Heart size={20} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-2 px-4 py-2 bg-white">
        <p className="text-xs uppercase text-gray-400 tracking-widest">
          {product.subcategory || "Handmade"}
        </p>

        {/* Title as Link */}
        <Link to={`/product/${product.id}`}>
          <h2 className="inline-block text-sm py-3 font-semibold text-gray-800 truncate hover:text-red-500 cursor-pointer">
            {product.title}
          </h2>
        </Link>

        <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
      </div>

      {/* Quickview Modal */}
      {showQuickView && (
        <Quickviews
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;
