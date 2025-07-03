import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import { toast } from "react-hot-toast";
import { Eye, Heart, RefreshCcw } from "lucide-react";
import Quickviews from "../pages/Quickviews";
import { Link } from "react-router-dom";
import { product } from "../data/allapi";

const NewTrending = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToFavorites } = useFavorites();
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(product.APPROVED_PRODUCTS_FOR_HOME);
        const { data } = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid product data format");
        }

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleWishlist = (product) => {
    if (wishlistIds.includes(product._id)) {
      setWishlistIds(wishlistIds.filter((id) => id !== product._id));
      // Assuming you have removeFromFavorites in context, else remove this call
      toast.success("Removed from Favorites");
    } else {
      setWishlistIds([...wishlistIds, product._id]);
      addToFavorites(product);
      toast.success("Added to Favorites");
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-xl">Loading products...</div>;
  }

  return (
    <div className="max-w-8xl mx-auto px-4 py-10 font-sans bg-white min-h-screen">
      {/* Heading */}
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-5xl font-serif text-[#000000]">New Trending</h2>
        <div className="flex gap-5 flex-wrap">
          {["BAMBOO", "BAR SOAP", "CANDLE", "CEREMICS", "JEWELERY"].map(
            (item, index) => (
              <button
                key={item}
                className="group relative flex items-center gap-1 text-black-600 text-sm font-medium hover:underline underline-offset-8 transition"
              >
                <span>{item}</span>
                <span
                  className="inline-block transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  ➤
                </span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Product Cards with NewArrivals style */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
        {products.slice(0, 4).map((product) => {
          const isWishlisted = wishlistIds.includes(product._id);

          return (
            <div
              key={product._id}
              className="relative bg-white overflow-hidden shadow-md"
            >
              <div className="relative overflow-hidden w-full h-44 sm:h-52 md:h-90 group">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 group-hover:scale-105"
                  />
                  {product.images?.[1]?.url && (
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

                <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col items-center space-y-2 z-10">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowQuickView(true);
                    }}
                    className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-red-500 text-gray-600 hover:text-white transition opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-100"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full shadow transition opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-200 ${
                      isWishlisted
                        ? "bg-red-500 text-white"
                        : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <Heart size={16} />
                  </button>

                  <button className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-red-500 text-gray-600 hover:text-white transition opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-300">
                    <RefreshCcw size={16} />
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 mb-2 pr-2 pl-2 w-full flex justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <button
                    onClick={() => {
                      addToCart(product);
                      toast.success("Added to Cart");
                    }}
                    className="w-[90%] h-10 sm:h-12 relative overflow-hidden px-2 py-2 text-white font-bold z-10 bg-[#d75a3c] group/button"
                  >
                    <span className="absolute inset-0 bg-white transition-all duration-500 ease-out transform -translate-x-full group-hover/button:translate-x-0 z-0"></span>
                    <span className="relative text-black z-10">Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="px-4 py-2 bg-white">
                <p className="text-xs uppercase text-gray-400 tracking-widest">
                  {product.subcategory || product.subCategory?.name || "Handmade"}
                </p>
                <h2 className="text-sm font-semibold text-gray-800 truncate">
                  {product.title || "Untitled Product"}
                </h2>
             
                <p className="text-sm font-medium text-gray-900">
                  ₹{product.price || "N/A"}
                </p>
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

export default NewTrending;
