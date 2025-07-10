import React, { useState, useContext, useEffect } from "react";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoriteContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthPage from "../Auth/AuthPage";
import Quickviews from "../../pages/Quickviews";
import { product as pro } from "../../data/allapi";

const AllProducts = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [cartIds, setCartIds] = useState([]);

  const { userdata, usertoken } = useContext(AuthContext);
  const isLoggedIn = !!usertoken;

  const cartContext = useCart();
  const favoritesContext = useFavorites();
  const { addToCart } = cartContext || {};
  const { addToFavorites, removeFromFavorites } = favoritesContext || {};

  useEffect(() => {
    if (userdata) {
      setWishlistIds(userdata.addtowishlist?.map((p) => p._id) || []);
      setCartIds(userdata.addtocart?.map((p) => p._id) || []);
    } else {
      setWishlistIds([]);
      setCartIds([]);
    }
  }, [userdata]);

  const toggleWishlist = async (product) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    const id = product._id;
    const isInWishlist = wishlistIds.includes(id);

    try {
      if (isInWishlist) {
        await fetch(`${pro.REMOVE_FROM_WISHLIST}/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        });
        setWishlistIds((prev) => prev.filter((wid) => wid !== id));
        removeFromFavorites?.(id);
        toast.success("Removed from Wishlist");
      } else {
        await fetch(`${pro.ADD_TO_WISHLIST}/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usertoken}`,
          },
          body: JSON.stringify({ productId: id }),
        });
        setWishlistIds((prev) => [...prev, id]);
        addToFavorites?.(product);
        toast.success("Added to Wishlist");
      }
    } catch (error) {
      toast.error("Wishlist action failed");
    }
  };

  const toggleCart = async (product) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    const id = product._id;
    const isInCart = cartIds.includes(id);

    try {
      if (isInCart) {
        await fetch(`${pro.REMOVE_FROM_CART}/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        });
        setCartIds((prev) => prev.filter((cid) => cid !== id));
        toast.success("Removed from Cart");
      } else {
        await fetch(`${pro.ADD_TO_CART}/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usertoken}`,
          },
          body: JSON.stringify({ productId: id }),
        });
        setCartIds((prev) => [...prev, id]);
        addToCart?.(product);
        toast.success("Added to Cart");
      }
    } catch (error) {
      toast.error("Cart action failed");
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const res = await fetch(`${pro.GET_SINGLE_PRODUCT}/${productId}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setSelectedProduct(data); // contains: { data, suggestedProducts }
        setShowQuickView(true);
      } else {
        toast.error("Failed to load product details");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-8xl mx-5 px-4 py-5 font-sans bg-white min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => {
          const isWishlisted = wishlistIds.includes(product._id);
          const isInCart = cartIds.includes(product._id);

          return (
            <div
              key={product._id}
              className="relative bg-white overflow-hidden border border-gray-200 group transition-all duration-300"
            >
              <div className="relative w-full h-72 sm:h-80 md:h-96 overflow-hidden">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image?.url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-2xl shadow-sm">
                  New
                </div>

                {/* Action Icons */}
                <div
                  className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col items-center space-y-2 z-10"
                >
                  {["cart", "view", "wishlist"].map((type, idx) => {
                    let Icon, onClick, isActive;
                    if (type === "cart") {
                      Icon = ShoppingCart;
                      onClick = () => toggleCart(product);
                      isActive = cartIds.includes(product._id);
                    } else if (type === "view") {
                      Icon = Eye;
                      onClick = () => fetchProductDetails(product._id);
                      isActive = false;
                    } else {
                      Icon = Heart;
                      onClick = () => toggleWishlist(product);
                      isActive = wishlistIds.includes(product._id);
                    }

                    return (
                      <button
                        key={type}
                        onClick={onClick}
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300
                          transform translate-x-full opacity-0
                          group-hover:translate-x-0 group-hover:opacity-100
                          ${
                            isActive
                              ? "bg-red-500 text-white"
                              : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
                          }`}
                        style={{ transitionDelay: `${idx * 75}ms` }} // stagger effect
                      >
                        <Icon size={18} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="px-4 py-4">
                <p className="text-xs uppercase text-gray-400 tracking-widest">
                  {product.category || "Handmade"}
                </p>
                <Link to={`/product/${product._id}`}>
                  <h2 className="text-base font-semibold text-gray-800 truncate hover:text-red-500 mt-1">
                    {product.title}
                  </h2>
                </Link>
                <p className="text-sm font-medium text-gray-900 mt-1">₹{product.price}</p>
              </div>
            </div>
          );
        })}
      </div>

      {showQuickView && selectedProduct && (
        <Quickviews
          product={selectedProduct}
          onClose={() => {
            setShowQuickView(false);
            setSelectedProduct(null);
          }}
        />
      )}

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
                window.dispatchEvent(new Event("storage"));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
