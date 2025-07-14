import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import Quickviews from "../pages/Quickviews";
import { Link } from "react-router-dom";
import { product as productAPI } from "../data/allapi";

const NewArrivals = () => {
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);

  const { usertoken, userdata, setuserdata } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(productAPI.APPROVED_PRODUCTS_FOR_HOME);
        const { data } = await res.json();
        console.log(data)
        const validData = Array.isArray(data) ? data : data?.products || [];
        setProductsData(validData.slice(0, 4));
      } catch (error) {
        console.error("API error:", error);
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  const isInWishlist = (id) =>
    userdata?.addtowishlist?.some((item) => item._id === id);
  const isInCart = (id) =>
    userdata?.addtocart?.some((item) => item._id === id);

  const toggleWishlist = async (product) => {
    if (!usertoken) return toast.error("Please login to manage wishlist");

    const currentlyInWishlist = isInWishlist(product._id);

    try {
      const url = currentlyInWishlist
        ? `${productAPI.REMOVE_FROM_WISHLIST}/${product._id}`
        : `${productAPI.ADD_TO_WISHLIST}/${product._id}`;

      const method = currentlyInWishlist ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`,
        },
      });

      if (!res.ok) throw new Error("Wishlist update failed");

      toast.success(
        currentlyInWishlist ? "Removed from wishlist" : "Added to wishlist"
      );

      const updatedWishlist = currentlyInWishlist
        ? userdata.addtowishlist.filter((item) => item._id !== product._id)
        : [...userdata.addtowishlist, product];

      setuserdata((prev) => ({ ...prev, addtowishlist: updatedWishlist }));
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const toggleCart = async (product) => {
    if (!usertoken) return toast.error("Please login to manage cart");

    const currentlyInCart = isInCart(product._id);

    try {
      const url = currentlyInCart
        ? `${productAPI.REMOVE_FROM_CART}/${product._id}`
        : `${productAPI.ADD_TO_CART}/${product._id}`;

      const method = currentlyInCart ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`,
        },
      });

      if (!res.ok) throw new Error("Cart update failed");

      toast.success(currentlyInCart ? "Removed from cart" : "Added to cart");

      const updatedCart = currentlyInCart
        ? userdata.addtocart.filter((item) => item._id !== product._id)
        : [...userdata.addtocart, product];

      setuserdata((prev) => ({ ...prev, addtocart: updatedCart }));
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-8xl ml-1 pl-4 py-10 font-sans min-h-70">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-center md:text-left text-[#000000]">
        New Arrivals
      </h2>

      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
        {productsData.map((product) => (
          <div key={product._id} className="relative bg-white overflow-hidden">
            <div className="relative w-full h-110 group">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.images?.[0]?.url}
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
                  onClick={() => toggleCart(product)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full shadow transition hover:bg-red-500 hover:text-white opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-100 ${
                    isInCart(product._id)
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <ShoppingCart size={20} />
                </button>

                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowQuickView(true);
                  }}
                  className="bg-white w-12 h-12 flex items-center justify-center rounded-full shadow hover:bg-red-500 text-gray-600 hover:text-white transition opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-200"
                >
                  <Eye size={20} />
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full shadow transition hover:bg-red-500 hover:text-white opacity-100 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 duration-300 delay-300 ${
                    isInWishlist(product._id)
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <Heart size={20} />
                </button>
              </div>
            </div>

            <div className="px-4 bg-white">
              <p className="text-xs py-3 uppercase text-gray-400 tracking-widest">
                {product.subCategory?.name || "Gift Item"}
              </p>
              <Link to={`/product/${product._id}`}>
                <h2 className="text-sm font-semibold text-gray-800 truncate hover:text-red-500">
                  {product.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-500 truncate">
                by {product.artisan?.name} ({product.artisan?.origin})
              </p>
              <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
            </div>
          </div>
        ))}
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
    </div>
  );
};

export default NewArrivals;
