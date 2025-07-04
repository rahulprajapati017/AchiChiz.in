import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import { useAuth } from "../context/AuthContext";
import AuthPage from "../components/Auth/AuthPage";

const navItems = [
  { title: "HOME", path: "/" },
  { title: "SHOP", path: "/category" },
  { title: "PRODUCTS", path: "/products" },
  { title: "BLOG", path: "/blog" },
  { title: "PAGE", path: "/about-us" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hovered, setHovered] = useState(null);

  const searchRef = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { favorites } = useFavorites();

  const searchHistory = ["Handmade Vase", "Terracotta Lamp", "Wooden Art"];
  const suggestions = ["Brass Decor", "Eco-Friendly Gifts", "Wall Hangings"];

  const isHome = pathname === "/";
  const glassEffect = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setSearchOpen(false);
    };

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    const updateLoginStatus = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("storage", updateLoginStatus);
    updateLoginStatus();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("storage", updateLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
  };

  const handleProtectedClick = (path) => {
    const user = localStorage.getItem("user");
    if (!user) {
      setShowLoginModal(true);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[60] bg-black text-white text-center text-sm py-1 px-4">
        🎉 Free shipping on orders over ₹999!
      </div>

      <nav
        className={`fixed top-[28px] w-full z-50 px-4 sm:px-8 md:px-12 py-3 h-[80px] flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-white text-black shadow-md border-b border-black/10"
            : "bg-white/5 backdrop-blur-[99%] text-white border-b border-white/20"
        }`}
      >
        <div className="text-2xl font-bold tracking-wide">ACHICHIZ.</div>

        <ul className="hidden lg:flex items-center gap-10 relative">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `uppercase text-sm font-bold transition duration-300 ${
                    isActive ? "text-[#AC604F]" : "hover:text-[#AC604F]"}`
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-5 text-lg relative">
          <FiSearch
            className="cursor-pointer hover:text-orange-500"
            onClick={() => setSearchOpen(!searchOpen)}
          />

          {isLoggedIn ? (
            <div className="relative group">
              <span className="cursor-pointer hover:text-orange-500 font-medium">
                {JSON.parse(localStorage.getItem("user"))?.name || "User"}
              </span>
              <div className="absolute top-6 right-0 hidden group-hover:block bg-white shadow-md border p-3 w-40 rounded-md z-50 text-black">
                <div
                  className="text-sm hover:text-orange-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </div>
                <div className="text-sm hover:text-orange-500 cursor-pointer mt-2">
                  <NavLink to="/dashboard">Profile</NavLink>
                </div>
                <div className="text-sm hover:text-orange-500 cursor-pointer mt-2">
                  <NavLink to="/Order-page">Order</NavLink>
                </div>
              </div>
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

        {/* Mobile Icons */}
        <div className="flex lg:hidden items-center gap-4 text-xl">
          <FiSearch
            className="cursor-pointer hover:text-orange-500"
            onClick={() => setSearchOpen(!searchOpen)}
          />
          <FiUser
            className="cursor-pointer hover:text-orange-500"
            onClick={() => setShowLoginModal(true)}
          />
          <div
            className="text-2xl cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </nav>

      {/* Search Panel */}
      {searchOpen && (
        <div
          ref={searchRef}
          className="absolute top-[108px] left-0 w-full z-40 px-4 sm:px-8 md:px-12"
        >
          <div className="max-w-3xl mx-auto bg-white rounded-md shadow-md border border-gray-300">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, categories..."
              className="w-full p-3 outline-none rounded-t-md text-gray-800"
              autoFocus
            />
            {searchQuery.length > 0 &&
              (searchQuery === "" ? searchHistory : suggestions)
                .filter((item) =>
                  item.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => {
                      setSearchQuery(item);
                      setSearchOpen(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
          </div>
        </div>
      )}

      {/* Login Modal */}
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
                setIsLoggedIn(true);
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
