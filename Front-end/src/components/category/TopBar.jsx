import React from "react";
import { FaThLarge, FaBars } from "react-icons/fa";

const TopBar = ({ totalItems = 51732, sort = 'highToLow', onSortChange }) => {
  return (
    <div className="py-4 px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 bg-white">
      {/* Left Section - View Icons and Items Count */}
      <div className="flex items-center justify-between w-full sm:w-auto mb-3 sm:mb-0">
        {/* View Icons */}
        <div className="text-gray-400">
          <button className="hover:text-black p-2">
            <FaBars size={16} />
          </button>
        </div>

        {/* Total Items - Mobile */}
        <div className="text-sm font-semibold text-gray-800 sm:hidden">
          {totalItems.toLocaleString()} ITEMS
        </div>
      </div>

      {/* Total Items - Desktop */}
      <div className="text-sm font-semibold text-gray-800 hidden sm:block">
        {totalItems.toLocaleString()} ITEMS FOUND
      </div>

      {/* Right Section - Sort and View Options */}
      <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
        {/* Sort Dropdown */}
        <select
          className="border border-gray-300 rounded-sm px-2 md:px-4 py-2 text-xs md:text-sm text-gray-800 bg-white flex-1 sm:flex-none min-w-[140px] md:min-w-[180px]"
          value={sort}
          onChange={e => onSortChange && onSortChange(e.target.value)}
        >
          <option value="lowToHigh">PRICE (LOW TO HIGH)</option>
          <option value="highToLow">PRICE (HIGH TO LOW)</option>
          <option value="newest">NEWEST FIRST</option>
          <option value="nameAZ">NAME (A-Z)</option>
          <option value="nameZA">NAME (Z-A)</option>
        </select>

        {/* View Icons */}
        <div className="text-gray-400">
          <button className="text-[#0a2240] font-bold p-2 hover:bg-gray-100 rounded">
            <FaThLarge size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
