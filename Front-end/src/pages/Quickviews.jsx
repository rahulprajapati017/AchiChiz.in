import React, { useState } from 'react';
import { X, Heart, RefreshCcw, Truck, Clock } from 'lucide-react';

const Quickviews = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);

  const images = product.images || [];
  const stock = product.stock || 20;
  const maxStock = product.maxStock || 100;

  const nextImage = () => setImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[8px]">
      <div className="w-full max-w-6xl rounded-3xl shadow-2xl bg-white/20 backdrop-blur-md border border-white/30 overflow-hidden max-h-[90vh] relative flex">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-100 hover:text-white transition z-50"
        >
          <X size={28} />
        </button>

        {/* 🖼 Left: Image Section */}
        <div className="w-1/2 h-[90vh] bg-white/10 flex items-center justify-center relative">
          <img
            src={images[imageIndex]}
            alt={product.title}
            className="object-contain w-full h-full transition-all duration-300 rounded-lg"
          />

          {/* ⬅ Prev Button */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black p-2 rounded-full shadow-md backdrop-blur-md"
            >
              ❮
            </button>
          )}

          {/* ➡ Next Button */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-black p-2 rounded-full shadow-md backdrop-blur-md"
            >
              ❯
            </button>
          )}
        </div>

        {/* 📝 Right: Info Section */}
        <div className="w-1/2 h-[90vh] overflow-y-auto p-8 bg-white/10 backdrop-blur-md text-white space-y-5">
          <h2 className="text-3xl font-bold">{product.title}</h2>

          <div className="text-yellow-300 text-xl">
            {'★'.repeat(product.reviews?.[0]?.rating || 4)}
          </div>
          <p className="text-sm text-gray-100">
            {product.reviews?.length || 0} Customer Reviews
          </p>

          <div className="text-2xl font-bold text-white">₹{product.price}</div>
          <hr className="border-white/30" />

          <p className="text-gray-100">{product.description}</p>

          {/* 📦 Stock Progress */}
          <div>
            <p className="text-red-400 font-semibold">
              Only {stock} item(s) left in stock!
            </p>
            <div className="w-full h-2 rounded-full bg-gray-500/30 mt-1 overflow-hidden">
              <div
                className="bg-red-500 h-full"
                style={{ width: `${(stock / maxStock) * 100}%` }}
              />
            </div>
          </div>

          {/* ➕ Quantity & Cart */}
          <div className="flex items-center mt-4 gap-4">
            <div className="flex border rounded-lg bg-white/20 backdrop-blur-md text-black">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 text-lg hover:bg-white/40 transition"
              >
                −
              </button>
              <span className="px-4 py-2 border-x bg-white/10">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2 text-lg hover:bg-white/40 transition"
              >
                +
              </button>
            </div>

            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300">
              ADD TO CART
            </button>
          </div>

          <button className="w-full border border-white/30 mt-4 py-3 rounded-xl font-semibold hover:bg-white/20 transition">
            BUY NOW
          </button>

          {/* 💳 Extra Info */}
          <div className="mt-6 space-y-5 text-sm text-gray-200">
            {/* Wishlist & Compare */}
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 hover:text-red-300 transition">
                <Heart className="w-5 h-5" />
                Add to wishlist
              </button>
              <button className="flex items-center gap-2 hover:text-blue-300 transition">
                <RefreshCcw className="w-5 h-5" />
                Compare
              </button>
            </div>

            {/* Payment Icons */}
            <div className="bg-white/10 p-4 rounded-xl text-center backdrop-blur-md shadow-inner space-y-2">
              <div className="flex justify-center gap-3 flex-wrap">
                <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" />
                <img src="https://img.icons8.com/color/48/apple-pay.png" alt="Apple Pay" />
                <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" />
                <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" />
                <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" />
                <img src="https://img.icons8.com/color/48/stripe.png" alt="Stripe" />
              </div>
              <p className="text-sm font-medium">Secure Guaranteed Checkout</p>
            </div>

            {/* Delivery Info */}
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 mt-1" />
              <p>Free shipping on orders over <span className="font-semibold">₹1000</span></p>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 mt-1" />
              <p>
                Delivery in <span className="font-semibold">3–7 Days</span>
              </p>
            </div>

            {/* SKU & Categories */}
            <p className="mt-2"><span className="font-semibold">SKU:</span> {product.sku}</p>
            <p><span className="font-semibold">Categories:</span> {product.categories?.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quickviews;
