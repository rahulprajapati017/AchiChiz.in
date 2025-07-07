import React, { useState, useEffect } from 'react';
import { Eye, Heart, RefreshCcw, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoriteContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthPage from "../Auth/AuthPage";
import Quickviews from "../../pages/Quickviews";

const AllProducts = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Safely get context hooks with fallbacks
  const cartContext = useCart();
  const favoritesContext = useFavorites();
  const { addToCart } = cartContext || {};
  const { addToFavorites, removeFromFavorites } = favoritesContext || {};

  // Check login status
  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const toggleWishlist = (product) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (wishlistIds.includes(product.id)) {
      setWishlistIds(wishlistIds.filter((id) => id !== product.id));
      removeFromFavorites && removeFromFavorites(product.id);
      toast.success("Removed from Favorites");
    } else {
      setWishlistIds([...wishlistIds, product.id]);
      addToFavorites && addToFavorites(product);
      toast.success("Added to Favorites");
    }
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    addToCart && addToCart(product);
    toast.success("Added to Cart");
  };

  return (
    <>
      <div className="max-w-8xl mx-5 px-4 py-10 font-sans bg-white min-h-screen">
          
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="relative bg-white overflow-hidden transition-all shadow-md group"
              >
                <div className="relative overflow-hidden w-full h-44 sm:h-52 md:h-90 group">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image || (product.images && product.images[0])}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 group-hover:scale-105"
                    />
                    {product.images && product.images[1] && (
                      <img
                        src={product.images[1]}
                        alt={product.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-105"
                      />
                    )}
                  </Link>
                  <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-4xl shadow-md">
                    New
                  </div>
                  {/* Action Buttons */}
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col items-center space-y-2 z-10">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-red-500 text-gray-600 hover:text-white transition 
                      transform opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-100"
                    >
                      <ShoppingCart size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowQuickView(true);
                      }}
                      className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-red-500 text-gray-600 hover:text-white transition 
                      transform opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-200"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full shadow transition 
                        transform opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-300 
                        ${
                          isWishlisted
                            ? "bg-red-500 text-white"
                            : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
                        }`}
                    >
                      <Heart size={16} />
                    </button>
                    <button
                      className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-red-500 text-gray-600 hover:text-white transition 
                      transform opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-400"
                    >
                      <RefreshCcw size={16} />
                    </button>
                  </div>
                </div>
                {/* Product Info */}
                <div className="px-4 py-2 bg-white">
                  <p className="text-xs uppercase text-gray-400 tracking-widest">
                    {product.subcategory || "Handmade"}
                  </p>
                  <h2 className="text-sm font-semibold text-gray-800 truncate">
                    {product.title}
                  </h2>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && selectedProduct && (
        <Quickviews
          product={selectedProduct}
          onClose={() => {
            setShowQuickView(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* Auth/Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-4 text-gray-600 text-xl font-bold"
            >
              ×
            </button>
            <AuthPage
              onSuccess={() => {
                setShowLoginModal(false);
                setIsLoggedIn(true);
                window.dispatchEvent(new Event("storage")); // Let other components know
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;