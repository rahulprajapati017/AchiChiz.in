import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { products } from "../data/products";
import HoverReview from "../components/card"; // ✅ Hover review component
import { useCart } from "../context/CartContext"; // ✅ Cart context
import toast from "react-hot-toast"; // ✅ Toast notification

const ProductPage = () => {
  const { id } = useParams();     
  const product = products.find((item) => item.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  const { addToCart } = useCart(); // ✅ Get addToCart from context

  if (!product) {
    return <div className="text-center py-20 text-red-500 text-xl">Product not found.</div>;
  }

  return (
    <div className="w-full px-6 lg:px-12 py-10 space-y-10 text-[#1e1e1e] font-sans bg-[#fef4e8]">

      {/* Title */}
      <div className="rounded-3xl bg-white/30 backdrop-blur-xl p-6 shadow-xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#0f2c5c] drop-shadow">🧺 {product.title}</h1>

        {/* Image + Overview */}
        <div className="lg:flex gap-10">

          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-[inset_8px_8px_15px_#d4d4d4,inset_-8px_-8px_15px_#ffffff] relative">
              <img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.title}
                className="object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ease-in-out opacity-100"
              />
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setSelectedImage(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    selectedImage === i ? "bg-blue-600 scale-110" : "bg-gray-400 hover:bg-blue-400"
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 space-y-4">
            <h2 className="text-3xl font-semibold text-[#0f2c5c]">{product.title}</h2>

            {/* Hover Review */}
            <HoverReview
              rating={product.rating}
              reviewCount={product.reviews.length}
              ratingData={product.ratingData}
            />

            <p className="text-2xl font-bold text-green-800">₹ {product.price}</p>
            <p className="text-gray-600">{product.discount}% off</p>

            <p className="text-[#333] leading-relaxed text-md border-t border-dashed pt-3">{product.description}</p>

            <ul className="text-sm space-y-1 text-[#333]">
              <li>🎁 Special Combo Offer: Buy 2 Save More</li>
              <li>🚚 Free delivery across India</li>
              <li>✨ Exclusive Launch — Limited Stock</li>
              <li>💬 24/7 Customer Support</li>
              <li>📦 Secure Packaging Guaranteed</li>
            </ul>

            <div className="flex gap-4 mt-6">
              {/* ✅ Add to Cart Button */}
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.title} added to cart!`);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow hover:scale-105 transition-all"
              >
                Add to Cart
              </button>

              <button className="flex-1 py-3 bg-[#0f2c5c] text-white font-semibold rounded-xl shadow hover:bg-[#143b7c] transition-all">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {product.features.map((f, i) => {
          const Icon = LucideIcons[f.icon] || LucideIcons.HelpCircle;
          return (
            <div key={i} className="bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-md text-center">
              <Icon className="h-8 w-8 mx-auto text-indigo-600" />
              <p className="mt-3 font-medium text-[#0f2c5c]">{f.title}</p>
            </div>
          );
        })}
      </div>

      {/* Specifications */}
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-3 text-[#0f2c5c]">Specifications</h2>
        <table className="w-full text-left border-collapse">
          <tbody>
            {Object.entries(product.specs).map(([key, val], i) => (
              <tr key={i} className={i % 2 ? "bg-white/30" : "bg-white/10"}>
                <td className="p-3 font-medium text-[#333]">{key}</td>
                <td className="p-3 text-[#555]">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQs */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#0f2c5c]">FAQs</h2>
        {product.faqs.length > 0 ? product.faqs.map((q, i) => (
          <div key={i} className="bg-white/40 p-4 rounded-xl">
            <p className="font-medium">Q: {q.question}</p>
            <p className="ml-4">A: {q.answer}</p>
          </div>
        )) : <p className="text-gray-500">No FAQs added.</p>}
      </div>
    </div>
  );
};

export default ProductPage;
