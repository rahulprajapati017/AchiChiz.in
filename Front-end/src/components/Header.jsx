import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { useFavorites } from "../context/FavoriteContext";
import { useCart } from "../context/CartContext";
import AuthPage from "../components/Auth/AuthPage";
import { product } from "../data/allapi";

const navItems = [
  { title: "HOME", path: "/" },
  { title: "SHOP", path: "/category" },
  { title: "PRODUCTS", path: "/category" },
  { title: "BLOG", path: "/blog" },
  { title: "PAGE", path: "/about-us" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const { logout, userdata, usertoken } = useContext(AuthContext);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Fetch all products once when search dropdown opens for the first time
  useEffect(() => {
    if (searchOpen && allProducts.length === 0) {
      setIsLoading(true);
      fetch(product.GET_ALL_PRODUCT) // <-- your API URL here
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch products");
          return res.json();
        })
        .then((data) => {
          if (data && data.data && Array.isArray(data.data)) {
            setAllProducts(data.data);
          } else {
            setAllProducts([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setAllProducts([]);
        })
        .finally(() => setIsLoading(false));
    }
  }, [searchOpen, allProducts.length]);

  // Filter products when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = allProducts.filter((product) =>
        product.title
          ? product.title.toLowerCase().includes(searchQuery.toLowerCase())
          : false
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, allProducts]);

  // Close search dropdown and reset query when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setSearchOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/logout");
  };

  const handleProtectedClick = (path) => {
    if (!usertoken) {
      setShowLoginModal(true);
    } else {
      navigate(path);
    }
  };

  const firstLetter = userdata?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 w-full z-[60] bg-[#4b3b07] text-white text-center text-sm py-1 px-4">
        🎉 Free shipping on orders over ₹999!
      </div>

      {/* Main navbar */}
      <nav
        className={`fixed top-[28px] w-full z-50 px-4 sm:px-8 md:px-12 py-3 h-[80px] flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-[#cfbd8c] text-black shadow-md border-b border-black/10"
            : "bg-white/5 backdrop-blur-[99%] text-white border-b border-white/20"
        }`}
      >
        <div className="text-2xl font-bold tracking-wide">
          <NavLink to="/">ACHICHIZ.</NavLink>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-10 relative">
          {navItems.map((item, idx) => (
            <li
              key={item.title}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `uppercase text-sm font-bold transition duration-300 ${
                    isActive ? "text-[#915c50]" : "hover:text-[#915c50] "
                  }`
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-5 text-lg relative">
          <FiSearch
            className="cursor-pointer hover:text-[#915c50]"
            onClick={() => setSearchOpen((prev) => !prev)}
          />

          {usertoken && userdata?.name ? (
            <div className="relative">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold cursor-pointer"
                onClick={() => setProfileOpen((prev) => !prev)}
                title={userdata.name}
              >
                {firstLetter}
              </div>
              {profileOpen && (
                <div className="absolute top-10 right-0 bg-[#cfbd8c] shadow-md border p-3 w-40 rounded-md z-50 text-black">
                  <NavLink
                    to="/dashboard"
                    className="block text-sm hover:text-orange-500 mb-2"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <div
                    className="text-sm hover:text-orange-500 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <FiUser
              className="cursor-pointer hover:text-orange-500"
              onClick={() => setShowLoginModal(true)}
            />
          )}

          <div
            onClick={() => handleProtectedClick("/favoritespage")}
            className="relative cursor-pointer"
          >
            <FiHeart className="hover:text-red-500" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </div>

          <div
            onClick={() => handleProtectedClick("/cartpage")}
            className="relative cursor-pointer"
          >
            <FiShoppingCart className="hover:text-red-500" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="flex lg:hidden text-2xl cursor-pointer"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[#cfbd8c] text-black shadow-xl z-[999] transform ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="text-xl font-bold">ACHICHIZ.</div>
          <FiX
            className="text-2xl cursor-pointer"
            onClick={() => setMobileOpen(false)}
          />
        </div>

        <ul className="flex flex-col gap-4 p-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.path}
                className="text-lg font-medium hover:text-orange-500"
                onClick={() => setMobileOpen(false)}
              >
                {item.title}
              </NavLink>
            </li>
          ))}

          {usertoken && userdata?.name ? (
            <div className="mt-6 border-t pt-4">
              <div className="text-lg font-medium mb-2 flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold">
                  {firstLetter}
                </div>
                {userdata.name}
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <NavLink
                    to="/dashboard"
                    className="hover:text-orange-500"
                    onClick={() => setMobileOpen(false)}
                  >
                    Profile
                  </NavLink>
                </li>
                <li
                  className="hover:text-orange-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          ) : (
            <div
              className="mt-4 text-sm text-blue-600 underline cursor-pointer"
              onClick={() => {
                setShowLoginModal(true);
                setMobileOpen(false);
              }}
            >
              Login / Sign Up
            </div>
          )}
        </ul>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div
          ref={searchRef}
          className="absolute top-[108px] left-0 w-full z-40 px-4 sm:px-8 md:px-12"
        >
          <div
            className="max-w-3xl mx-auto rounded-md shadow-md border border-gray-300"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, categories..."
              className="w-full p-3 outline-none rounded-t-md text-gray-800 bg-white"
              autoFocus
            />
            {isLoading && (
              <div className="px-4 py-2 text-sm text-gray-700">Loading...</div>
            )}
            {!isLoading && searchQuery.trim() !== "" && filteredProducts.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-700">No products found</div>
            )}
            {!isLoading &&
              filteredProducts.map((product, idx) => (
                <div
                  key={product._id || idx}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => {
                    setSearchQuery(product.title);
                    setSearchOpen(false);
                    navigate(`/product/${product._id}`);
                  }}
                >
                  {/* Image */}
                  {product.images && product.images[0] && product.images[0].url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded" />
                  )}
                  {/* Title */}
                  <span>{product.title}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-4 text-gray-600 text-xl font-bold"
            >
              ×
            </button>
            <AuthPage
              onSuccess={() => {
                setShowLoginModal(false);
                window.dispatchEvent(new Event("storage"));
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
