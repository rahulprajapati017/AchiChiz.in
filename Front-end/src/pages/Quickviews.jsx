import React, { useState, useContext } from "react";
import { X, Heart, Share2, Truck, Clock } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { product as pro } from "../data/allapi";
import { useNavigate, useParams } from "react-router-dom";

const Quickviews = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { addToFavorites } = useFavorites();
  const { usertoken } = useContext(AuthContext);

  // Unify formats: 'new', 'with data', 'legacy'
  const obj = product?.data ? product.data : product;
  const {
    _id,
    title = "Untitled",
    description = "No description available.",
    price = 0,
    stock = obj.stock ?? 20,
    maxStock = obj.maxStock ?? 100,
    images = [],
    image,
    reviews = [],
    ratings = obj.ratings ?? 4,
    sku = obj.sku ?? "N/A",
    categories = obj.categories ?? [],
    subCategory = obj.subCategory,
    category = obj.category,
    artisan = obj.artisan,
    brand = obj.brand,
    size = obj.size,
    color = obj.color,
  } = obj || {};

  const allImages = images?.length ? images : image ? [image] : [];
  const imgCount = allImages.length;

  const nextImage = () => setImageIndex((i) => (i + 1) % imgCount);
  const prevImage = () => setImageIndex((i) => (i - 1 + imgCount) % imgCount);

  const handleAddToCart = async () => {
    try {
      const res = await fetch(`${pro.ADD_TO_CART}/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`,
        },
        body: JSON.stringify({ productId: _id, quantity }),
      });
      const result = await res.json();
      if (res.ok) {
        addToCart(obj);
        toast.success(`${title} added to cart!`);
      } else throw new Error(result.message || "Failed");
    } catch (e) {
      toast.error(e.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-5xl bg-white text-black flex overflow-hidden shadow-lg max-h-[80vh] relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-700 hover:text-black z-50">
          <X size={28} />
        </button>

        {/* Image Panel */}
        <div className="w-1/2 h-[90vh] flex items-center justify-center border-r overflow-hidden">
          {imgCount ? (
            <img
              src={allImages[imageIndex]?.url}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              No image available
            </div>
          )}
          {imgCount > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-gray-100 rounded-full shadow">
                ❮
              </button>
              <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-100 rounded-full shadow">
                ❯
              </button>
            </>
          )}
        </div>

        {/* Details Panel */}
        <div className="w-1/2 h-[80vh] overflow-y-auto p-8 bg-gray-50 space-y-5">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

          <div className="text-yellow-500 text-xl">
            {"★".repeat((reviews[0]?.rating || ratings) || 4)}
          </div>
          <p className="text-sm text-gray-500">{reviews.length || 0} Customer Reviews</p>

          <div className="text-2xl font-bold text-green-700">₹{price}</div>
          <hr className="border-gray-300" />

          <p className="text-gray-700">{description}</p>

          <p className="text-red-600 font-semibold">
            Only {stock} item(s) left in stock!
          </p>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-red-500"
              style={{ width: `${(stock / maxStock) * 100}%` }}
            />
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex border border-gray-300">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-4 py-2">−</button>
              <span className="px-4 py-2">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="px-4 py-2">+</button>
            </div>
            <button onClick={handleAddToCart} className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded shadow">
              Add To Cart
            </button>
          </div>

          <button onClick={() => navigate(`/checkout/${id}`)} className="w-full border py-3 mt-4 hover:bg-gray-100">
            BUY NOW
          </button>

          {/* Extra Info */}
          <div className="space-y-3 text-sm text-gray-700">
            <button
              onClick={() => {
                addToFavorites(obj);
                toast.success(`${title} added to wishlist!`);
              }}
              className="px-4 py-2 border rounded-full flex items-center gap-2 hover:border-red-600 text-gray-700"
            >
              <Heart size={20} /> add to Wishlist
            </button>

            <button
              onClick={() => {
                navigator.share
                  ? navigator.share({ title, text: "Check out this!", url: window.location.href })
                  : toast("Sharing not supported");
              }}
              className="px-4 py-2 border rounded-full flex items-center gap-2 hover:border-blue-600 text-gray-700"
            >
              <Share2 size={20} /> Share
            </button>

            <div className="bg-gray-100 p-4 rounded-lg shadow text-center space-y-2">
              <div className="flex justify-center flex-wrap gap-3">
                {["mastercard","apple-pay","visa","amex","paypal","stripe"].map((m) => (
                  <img key={m} src={`https://img.icons8.com/color/48/${m}.png`} alt={m} />
                ))}
              </div>
              <p className="text-sm">Secure Checkout</p>
            </div>

            <div className="flex items-center gap-2">
              <Truck size={20} /> Free shipping on orders over ₹1000
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} /> Delivery in 3–7 Days
            </div>

            <p><strong>SKU:</strong> {sku}</p>
            <p>
              <strong>Category:</strong> {categories.join(", ") || subCategory?.name || category || "N/A"}
            </p>
            {/* <p><strong>Brand:</strong> {brand || artisan?.name || "N/A"}</p>
            {size && size.length > 0 && <p><strong>Size:</strong> {size.join(", ")}</p>} */}
            {/* {color && (
              <p>
                <strong>Color:</strong>{" "}
                <span className="inline-block w-4 h-4 border rounded-full"
                      style={{ backgroundColor: Array.isArray(color) ? color[0] : color }} />
              </p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quickviews;
