import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";

const navItems = [
  { title: "HOME", path: "/", dropdown: [] },
  {
    title: "SHOP",
    path: "/shop",
    dropdown: [
      "Shop Style", "Shop Standard", "Shop Full", "Shop Only Categories",
      "Shop Icon Categories", "Shop Image Categories", "Shop Image Categories 2",
      "Shop Sub Categories", "Shop List", "Filter Layout", "Sidebar",
      "Filter Side Out", "Filter Dropdown", "Filter On Top", "Filter Drawer",
      "Woo Pages", "Order Tracking", "Login", "Wishlist", "Compare",
      "Hover Style", "Icons On Hover", "Quick View Button", "Add to cart Button",
      "Wishlists Icon", "Quick Shop Light", "Add to Basket", "Shop Loader",
      "Shop Pagination", "Shop Infinity", "Shop Load More", "Mini Cart",
      "Side Out Light", "Side Out Dark", "Dropdown", "Cart Page",
      "Checkout Style", "Checkout Classic", "Checkout Mordern"
    ]
  },
  {
    title: "PRODUCTS",
    path: "/products",
    dropdown: [
      "Product Featured", "Sticky add to cart", "Video Inner", "Video Popup", "360 Degree",
      "Countdown", "Buy Together", "Notify Me", "Real Time Visitor",
      "Products Recently Viewed", "Trust Badge", "Pre-order Product",
      "Low Stock Notice", "Product Type", "Simple Product", "Simple Slider",
      "Group Product", "Variable Color Product", "Variable Image Product",
      "Variant Group Image", "External & Affiliate Product", "Sold Out", "Zoom Effect",
      "Autozoom", "Lens zoom", "Magic zoom", "Product Gallery", "Gird Sticky",
      "Gird Mix", "One Column", "Grid 2 Columns", "Slider", "Lagre Gallery",
      "Left Thumbnail", "Right Thumbnail", "Bottom Thumbnail", "Outside Thumbnail",
      "Product Styles", "Clean", "Modern", "Full Width", "Background Color",
      "Description Style", "Description Tab", "Description Accordion",
      "Description Full Content", "Description Vertical"
    ]
  },
  {
    title: "BLOG",
    path: "/blog",
    dropdown: [
      "Blog layout", "Blog Left Sidebar", "Blog Right Sidebar", "Blog Without Sidebar",
      "Blog style", "Blog List", "Blog Grid", "Blog Card", "Blog Modern", "Blog Standar",
      "Blog format", "Post format gallery", "Post format video", "Post format audio",
      "Post layout", "Sidebar", "One Column", "Prallax Image", "Simple Title",
      "Sticky Title", "Recent Post", "Choosing Handcrafted Over Mass-Produced",
      "April 3, 2024", "Celebrating the Artistry of Handicrafts",
      "April 2, 2024", "Handmade Marvels for a Personal Touch", "March 8, 2024"
    ]
  },
  { title: "PAGE", path: "/page", dropdown: [] },
];

export default function Header() {
  const [hovered, setHovered] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hoverTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (idx) => {
    clearTimeout(hoverTimeout.current);
    setHovered(idx);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHovered(null);
    }, 100);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 sm:px-12 py-4 h-[80px] flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-white text-black shadow-md border-b border-black/10"
          : "bg-transparent text-white border-b border-white/30"
      }`}
    >
      <div className="text-2xl font-bold tracking-wide">ACHICHIZ.</div>

      {/* Desktop Nav */}
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
              <div className="absolute top-full left-0 mt-2 w-[600px] max-h-[400px] overflow-y-auto bg-white text-black shadow-xl rounded-md p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 transition-all duration-1000 ease-out scale-100 origin-top z-20">
                {item.dropdown.map((option, i) => (
                  <div
                    key={i}
                    className="hover:text-orange-600 cursor-pointer text-sm transition duration-1000"
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
        <div className="relative">
          <FiHeart className="cursor-pointer hover:text-orange-500 transition duration-300" />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
        </div>
        <div className="relative">
          <FiShoppingCart className="cursor-pointer hover:text-orange-500 transition duration-300" />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
        </div>
      </div>

      {/* Mobile menu icon */}
      <div className="lg:hidden text-2xl cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <FiX /> : <FiMenu />}
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white text-black shadow-xl z-50 transform ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="text-xl font-bold">ACHICHIZ</div>
          <FiX className="text-2xl cursor-pointer" onClick={() => setMobileOpen(false)} />
        </div>

        <ul className="flex flex-col gap-4 p-6">
          {navItems.map((item, idx) => (
            <li key={idx} className="border-b pb-2">
              <div className="flex justify-between items-center">
                <NavLink
                  to={item.path}
                  className="text-lg font-medium text-black hover:text-orange-500"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.title}
                </NavLink>
                {item.dropdown.length > 0 && (
                  <FiChevronDown
                    className="ml-2 cursor-pointer"
                    onClick={() =>
                      setOpenDropdown(openDropdown === idx ? null : idx)
                    }
                  />
                )}
              </div>
              {openDropdown === idx && item.dropdown.length > 0 && (
                <ul className="mt-2 pl-4 space-y-1 text-sm text-gray-700 transition-all duration-1000 ease-in-out">
                  {item.dropdown.slice(0, 8).map((sub, i) => (
                    <li
                      key={i}
                      className="hover:text-orange-500 transition duration-1000"
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
