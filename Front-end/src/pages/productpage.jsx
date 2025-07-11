import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { Heart, Share2, Plus, Minus, MapPin, Star } from "lucide-react";
import HoverReview from "../components/card";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";
import { product as api, product } from "../data/allapi";
import { AuthContext } from "../context/AuthContext";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usertoken } = useContext(AuthContext);

  const [products, setProducts] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: "50%", y: "50%" });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [pincode, setPincode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const intervalRef = useRef(null);

  const features = [
    { icon: "Leaf", title: "Eco-friendly Bamboo" },
    { icon: "Hand", title: "100% Handmade" },
    { icon: "Flag", title: "Made in India" },
    { icon: "CheckCircle", title: "Artisan Certified" },
    { icon: "Layout", title: "Minimal & Modern Design" },
  ];

  // Fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setProducts(null);
        const res = await fetch(`${product.GET_SINGLE_PRODUCT}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const response = await res.json();
        setProducts(response.data);
        // Set default selections
        if (response.data.size?.length > 0) setSelectedSize(response.data.size[0]);
        if (response.data.color?.length > 0) setSelectedColor(response.data.color[0]);
      } catch (error) {
        console.error(error);
        setProducts(null);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(product.GET_ALL_PRODUCT);
        if (!res.ok) throw new Error("Failed to fetch all products");
        const response = await res.json();
        setAllProducts(response.data || []);
      } catch (error) {
        console.error(error);
        setAllProducts([]);
      }
    };

    fetchAllProducts();
  }, []);

  // Related Products Logic
  useEffect(() => {
    if (products && allProducts.length > 0) {
      const related = allProducts
        .filter((p) => {
          const sameCategory = p.category?._id === products.category?._id;
          const sameSubCategory = p.subCategory?._id === products.subCategory?._id;
          const hasCommonTags = p.tags?.some((tag) => products.tags?.includes(tag));
          return (sameCategory || sameSubCategory || hasCommonTags) && p._id !== products._id;
        })
        .slice(0, 4);
      setRelatedProducts(related);
    } else {
      setRelatedProducts([]);
    }
  }, [products, allProducts]);

  // Image Auto Slide
  useEffect(() => {
    if (!isHoveringImage && products?.images?.length > 0) {
      intervalRef.current = setInterval(() => {
        setSelectedImage((prev) => (prev + 1) % products.images.length);
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHoveringImage, products?.images?.length]);

  const handleAddToCart = async () => {
    if (!usertoken) {
      toast.error("Please login to add products to cart.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${api.ADD_TO_CART}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`,
        },
        body: JSON.stringify({
          quantity: quantity,
          size: selectedSize,
          color: selectedColor
        }),
      });
      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message || "Failed to add to cart");
      }
      toast.success("Item added to cart successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!usertoken) {
      toast.error("Please login to add to wishlist.");
      return;
    }
    try {
      const response = await fetch(`${api.ADD_TO_WISHLIST}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`,
        },
        body: JSON.stringify({ productId: products._id }),
      });
      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message || "Failed to add to wishlist");
      }
      toast.success(`${products.title} added to wishlist!`);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: products.title,
          text: "Check out this amazing product!",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } catch (error) {
        toast.error("Unable to share or copy link");
      }
    }
  };

  const handlePincodeCheck = () => {
    if (pincode.length === 6) {
      toast.success("Delivery available in your area!");
    } else {
      toast.error("Please enter a valid 6-digit pincode");
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const calculateTotalPrice = () => {
    return (products.price * quantity).toFixed(2);
  };

  if (products === null) {
    return <div className="text-center py-20 text-gray-700 text-xl">Loading...</div>;
  }

  if (!products || !products._id) {
    return <div className="text-center py-20 text-red-500 text-xl">Product not found.</div>;
  }

  const specs = {
    Material: products.material || "N/A",
    Size: products.size?.join(", ") || "N/A",
    Weight: products.weight || "N/A",
    Color: products.color?.join(", ") || "N/A",
    Brand: products.brand || "N/A",
    Category: products.category?.name || "N/A",
  };

  const reviews = Array.isArray(products.reviews) ? products.reviews : [];
  const ratingData = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    return {
      stars,
      percentage: reviews.length ? Math.round((count / reviews.length) * 100) : 0,
    };
  });

  const faqs = Array.isArray(products.faqs) ? products.faqs : [];

  return (
    <div className="min-h-screen w-full mt-3 bg-white text-[#1e1e1e] px-4 sm:px-6 lg:px-12 py-5 space-y-10 font-sans">
      <div className="bg-white p-6 shadow-xl rounded-lg">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Images Section */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row">
            <div className="flex flex-row lg:flex-col gap-2 justify-center lg:pr-4 mt-4 lg:mt-0">
              {products.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 border-2 rounded ${
                    selectedImage === i
                      ? "border-blue-600 scale-105"
                      : "border-gray-300 hover:border-blue-400"
                  } transition`}
                >
                  <img src={img.url} alt={`thumb-${i}`} className="w-full h-full object-cover rounded" />
                </button>
              ))}
            </div>

            <div
              className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg"
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
                src={products.images?.[selectedImage]?.url}
                alt={products.title}
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
                style={{ transformOrigin: `${zoomPos.x} ${zoomPos.y}` }}
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* Title and Description */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{products.title}</h1>
              <p className="text-gray-600 text-sm leading-relaxed">{products.description}</p>
            </div>

            {/* Wishlist and Share Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToWishlist}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-red-600 hover:border-red-300 transition"
              >
                <Heart size={18} />
                Add to Wishlist
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-blue-600 hover:border-blue-300 transition"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.round(products.ratings || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {products.ratings || 0} ({reviews.length} reviews)
              </span>
            </div>

            {/* Price Section with Quantity */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-green-600">₹{calculateTotalPrice()}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    (₹{products.price} × {quantity})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 border rounded-lg hover:bg-gray-100 transition"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 border rounded-lg hover:bg-gray-100 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Size and Color Selection */}
            <div className="space-y-4">
              {/* Size Selection */}
              {products.size && products.size.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Available Sizes:</h3>
                  <div className="flex gap-2">
                    {products.size.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg transition ${
                          selectedSize === size
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Selected: {selectedSize}</p>
                </div>
              )}

              {/* Color Selection */}
              {products.color && products.color.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Available Colors:</h3>
                  <div className="flex gap-2">
                    {products.color.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg transition ${
                          selectedColor === color
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Selected: {selectedColor}</p>
                </div>
              )}
            </div>

            {/* Stock and Pincode */}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-green-600 font-semibold">In Stock</span>
                <span className="text-gray-500 ml-2">(15 items left)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm w-32"
                  maxLength="6"
                />
                <button
                  onClick={handlePincodeCheck}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
                >
                  Check
                </button>
              </div>
            </div>

            {/* Add to Cart with Quantity Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className={`flex-1 py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
                  loading ? "opacity-60 cursor-not-allowed" : "hover:scale-105 hover:shadow-lg"
                }`}
              >
                {loading ? "Adding..." : "Add to Cart"}
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={() =>
                navigate(`/checkout/${id}`, {
                  state: { 
                    product: products, 
                    quantity: quantity,
                    size: selectedSize,
                    color: selectedColor
                  },
                })
              }
              className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-lg rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white p-6 shadow-xl rounded-lg">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-3 font-semibold ${
              activeTab === "description"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("features")}
            className={`px-6 py-3 font-semibold ${
              activeTab === "features"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab("specifications")}
            className={`px-6 py-3 font-semibold ${
              activeTab === "specifications"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Specifications
          </button>
        </div>

        <div className="mt-6">
          {activeTab === "description" && (
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{products.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Benefits:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>🎁 Special Combo Offer: Buy 2 Save More</li>
                    <li>🚚 Free delivery across India</li>
                    <li>✨ Exclusive Launch — Limited Stock</li>
                    <li>💬 24/7 Customer Support</li> 
                    <li>📦 Secure Packaging Guaranteed</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => {
                const Icon = LucideIcons[feature.icon] || LucideIcons.HelpCircle;
                return (
                  <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Icon className="h-8 w-8 text-blue-600" />
                    <span className="font-medium text-gray-900">{feature.title}</span>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <tbody>
                  {Object.entries(specs).map(([key, value], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900 w-1/3">
                        {key}
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-700">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* FAQs */}
      {faqs.length > 0 && (
        <div className="bg-white p-6 shadow-xl rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Q: {faq.question}</h3>
                <p className="text-gray-700">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      <div className="space-y-6 border-t-2 pt-10">
        <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-8">No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;