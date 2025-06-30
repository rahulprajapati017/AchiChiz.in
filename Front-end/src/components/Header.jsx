import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
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

const navItems = [
  { title: "HOME", path: "/", dropdown: [] },
  {
    title: "SHOP",
    path: "/shop",
    dropdown: ["Shop Style", "Shop Standard", "Shop Full", "Shop List"],
  },
  {
    title: "PRODUCTS",
    path: "/products",
    dropdown: ["Simple Product", "Variable Product", "Zoom Effect"],
  },
  {
    title: "BLOG",
    path: "/blog",
    dropdown: ["Blog List", "Blog Grid", "Blog Modern"],
  },
  { title: "PAGE", path: "/page", dropdown: [] },
];

export default function Header() {
  const [hovered, setHovered] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cartItems } = useCart();
  const { favorites } = useFavorites();

  // Scroll effect for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 sm:px-12 py-4 h-[80px] flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-white text-black shadow-md border-b border-black/10"
          : "bg-white/20 backdrop-blur-md text-white border-b border-white/30"
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
                `uppercase text-sm font-semibold transition duration-300 ${
                  isActive ? "text-orange-500" : "hover:text-orange-400"
                }`
              }
            >
              {item.title}
            </NavLink>
            {hovered === idx && item.dropdown.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-[300px] max-h-[300px] overflow-y-auto bg-white text-black shadow-xl rounded-md p-4 grid grid-cols-1 gap-2 z-30">
                {item.dropdown.map((option, i) => (
                  <div
                    key={i}
                    className="hover:text-orange-600 cursor-pointer text-sm transition duration-300"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Icons */}
      <div className="hidden lg:flex items-center gap-6 text-lg relative">
        {/* Search */}
        <div className="relative">
          {showSearch ? (
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="absolute top-0 right-0 bg-white text-black border px-3 py-1 rounded-md w-48 text-sm shadow-md"
              onBlur={() => setShowSearch(false)}
            />
          ) : (
            <FiSearch
              className="cursor-pointer hover:text-orange-500 transition duration-300"
              onClick={() => setShowSearch(true)}
            />
          )}
        </div>

        <FiUser className="cursor-pointer hover:text-orange-500 transition duration-300" />

        {/* Favorites */}
        <NavLink to="/favoritespage" className="relative">
          <FiHeart className="cursor-pointer hover:text-red-500 transition duration-300" />
          {favorites.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {favorites.length}
            </span>
          )}
        </NavLink>

        {/* Cart */}
        <NavLink to="/cartpage" className="relative">
          <FiShoppingCart className="cursor-pointer hover:text-red-500 transition duration-300" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </NavLink>
      </div>

      {/* Mobile Menu Toggle */}
      <div
        className="lg:hidden text-2xl cursor-pointer"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <FiX /> : <FiMenu />}
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white text-black shadow-xl z-[999] transform ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="text-xl font-bold">ACHICHIZ</div>
          <FiX
            className="text-2xl cursor-pointer"
            onClick={() => setMobileOpen(false)}
          />
        </div>

        <ul className="flex flex-col gap-4 p-6">
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
                  {item.dropdown.map((sub, i) => (
                    <li
                      key={i}
                      className="hover:text-orange-500 transition duration-300"
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
