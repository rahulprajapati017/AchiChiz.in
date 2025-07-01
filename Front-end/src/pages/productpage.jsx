import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { products } from "../data/products";
import HoverReview from "../components/card";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: "50%", y: "50%" });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const intervalRef = useRef(null);

  const { addToCart } = useCart();

  // Calculate rating distribution for HoverReview
  const ratingData = [5, 4, 3, 2, 1].map((stars) => {
    const count = product?.reviews?.filter((r) => r.rating === stars).length || 0;
    return {
      stars,
      percentage:
        product?.reviews?.length > 0
          ? Math.round((count / product.reviews.length) * 100)
          : 0,
    };
  });

  // Auto-switch image
  useEffect(() => {
    if (!isHoveringImage) {
      intervalRef.current = setInterval(() => {
        setSelectedImage((prev) => (prev + 1) % product.images.length);
      }, 3000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHoveringImage, product.images.length]);

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500 text-xl">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-[#1e1e1e] mt-15 px-6 lg:px-12 py-10 space-y-10 font-sans">
      {/* Title */}
      <div className="bg-white p-6 shadow-xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#0f2c5c] drop-shadow">
          🧺 {product.title}
        </h1>

        {/* Image + Overview */}
        <div className="lg:flex gap-10">
          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            <div
              className="group aspect-square overflow-hidden shadow-[inset_8px_8px_15px_#d4d4d4,inset_-8px_-8px_15px_#ffffff] relative"
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => {
                setIsHoveringImage(false);
                setZoomPos({ x: "50%", y: "50%" });
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setZoomPos({ x: `${x}%`, y: `${y}%` });
              }}
            >
              <img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.title}
                className="object-cover w-full h-full absolute top-0 left-0 transition-transform duration-300 ease-in-out group-hover:scale-150"
                style={{ transformOrigin: `${zoomPos.x} ${zoomPos.y}` }}
              />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex justify-center gap-2">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setSelectedImage(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    selectedImage === i
                      ? "bg-blue-600 scale-110"
                      : "bg-gray-400 hover:bg-blue-400"
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 space-y-4">
            <h2 className="text-3xl font-semibold text-[#0f2c5c]">
              {product.title}
            </h2>

            {/* Hover Review */}
            <HoverReview
              rating={product.rating}
              reviewCount={product.reviews.length}
              productId={product.id}
              ratingData={ratingData}
            />

            <p className="text-2xl font-bold text-green-800">
              ₹ {product.price}
            </p>
            <p className="text-gray-600">{product.discount}% off</p>

            <p className="text-[#333] leading-relaxed text-md border-t border-dashed pt-3">
              {product.description}
            </p>

            <ul className="text-sm space-y-1 text-[#333]">
              <li>🎁 Special Combo Offer: Buy 2 Save More</li>
              <li>🚚 Free delivery across India</li>
              <li>✨ Exclusive Launch — Limited Stock</li>
              <li>💬 24/7 Customer Support</li>
              <li>📦 Secure Packaging Guaranteed</li>
            </ul>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.title} added to cart!`);
                }}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 relative overflow-hidden font-semibold text-white shadow z-10 group hover:scale-105 transition-transform duration-300"
              >
                <span className="absolute inset-0 bg-[#143b7c] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out z-0" />
                <span className="relative z-10">Add To Cart</span>
              </button>

              <button className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 relative overflow-hidden font-semibold text-white shadow z-10 group hover:scale-105 transition-transform duration-300">
                <span className="absolute inset-0 bg-[#143b7c] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out z-0" />
                <span className="relative z-10">Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        {product.features.map((f, i) => {
          const Icon = LucideIcons[f.icon] || LucideIcons.HelpCircle;
          return (
            <div
              key={i}
              className="bg-white p-6 shadow-md text-center hover:scale-105"
            >
              <Icon className="h-8 w-8 mx-auto text-indigo-600" />
              <p className="mt-3 font-medium text-[#0f2c5c]">{f.title}</p>
            </div>
          );
        })}
      </div>

      {/* Specifications */}
      <div className="bg-white p-6 shadow hover:scale-105">
        <h2 className="text-2xl font-bold mb-3 text-[#0f2c5c]">
          Specifications
        </h2>
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
        {product.faqs.length > 0 ? (
          product.faqs.map((q, i) => (
            <div key={i} className="bg-white p-4 rounded-xl">
              <p className="font-medium">Q: {q.question}</p>
              <p className="ml-4">A: {q.answer}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No FAQs added.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
