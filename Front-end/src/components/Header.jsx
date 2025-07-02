<<<<<<< HEAD
import React, { useState, useRef, useEffect } from "react";
import { NavLink , useLocation} from "react-router-dom";

=======
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
>>>>>>> refs/remotes/origin/main
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import AuthPage from "./Auth/AuthPage";

// Dummy cart/fav context (replace with actual)
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";

// Modern dropdown navItems
const navItems = [
  { title: "HOME", path: "/", dropdown: [] },
  {
    title: "SHOP",
<<<<<<< HEAD
    path: "category",
    dropdown: ["Shop Style", "Shop Standard", "Shop Full", "Shop List"],
=======
    path: "/shop",
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
>>>>>>> refs/remotes/origin/main
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
  { title: "PAGE", path: "/page", dropdown: [] },
];

export default function Header() {
  const [hovered, setHovered] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { pathname } = useLocation();
  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const glassEffect = isHome && !scrolled;

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
          glassEffect
            ? "bg-white/5 backdrop-blur-[99%] text-white border-b border-white/20"
            : "bg-white text-black shadow-md border-b border-black/10"
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

              {/* Modern Dropdown */}
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

          {/* Auth logic */}
          {user ? (
            <div className="relative group">
              <span className="cursor-pointer hover:text-orange-500 font-medium">
                {user.name}
              </span>
              <div className="absolute top-6 right-0 hidden group-hover:block bg-white shadow-md border p-3 w-40 rounded-md z-50">
                <div
                  className="text-sm hover:text-orange-500 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </div>
                <div className="text-sm hover:text-orange-500 cursor-pointer mt-2">
                  Profile
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
          <FiSearch
            className="cursor-pointer hover:text-orange-500"
            onClick={() => setShowSearch(!showSearch)}
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

          {showSearch && (
            <div className="pb-3 px-4 border-b">
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                className="w-full px-4 py-2 border rounded-md text-sm shadow"
                onBlur={() => setShowSearch(false)}
              />
            </div>
          )}

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
          </ul>
        </div>
      </nav>

      {/* Auth Popup Modal */}
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
