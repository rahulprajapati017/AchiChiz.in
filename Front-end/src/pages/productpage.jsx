import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { Heart, Share2 } from "lucide-react";
import { products } from "../data/products";
import HoverReview from "../components/card";
import ProductCard from "../components/ProductCard"; // Reusable card
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id.toString() === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: "50%", y: "50%" });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const intervalRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isHoveringImage && product?.images?.length > 0) {
      intervalRef.current = setInterval(() => {
        setSelectedImage((prev) => (prev + 1) % product.images.length);
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHoveringImage, product?.images?.length]);

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500 text-xl">
        Product not found.
      </div>
    );
  }

  const ratingData = [5, 4, 3, 2, 1].map((stars) => {
    const count = product.reviews?.filter((r) => r.rating === stars).length || 0;
    return {
      stars,
      percentage: product.reviews?.length
        ? Math.round((count / product.reviews.length) * 100)
        : 0,
    };
  });

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen w-full mt-20 bg-white text-[#1e1e1e] px-4 sm:px-6 lg:px-12 py-10 space-y-10 font-sans">
    <div className="min-h-screen w-full mt-20 bg-white text-[#1e1e1e] px-4 sm:px-6 lg:px-12 py-10 space-y-10 font-sans overflow-hidden">
      {/* Main Section */}
      <div className="bg-white p-6 shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-black drop-shadow">
          🧺 {product.title}
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row">
            {/* Thumbnails */}
            <div className="flex flex-row lg:flex-col gap-2 justify-center lg:pr-4 mt-4 lg:mt-0 overflow-hidden">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 border-2 rounded overflow-hidden ${
                    selectedImage === i
                      ? "border-blue-600 scale-105"
                      : "border-gray-300 hover:border-blue-400"
                  } transition`}
                >
                  <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div
              className="relative w-full aspect-[5/5] overflow-hidden shadow-[inset_8px_8px_15px_#d4d4d4,inset_-8px_-8px_15px_#ffffff]"
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
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-150"
                style={{ transformOrigin: `${zoomPos.x} ${zoomPos.y}` }}
              />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-black">{product.title}</h2>
            <HoverReview
              rating={product.rating}
              reviewCount={product.reviews.length}
              productId={product.id}
              ratingData={ratingData}
            />
            <p className="text-xl sm:text-2xl font-bold text-green-800">₹ {product.price}</p>
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

            <div className="flex flex-col gap-3 mt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success(`${product.title} added to cart!`);
                  }}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 relative overflow-hidden font-semibold text-white shadow z-10 group hover:scale-105 transition-transform duration-300 rounded"
                >
                  <span className="absolute inset-0 bg-[#143b7c] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out z-0" />
                  <span className="relative z-10">Add To Cart</span>
                </button>

                <button className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 relative overflow-hidden font-semibold text-white shadow z-10 group hover:scale-105 transition-transform duration-300 rounded">
                  <span className="absolute inset-0 bg-[#143b7c] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out z-0" />
                  <span className="relative z-10">Buy Now</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-evenly mt-2">
                <button
                  onClick={() => toast.success("Added to Wishlist!")}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:text-red-600 hover:border-red-600 transition"
                >
                  <Heart size={16} /> Wishlist
                </button>

                <button
                  onClick={() => {
                    navigator.share
                      ? navigator.share({
                          title: product.title,
                          text: "Check out this amazing product!",
                          url: window.location.href,
                        })
                      : toast("Sharing not supported in your browser.");
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:text-blue-600 hover:border-blue-600 transition"
                >
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        {product.features.map((f, i) => {
          const Icon = LucideIcons[f.icon] || LucideIcons.HelpCircle;
          return (
            <div key={i} className="bg-white p-6 shadow-md text-center hover:scale-105 rounded">
              <Icon className="h-8 w-8 mx-auto text-indigo-600" />
              <p className="mt-3 font-medium text-[#0f2c5c]">{f.title}</p>
            </div>
          );
        })}
      </div>

      {/* Specifications */}
      <div className="bg-white p-6 shadow hover:scale-105 rounded">
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

      {/* ✅ Related Products using ProductCard */}
      <div className="space-y-6 border-y-2 py-3 mt-10">
        <h2 className="text-2xl font-bold text-[#0f2c5c]">Related Products</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
