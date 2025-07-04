import React, { useState, useEffect } from "react";
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
import AuthPage from "./Auth/AuthPage";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { pathname } = useLocation();
  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    const updateLoginStatus = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    updateLoginStatus();
    window.addEventListener("storage", updateLoginStatus);
    return () => window.removeEventListener("storage", updateLoginStatus);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProtectedClick = (path) => {
    const user = localStorage.getItem("user");
    if (!user) {
      setShowLoginModal(true);
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
  };

  const navItems = [
    { title: "HOME", path: "/" },
    { title: "SHOP", path: "/category" },
    { title: "PRODUCTS", path: "/products" },
    { title: "BLOG", path: "/blog" },
    { title: "PAGE", path: "/about-us" },
  ];

  const isHome = pathname === "/";
  const glassEffect = isHome && !scrolled;

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[60] bg-black text-white text-center text-sm py-1 px-4">
        🎉 Free shipping on orders over ₹999!
      </div>

      <nav
        className={`fixed top-[28px] w-full z-50 px-4 sm:px-8 md:px-12 py-3 h-[80px] flex items-center justify-between transition-all duration-300 ${
          glassEffect
            ? "bg-white/5 backdrop-blur-[99%] text-white border-b border-white/20"
            : "bg-white text-black shadow-md border-b border-black/10"
        }`}
      >
        <div className="text-2xl font-bold tracking-wide">ACHICHIZ.</div>

        <ul className="hidden lg:flex items-center gap-10 relative">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `uppercase text-sm font-semibold transition duration-300 ${
                    isActive ? "text-orange-500" : "hover:text-orange-400"
                  }`
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-5 text-lg relative">
          <div className="relative">
            <FiSearch
              className="cursor-pointer hover:text-orange-500"
              onClick={() => setShowSearch(!showSearch)}
            />
            {showSearch && (
              <div className="absolute top-[-7px] right-0 z-40">
                <input
                  type="text"
                  placeholder="Search..."
                  autoFocus
                  className="bg-white text-black border px-3 py-1 rounded-md w-52 text-sm shadow-lg"
                  onBlur={() => setShowSearch(false)}
                />
              </div>
            )}
          </div>

          {isLoggedIn ? (
            <div className="relative group">
              <span className="cursor-pointer hover:text-orange-500 font-medium">
                {JSON.parse(localStorage.getItem("user"))?.name || "User"}
              </span>
              <div className="absolute top-6 right-0 hidden group-hover:block bg-white text-black shadow-md border p-3 w-40 rounded-md z-50">
                <div
                  className="text-sm hover:text-orange-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
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

        <div className="flex lg:hidden items-center gap-4 text-xl">
          <FiSearch
            className="cursor-pointer hover:text-orange-500"
            onClick={() => setShowSearch(!showSearch)}
          />
          <div
            className="text-2xl cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </nav>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
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
                window.dispatchEvent(new Event("storage")); // 🔁
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
