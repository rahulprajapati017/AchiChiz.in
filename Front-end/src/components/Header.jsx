import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import AuthPage from "../components/Auth/AuthPage";

const navItems = [
  { title: "HOME", path: "/", dropdown: [] },
  {
    title: "SHOP",
    path: "/category",
    dropdown: [
      {
        title: "Style",
        items: ["Classic", "Minimal", "Contemporary"],
      },
      {
        title: "Layouts",
        items: ["Standard", "Full Width", "List View"],
      },
    ],
  },
  {
    title: "PRODUCTS",
    path: "/products",
    dropdown: [
      {
        title: "Product Types",
        items: ["Simple Product", "Variable Product", "Grouped Product"],
      },
      {
        title: "Features",
        items: ["Zoom", "Image Slider", "Custom Tabs"],
      },
    ],
  },
  { title: "BLOG", path: "/blog", dropdown: [] },
  { title: "PAGE", path: "/about-us", dropdown: [] },
];

export default function Header() {
  const [hovered, setHovered] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { pathname } = useLocation();
  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);

  return (
    <>
      {/* Notification Bar */}
      <div className="fixed top-0 left-0 w-full z-[60] bg-black text-white text-center text-sm py-1 px-4">
        🎉 Free shipping on orders over ₹999!
      </div>

      {/* Navbar */}
      <nav
        className={`fixed top-[28px] w-full z-50 px-4 sm:px-8 md:px-12 py-3 h-[80px] flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-white text-black shadow-md border-b border-black/10"
            : "bg-white/5 backdrop-blur-[99%] text-white border-b border-white/20"
        }`}
      >
        <div className="text-2xl font-bold tracking-wide">ACHICHIZ.</div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-10 relative">
          {navItems.map((item, idx) => (
            <li
              key={idx}
              className="relative"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `uppercase text-sm font-bold transition duration-300 ${
                    isActive ? "text-[#AC604F]" : "hover:text-[#AC604F]"
                  }`
                }
              >
                {item.title}
              </NavLink>

              {hovered === idx && item.dropdown.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-[280px] bg-white text-black shadow-xl rounded-md p-4 z-30">
                  {item.dropdown.map((section, secIdx) => (
                    <div key={secIdx} className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-700">
                        {section.title}
                      </h4>
                      <ul className="pl-2 mt-1 space-y-1">
                        {section.items.map((sub, subIdx) => (
                          <li
                            key={subIdx}
                            className="text-sm text-gray-600 hover:text-orange-600 cursor-pointer"
                          >
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-5 text-lg relative">
          <NavLink to="/searchpage">
            <FiSearch className="cursor-pointer hover:text-orange-500" />
          </NavLink>

          {user ? (
            <div className="relative group">
              <span className="cursor-pointer hover:text-orange-500 font-medium">
                {user.name}
              </span>
              <div className="absolute top-6 right-0 hidden group-hover:block bg-white shadow-md border p-3 w-40 rounded-md z-50 text-black">
                <div
                  className="text-sm hover:text-orange-500 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </div>
                <div className="text-sm hover:text-orange-500 cursor-pointer mt-2">
                  <NavLink to="/dashboard">Profile</NavLink>
                </div>
              </div>
            </div>
          ) : (
            <FiUser
              className="cursor-pointer hover:text-orange-500"
              onClick={() => setShowAuthPopup(true)}
            />
          )}

          <NavLink to="/favoritespage" className="relative">
            <FiHeart className="cursor-pointer hover:text-red-500" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </NavLink>

          <NavLink to="/cartpage" className="relative">
            <FiShoppingCart className="cursor-pointer hover:text-red-500" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </NavLink>
        </div>

        {/* Mobile Icons */}
        <div className="flex lg:hidden items-center gap-4 text-xl">
          <NavLink to="/searchpage">
            <FiSearch className="cursor-pointer hover:text-orange-500" />
          </NavLink>

          <FiUser
            className="cursor-pointer hover:text-orange-500"
            onClick={() => setShowAuthPopup(true)}
          />

          <NavLink to="/favoritespage" className="relative">
            <FiHeart className="cursor-pointer hover:text-red-500" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </NavLink>

          <NavLink to="/cartpage" className="relative">
            <FiShoppingCart className="cursor-pointer hover:text-red-500" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </NavLink>

          <div
            className="text-2xl cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white text-black shadow-xl z-[999] transform ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500 ease-in-out`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <div className="text-xl pt-3 font-bold">ACHICHIZ</div>
            <FiX
              className="text-2xl pt-1 mt-2 cursor-pointer"
              onClick={() => setMobileOpen(false)}
            />
          </div>

          <ul className="flex flex-col gap-4 p-6 overflow-y-auto max-h-[calc(100vh-140px)]">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.path}
                  className="text-lg font-medium text-black hover:text-orange-500"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.title}
                </NavLink>
                {item.dropdown.length > 0 && (
                  <ul className="mt-2 pl-4 space-y-1 text-sm text-gray-700">
                    {item.dropdown.flatMap((section) =>
                      section.items.map((sub, i) => (
                        <li
                          key={i}
                          className="hover:text-orange-500 transition duration-300"
                        >
                          {sub}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </li>
            ))}

            {/* Mobile Profile/Login Section */}
            {user ? (
              <div className="mt-6 border-t pt-4">
                <div className="text-lg font-medium mb-2">Hello, {user.name}</div>
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
                    className="cursor-pointer hover:text-orange-500"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            ) : (
              <div
                className="mt-4 text-sm text-blue-600 underline cursor-pointer"
                onClick={() => {
                  setShowAuthPopup(true);
                  setMobileOpen(false);
                }}
              >
                Login / Sign Up
              </div>
            )}
          </ul>
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthPopup && (
        <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-black"
              onClick={() => setShowAuthPopup(false)}
            >
              ✕
            </button>
            <AuthPage onSuccess={() => setShowAuthPopup(false)} />
          </div>
        </div>
      )}
    </>
  );
}
