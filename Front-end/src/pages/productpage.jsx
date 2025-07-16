import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
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
  const { usertoken,quantity,setQuantity } = useContext(AuthContext);
  

  const [products, setProducts] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: "50%", y: "50%" });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [pincode, setPincode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [customizationMode, setCustomizationMode] = useState(false);
  const intervalRef = useRef(null);
const [selectedMaterial, setSelectedMaterial] = useState("");
const [customText, setCustomText] = useState("");
const [customLength, setCustomLength] = useState("");
const [customWidth, setCustomWidth] = useState("");
const [customHeight, setCustomHeight] = useState("");
const [designImage, setDesignImage] = useState(null);
const [customMessage, setCustomMessage] = useState("");
const [giftWrap, setGiftWrap] = useState(false);

const [enableCustomization, setEnableCustomization] = useState(true); // or false if toggled later



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
        <div className="flex flex-col lg:flex-row  gap-10">
  {/* Images Section */}
<div className="flex flex-col lg:flex-row gap-10">
  {/* Image Section */}
  <div className="w-full lg:w-1/2">
    <div className="sticky top-24 h-[80vh] flex flex-col-reverse lg:flex-row overflow-hidden">
      {/* Thumbnails */}
      <div className="flex flex-row lg:flex-col gap-2 justify-center lg:pr-4 mt-4 lg:mt-0 max-h-[calc(80vh-1rem)] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">

        {products.images?.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`w-14 h-16 border-2 rounded ${
              selectedImage === i
                ? "border-blue-600 scale-105"
                : "border-gray-300 hover:border-blue-400"
            } transition`}
          >
            <img src={img.url} alt={`thumb-${i}`} className="w-full h-full object-cover rounded" />
          </button>
        ))}
      </div>

      {/* Main Image */}
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

  {/* See all reviews button */}
  <NavLink to={`/reviews/${id}`}
    
    className="text-blue-600 text-sm underline ml-2 hover:text-blue-800"
  >
    See all reviews
  </NavLink>
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

     {/* Customization Section */}

{enableCustomization && (
  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold text-purple-800">Customize Your Product</h3>
      <button
        onClick={() => setCustomizationMode(!customizationMode)}
        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
          customizationMode
            ? "bg-purple-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {customizationMode ? "Enabled" : "Enable"}
      </button>
    </div>

    {customizationMode && (
      <div className="space-y-6">
        {/* Material Option */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Material</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
          >
            {["Bamboo", "Sheesham Wood", "Clay", "Jute"].map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text / Name Personalization
          </label>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="e.g., Happy Birthday, Raj"
            maxLength="30"
          />
        </div>

        {/* Size Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Select Size</h3>
          <div className="flex flex-wrap gap-3">
            {["Small", "Medium", "Large", "Custom"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-3 border-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedSize === size
                    ? "bg-blue-600 text-white border-blue-600 scale-105"
                    : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Custom Dimension Inputs */}
          {selectedSize === "Custom" && (
            <div className="grid grid-cols-3 gap-4 mt-3">
              <input
                type="text"
                placeholder="Length (cm)"
                value={customLength}
                onChange={(e) => setCustomLength(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Width (cm)"
                value={customWidth}
                onChange={(e) => setCustomWidth(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Height (cm)"
                value={customHeight}
                onChange={(e) => setCustomHeight(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Design / Pattern Upload */}
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Upload Design / Pattern</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setDesignImage(e.target.files[0])}
            className="p-3 border border-gray-300 rounded-lg"
          />

          {/* Preview Uploaded Design */}
          {designImage && (
            <div className="mt-3">
              <img
                src={URL.createObjectURL(designImage)}
                alt="Uploaded Design"
                className="max-h-40 rounded-lg border border-gray-300 object-contain"
              />
            </div>
          )}
        </div>

        {/* Message to Vendor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message / Instructions for Vendor
          </label>
          <textarea
            rows="4"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Any special requests or instructions"
          ></textarea>
        </div>

        {/* Gift Wrapping Option */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={giftWrap}
            onChange={(e) => setGiftWrap(e.target.checked)}
            className="h-5 w-5 text-purple-600"
          />
          <label className="text-sm text-gray-700 font-medium">
            Include gift wrapping (₹49 extra)
          </label>
        </div>
      </div>
    )}
  </div>
)}



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
    <div className="flex gap-4">
  {/* Add to Cart */}
  <button
    onClick={handleAddToCart}
    disabled={loading}
    className={`flex-1 py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
      loading ? "opacity-60 cursor-not-allowed" : "hover:scale-105 hover:shadow-lg"
    }`}
  >
    {loading ? "Adding..." : "Add to Cart"}
  </button>

  {/* Buy Now */}
  <button
    onClick={() =>
      navigate(`/checkout/${id}`, {
        state: {
          product: products,
          quantity: quantity,
          size: selectedSize,
          color: selectedColor,
        },
      })
    }
    className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg text-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
  >
    Buy Now
  </button>
</div>

</div>
</div>

      </div>

     {/* Description Section */}
<div className="bg-white p-4 sm:p-6 md:p-8 my-10 shadow-2xl rounded-xl border border-gray-200">
  {/* Tab Buttons */}
  <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
    {["description", "features", "specifications"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`flex-shrink-0 px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold capitalize transition-all duration-300 whitespace-nowrap ${
          activeTab === tab
            ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Tab Content */}
  <div className="mt-6 sm:mt-8">
    {/* Description Tab */}
    {activeTab === "description" && (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{products.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Benefits */}
          <div className="space-y-3">
            <h4 className="font-bold text-base sm:text-lg text-gray-900">Key Benefits:</h4>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              {[
                "🎁 Special combo offers available",
                "🚚 Fast and free shipping on orders over ₹999",
                "✨ Premium quality materials",
                "💬 24/7 customer support",
                "📦 Secure packaging guaranteed",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What Makes Us Special */}
          <div className="space-y-3">
            <h4 className="font-bold text-base sm:text-lg text-gray-900">What Makes Us Special:</h4>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              {[
                "🌱 Eco-friendly manufacturing",
                "🎨 Customization options",
                "🏆 Award-winning design",
                "🔒 Quality guarantee",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )}

    {/* Features Tab */}
    {activeTab === "features" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => {
          const Icon = LucideIcons[feature.icon] || LucideIcons.HelpCircle;
          return (
            <div key={i} className="p-2 sm:p-3 border rounded-xl bg-gray-50 hover:shadow-lg transition duration-300">
              <Icon size={28} className="text-blue-600 mb-2" />
              <h4 className="text-base font-semibold text-gray-800">{feature.title}</h4>
              <p className="text-gray-600 text-sm mt-2">{feature.description}</p>
            </div>
          );
        })}
      </div>
    )}

    {/* Specifications Tab */}
    {activeTab === "specifications" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-gray-800 text-sm sm:text-base leading-6">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="font-semibold">{key}:</span>
            <span className="text-right">{value}</span>
          </div>
        ))}
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
    </div>
  );
};

export default ProductPage;