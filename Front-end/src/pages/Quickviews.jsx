import React, { useState } from 'react';
import { X, Heart, Share2, Truck, Clock } from 'lucide-react';
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import { toast } from "react-hot-toast";

const Quickviews = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);

  const images = product.images || [];
  const stock = product.stock || 20;
  const maxStock = product.maxStock || 100;
   const { addToCart } = useCart();
    const {addToFavorites} = useFavorites();

  const nextImage = () => setImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center  justify-center bg-black/60">
      <div className="w-full max-w-5xl  bg-white text-black flex overflow-hidden shadow-lg max-h-[80vh] relative">
       
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-700 hover:text-black transition z-50"
        >
          <X size={28} />
        </button>

        
        <div className="w-1/2 h-[90vh] relative flex items-center justify-center border-r overflow-hidden">
          <img
            src={images[imageIndex]}
            alt={product.title}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-black p-2 rounded-full shadow"
              >
                ❮
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-black p-2 rounded-full shadow"
              >
                ❯
              </button>
            </>
          )}
        </div>

        
        <div className="w-1/2 h-[80vh] overflow-y-auto p-8 bg-gray-50 space-y-5">
          <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>

          <div className="text-yellow-500 text-xl">
            {'★'.repeat(product.reviews?.[0]?.rating || 4)}
          </div>
          <p className="text-sm text-gray-500">
            {product.reviews?.length || 0} Customer Reviews
          </p>

          <div className="text-2xl font-bold text-green-700">₹{product.price}</div>
          <hr className="border-gray-300" />

          <p className="text-gray-700">{product.description}</p>

          <div>
            <p className="text-red-600 font-semibold">
              Only {stock} item(s) left in stock!
            </p>
            <div className="w-full h-2 rounded-full bg-gray-200 mt-1">
              <div
                className="bg-red-500 h-full"
                style={{ width: `${(stock / maxStock) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center  mt-4 gap-4">
            <div className="flex border border-gray-300 ">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 text-lg hover:bg-gray-200"
              >
                −
              </button>
              <span className="px-4 py-2  border-gray-300">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2 text-lg hover:bg-gray-200"
              >
                +
              </button>
            </div>

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
          </div>

          <button className="w-full border border-gray-400 mt-4 py-3 font-semibold hover:bg-gray-100 transition">
            BUY NOW
          </button>

          <div className="mt-6 space-y-5 text-sm text-gray-700">
            <div className="flex items-center justify-between">
               <button
                  onClick={() =>{ addToFavorites(product);
                    toast.success(`${product.title} added to wishlist!`);}}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:text-red-600 hover:border-red-600 transition"
                
                >
                  <Heart size={20} />add to Wishlist
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
                  <Share2 size={20} /> Share
                </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg text-center shadow space-y-2">
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

            <p className=" border-t-1 mt-2">
              <span className="font-semibold">SKU:</span> {product.sku}
            </p>
            <p>
              <span className="font-semibold">Categories:</span> {product.categories?.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quickviews;
