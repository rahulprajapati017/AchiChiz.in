import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import { toast } from "react-hot-toast";
import { Eye, Heart, ShoppingCart } from "lucide-react";

import Quickviews from "../pages/Quickviews";
import { Link } from "react-router-dom";
import { product } from "../data/allapi";

const NewArrivals = () => {
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [wishlistIds, setWishlistIds] = useState([]);

  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(product.APPROVED_PRODUCTS_FOR_HOME);
        const {data} = await res.json();

        const validData = Array.isArray(data)
          ? data  
          : Array.isArray(data.products)
          ? data.products
          : [];
          // console.log(data)

        setProductsData([...data]);
      } catch (error) {
        console.error("API error:", error);
        toast.error("Failed to load products");
        setProductsData([]);
      }
    };

    fetchProducts();
  }, []);

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
      setShowLoginModal(true);
      return;
    }

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
    <div className="max-w-8xl mx-5 px-4 py-10 font-sans  min-h-screen">
      <div className="flex items-center justify-center px-4 py-2">
        <h2 className="text-5xl font-serif text-[#000000]">New Arrivals</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
        {productsData.slice(0, 4).map((product) => {
          const isWishlisted = wishlistIds.includes(product._id);

          return (
            <div key={product._id} className="relative bg-white overflow-hidden">
              <div className="relative overflow-hidden w-full h-70 sm:h-52 md:h-110 group">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.images?.[0].url}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 group-hover:scale-105"
                  />
                  {product.images?.[1] && (
                    <img
                      src={product.images[1].url}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-105"
                    />
                  )}
                </Link>

                <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-4xl shadow-md">
                  {product.isHandmade ? "Handmade" : "Hot"}
                </div>

                <div className="absolute top-1/2 right-2 -translate-y-1/1 flex flex-col items-center space-y-3 z-10">
                  <button
                    onClick={() => {
                      addToCart(product);
                      toast.success("Added to Cart");
                    }}
                  className="bg-white  w-12 h-12 flex items-center justify-center rounded-full shadow hover:bg-red-500 text-gray-600 hover:text-white transition opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-100">
                 <ShoppingCart size={20} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowQuickView(true);
                    }}
                    className="bg-white  w-12 h-12 flex items-center justify-center rounded-full shadow hover:bg-red-500 text-gray-600 hover:text-white transition opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-200"
                  >
                    <Eye size={20} />
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={` w-12 h-12 flex items-center justify-center rounded-full shadow transition opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-300 ${
                      isWishlisted
                        ? "bg-red-500 text-white"
                        : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <Heart size={20} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="px-4 py-2 bg-white">
                <p className="text-xs uppercase text-gray-400 tracking-widest">
                  {product.subCategory?.name || "Gift Item"}
                </p>
                <Link to={`/product/${product._id}`}>
            <h2 className="inline-block text-sm py-3 font-semibold text-gray-800 truncate hover:text-red-500 cursor-pointer">
              {product.title}
            </h2>
          </Link>
                <p className="text-sm text-gray-500 truncate">
                  by {product.artisan?.name} ({product.artisan?.origin})
                </p>
                <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
              </div>
            </div>
          );
        })}
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
    </div>
  );
};

export default NewArrivals;
