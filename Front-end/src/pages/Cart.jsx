import React, { useContext, useEffect } from "react";
import HoverReview from "../components/card";
import { AuthContext } from "../context/AuthContext";
import { product } from "../data/allapi";

const CartPage = () => {
  const { userdata, usertoken } = useContext(AuthContext);
  const cartItems = userdata?.addtocart || [];

  useEffect(() => {
    document.body.style.backgroundColor = "#fef4e8";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleRemoveItem = async (id) => {
    try {
      const response = await fetch(`${product.REMOVE_FROM_CART}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      // Optionally refetch user data here from context
      // e.g. await refetchUserData(); if your context supports it
      // or reload page for now:
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert("Error removing item from cart");
    }
  };

  return (
    <div className="text-[#1e1e1e] font-sans mt-30 px-4 py-10 max-w-7xl mx-auto relative">
      {/* Heading */}
      <h1 className="text-4xl font-bold mt-20 mb-8 text-center text-[#0f2c5c]">
        🧺 Your Cart
      </h1>

      {/* Cart Items + Summary */}
      <div className="grid lg:grid-cols-3 gap-10">
        {/* LEFT: Cart Items */}
        <div className="lg:col-span-2 space-y-10">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">Your cart is empty 😢</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-3xl bg-[#e0dcdc] shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all relative"
              >
                {/* Remove button */}
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  aria-label="Remove item"
                  className="absolute top-3 right-3 text-gray-600 hover:text-red-600 font-bold text-2xl leading-none select-none cursor-pointer width-[50px]"
                >
                  ❌
                </button>

                {/* Product Image */}
                <div className="flex justify-center items-center">
                  <img
                    src={item.images?.[0]?.url || "https://via.placeholder.com/150"}
                    alt={item.title}
                    className="w-44 h-44 object-cover rounded-2xl shadow hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="md:col-span-2 space-y-3 relative">
                  <h2 className="text-xl font-bold text-[#0f2c5c]">{item.title}</h2>

                  <HoverReview
                    rating={item.ratings || 0}
                    reviewCount={item.numReviews || 0}
                    ratingData={null}
                  />

                  <p className="text-sm mt-4">{item.description}</p>

                  <p className="font-bold text-green-700">₹ {item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT: Summary */}
        <div className="sticky top-10 h-fit p-6 rounded-3xl bg-white/40 backdrop-blur-lg border border-white/30 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-[#0f2c5c]">Summary</h3>
          <div className="text-lg font-semibold mb-2">Total Items: {cartItems.length}</div>
          <div className="text-xl font-bold text-[#0f2c5c] mb-6">Grand Total: ₹ {totalAmount}</div>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold hover:from-pink-400 hover:to-orange-500 transition-all shadow-lg hover:scale-105">
            🛍️ Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="mt-16 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white/30 backdrop-blur-lg border border-white/40 p-4 shadow-lg text-sm text-black hover:bg-[#e0dcdc] transition-all">
          <p className="font-bold">🚚 Free Shipping</p>
          <p className="underline text-gray-700 cursor-pointer hover:text-black">
            Enter your postal code for delivery availability.
          </p>
        </div>
        <div className="rounded-xl bg-white/30 backdrop-blur-lg border border-white/40 p-4 shadow-lg text-sm text-black hover:bg-[#e0dcdc] transition-all">
          <p className="font-bold pt-2 mt-1">↩️ Return Policy</p>
          <p className="text-gray-700">
            Free 30-day delivery return.{" "}
            <a href="#" className="underline hover:text-blue-700">
              Details
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
