<<<<<<< HEAD
import React, { useState, useEffect, useContext } from "react";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Quickviews from "../pages/Quickviews";
import AuthPage from "../components/Auth/AuthPage";
import { AuthContext } from "../context/AuthContext";
import { product as api, auth } from "../data/allapi";
=======
import React, { useState, useEffect } from "react";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import { toast } from "react-hot-toast";
import Quickviews from "../pages/Quickviews";
import AuthPage from "../components/Auth/AuthPage";
>>>>>>> ac35eccdc4eb61f5061a1026ed92865a1db889bd

const ProductCard = ({ product }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
<<<<<<< HEAD
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const { usertoken } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!usertoken) {
        setIsWishlisted(false);
        setIsInCart(false);
        return;
      }

      try {
        const response = await fetch(auth.GET_USER_PROFILE, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usertoken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        // Assuming these are arrays of product IDs
        const wishlistIds = data.addToWishlist || [];
        const cartIds = data.addToCart || [];

        setIsWishlisted(wishlistIds.includes(product._id));
        setIsInCart(cartIds.includes(product._id));
      } catch (error) {
        console.error(error);
        setIsWishlisted(false);
        setIsInCart(false);
      }
    };

    fetchUserData();
  }, [usertoken, product._id]);

  const handleAddToCart = async () => {
    if (!usertoken) {
=======
  const [wishlistIds, setWishlistIds] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { addToCart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  // ✅ Sync login status
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

  // ✅ Sync wishlist from global context
  useEffect(() => {
    const ids = favorites.map((fav) => fav.id);
    setWishlistIds(ids);
  }, [favorites]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    addToCart(product);
    toast.success("Added to Cart");
  };

  const toggleWishlist = () => {
    if (!isLoggedIn) {
>>>>>>> ac35eccdc4eb61f5061a1026ed92865a1db889bd
      setShowLoginModal(true);
      return;
    }

<<<<<<< HEAD
    setLoading(true);
    try {
      const response = await fetch(`${api.ADD_TO_CART}/${product._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`,
        },
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message || "Failed to add to cart");
      }

      toast.success("Item added to cart!");
      setIsInCart(true);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = async () => {
    if (!usertoken) {
      setShowLoginModal(true);
      return;
    }

    try {
      const response = await fetch(`${api.ADD_TO_WISHLIST}/${product._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message || "Failed to update wishlist");
      }

      toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
      setIsWishlisted((prev) => !prev);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
=======
    if (wishlistIds.includes(product.id)) {
      removeFromFavorites(product.id);
      toast.success("Removed from Favorites");
    } else {
      addToFavorites(product);
      toast.success("Added to Favorites");
    }
  };

  const isWishlisted = wishlistIds.includes(product.id);
>>>>>>> ac35eccdc4eb61f5061a1026ed92865a1db889bd

  return (
    <>
      <div className="relative bg-white ml-3 overflow-hidden transition-all group">
        {/* Product Images */}
        <div className="relative overflow-hidden w-full h-70 sm:h-70 md:h-120">
<<<<<<< HEAD
          <Link to={`/product/${product._id}`}>
            <img
              src={product.images?.[0]?.url}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 group-hover:scale-105"
            />
            {product.images?.[1] && (
              <img
                src={product.images?.[1]?.url}
=======
          <Link to={`/product/${product.id}`}>
            <img
              src={product.images[0]}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 group-hover:scale-105"
            />
            {product.images[1] && (
              <img
                src={product.images[1]}
>>>>>>> ac35eccdc4eb61f5061a1026ed92865a1db889bd
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-105"
              />
            )}
          </Link>

          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-4xl shadow-md">
            Hot
          </div>

          {/* Action Buttons */}
          <div className="absolute top-1/2 right-2 -translate-y-1/2 pr-2 flex flex-col items-center space-y-2 z-10">
            <button
              onClick={handleAddToCart}
<<<<<<< HEAD
              disabled={loading}
              className={`w-10 h-10 flex items-center justify-center rounded-full shadow transition
                transform opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-100
                ${isInCart ? "bg-pink-500 text-white" : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"}`}
=======
              className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-red-500 text-gray-600 hover:text-white transition 
                transform opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-100"
>>>>>>> ac35eccdc4eb61f5061a1026ed92865a1db889bd
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
<<<<<<< HEAD
              onClick={handleWishlistToggle}
              className={`w-10 h-10 flex items-center justify-center rounded-full shadow transition 
                transform opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-300 
                ${isWishlisted ? "bg-pink-500 text-white" : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"}`}
=======
              onClick={toggleWishlist}
              className={`w-10 h-10 flex items-center justify-center rounded-full shadow transition 
                transform opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-300 
                ${isWishlisted ? "bg-red-500 text-white" : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"}`}
>>>>>>> ac35eccdc4eb61f5061a1026ed92865a1db889bd
            >
              <Heart size={20} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-2 px-4 py-2 bg-white">
          <p className="text-xs uppercase text-gray-400 tracking-widest">
            {product.subcategory || "Handmade"}
          </p>
<<<<<<< HEAD
          <Link to={`/product/${product._id}`}>
=======
          <Link to={`/product/${product.id}`}>
>>>>>>> ac35eccdc4eb61f5061a1026ed92865a1db889bd
            <h2 className="inline-block text-sm py-3 font-semibold text-gray-800 truncate hover:text-red-500 cursor-pointer">
              {product.title}
            </h2>
          </Link>
          <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <Quickviews
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}

<<<<<<< HEAD
      {/* Login Modal */}
=======
      {/* Auth/Login Modal */}
>>>>>>> ac35eccdc4eb61f5061a1026ed92865a1db889bd
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
<<<<<<< HEAD
                toast.success("Logged in successfully");
=======
                setIsLoggedIn(true);
                window.dispatchEvent(new Event("storage")); // Let other components know
>>>>>>> ac35eccdc4eb61f5061a1026ed92865a1db889bd
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
