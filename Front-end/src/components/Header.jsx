import React, { useState, useEffect, useContext } from "react";
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
import AuthPage from "./Auth/Authpage";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";

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
  const [profileOpen, setProfileOpen] = useState(false);

  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const { logout, userdata, usertoken } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);
  const firstLetter = userdata?.name?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/logout");
  };

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
              key={item.title}
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
                  {item.dropdown.map((section) => (
                    <div key={section.title} className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-700">
                        {section.title}
                      </h4>
                      <ul className="pl-2 mt-1 space-y-1">
                        {section.items.map((sub) => (
                          <li
                            key={`${section.title}-${sub}`}
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

          {usertoken && userdata?.name ? (
            <div className="relative inline-block">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold cursor-pointer select-none"
                onClick={() => setProfileOpen(!profileOpen)}
                title={userdata.name}
              >
                {firstLetter}
              </div>

              {profileOpen && (
                <div className="absolute top-10 right-0 bg-white shadow-md border p-3 w-40 rounded-md z-50 text-black">
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

        {/* Mobile Drawer */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white text-black shadow-xl z-[999] transform ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500 ease-in-out`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <div className="text-xl pt-3 font-bold">ACHICHIZ</div>
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
                  className="text-lg font-medium text-black hover:text-orange-500"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.title}
                </NavLink>
                {item.dropdown.length > 0 && (
                  <ul className="mt-2 pl-4 space-y-1 text-sm text-gray-700">
                    {item.dropdown.map((section) =>
                      section.items.map((sub) => (
                        <li
                          key={`${section.title}-${sub}`}
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
                  setShowAuthPopup(true);
                  setMobileOpen(false);
                }}
              >
                Login / Sign Up
              </div>
            )}
          </ul>
        </div>

        {/* Mobile Icons */}
        <div className="flex lg:hidden items-center gap-4 text-xl">
          <NavLink to="/searchpage">
            <FiSearch className="cursor-pointer hover:text-orange-500" />
          </NavLink>

          {usertoken && userdata?.name ? (
            <div
              className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold cursor-pointer select-none"
              onClick={() => setShowAuthPopup(true)}
              title={userdata.name}
            >
              {firstLetter}
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
      </nav>

      {/* Auth Modal */}
      {showAuthPopup && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative p-6">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-black text-2xl font-bold"
              onClick={() => setShowAuthPopup(false)}
              aria-label="Close Authentication Modal"
            >
              ×
            </button>
            <AuthPage onSuccess={() => setShowAuthPopup(false)} />
          </div>
        </div>
      )}
    </>
  );
}
