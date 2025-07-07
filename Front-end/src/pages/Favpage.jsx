import React, { useContext, useState, useEffect } from 'react';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { product } from '../data/allapi';

const FavoriteItems = () => {
  const { userdata, usertoken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  // Local state for wishlist initialized from context userdata
  const [wishlist, setWishlist] = useState(userdata?.addtowishlist || []);

  // In case userdata changes (like after login), update wishlist
  useEffect(() => {
    setWishlist(userdata?.addtowishlist || []);
  }, [userdata]);

  const handleAddToCart = async (id) => {
    if (!usertoken) {
      toast.error("Please login to add products to cart.");
      return;
    }

    try {
      const response = await fetch(`${product.ADD_TO_CART}/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message || "Failed to add to cart");
      }

      toast.success("Item added to cart successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleRemove = async (id) => {
    if (!usertoken) {
      toast.error("Please login to remove items from wishlist.");
      return;
    }

    try {
      const response = await fetch(`${product.REMOVE_FROM_WISHLIST}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message || "Failed to remove item");
      }

      toast.success("Removed from favorites");

      // Update local wishlist state by filtering out removed item
      setWishlist(prevWishlist => prevWishlist.filter(item => item._id !== id));

    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    for (let i = 0; i < full; i++) stars.push(<Star key={`f${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    if (half) stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    for (let i = 0; i < 5 - Math.ceil(rating); i++) stars.push(<Star key={`e${i}`} className="h-4 w-4 text-gray-300" />);
    return stars;
  };

  return (
    <div className="space-y-6 mt-30">
      <div className="flex justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Favorite</h2>
        <div className="ml-7 text-sm text-gray-600">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(item => (
            <motion.div
              key={item._id}
              className="relative bg-white/30 backdrop-blur-lg p-6 border border-white/40 shadow-lg group overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              {/* ...rest of your JSX code remains unchanged */}
              <div className="relative mb-4">
                <div className="w-full h-78 bg-gray-200 overflow-hidden flex items-center justify-center">
                  <img
                    src={item.images?.[0].url}
                    alt={item.title}
                    className="object-cover h-full w-full rounded-lg transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {item.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    -{item.discount}%
                  </div>
                )}

                {!item.inStock && (
                  <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    Out of Stock
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="px-3 py-1 text-sm bg-white text-gray-800 rounded-lg shadow hover:bg-gray-200 transition"
                  >
                    Quick View
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 text-lg line-clamp-2">{item.title}</h3>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">{renderStars(item.ratings || 0)}</div>
                  <span className="text-sm text-gray-600">({item.reviews?.length || 0})</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-gray-800">₹{item.price}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                  )}
                </div>

                <motion.button
                  onClick={() => handleAddToCart(item._id)}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg transition-all duration-500 hover:shadow-xl"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
            <Heart className="h-12 w-12 text-pink-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 mb-6">Start adding items you love to your wishlist!</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoriteItems;
