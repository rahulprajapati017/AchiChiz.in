import React from 'react';

const categories = ['Sneakers & Sports Shoes', 'T-Shirts', 'Shorts & Skirts', 'Flip Flop & Slippers', 'Track Pants'];
const prices = ['Below ₹500', '₹500–1000', '₹1000–1500', '₹1500–2000', '₹2000–2500'];
const brands = ['SUTIE', 'COPPER', 'BANDQIT', 'ALFINE', 'CERE', 'DONNA RICCO'];
const colors = ['#7b2cbf', '#1e3a8a', '#16a34a', '#ca8a04', '#e11d48', '#000000', '#cccccc'];
const sizes = ['XS', 'S', 'M', 'L', '2XL'];

const SideFilterBar = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className="md:w-64  p-5 border-r border-gray-200 min-h-screen">
      <div className="flex justify-between items-center mb-6 w-full bg-white">
        <h2 className="text-xl font-semibold text-gray-800">Refine By</h2>
        <button
          onClick={onReset}
          className="text-sm text-blue-700 hover:underline"
        >
          Reset
        </button>
      </div>
      {/* Category */}
      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2">Category</h3>
        {categories.map((item, i) => (
          <label key={i} className="block text-sm text-gray-700 mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.category.includes(item)}
              onChange={() => onFilterChange('category', item)}
            />
            {item}
          </label>
        ))}
        <button className="text-xs text-blue-700 mt-1">More</button>
      </div>
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2">Price Range</h3>
        <div className="flex gap-2 mt-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 border text-sm px-2 py-1 rounded"
            value={filters.priceMin}
            onChange={e => onFilterChange('priceMin', e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 border text-sm px-2 py-1 rounded"
            value={filters.priceMax}
            onChange={e => onFilterChange('priceMax', e.target.value)}
          />
        </div>
      </div>
      {/* Brand */}
      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2">Brand</h3>
        {brands.map((brand, i) => (
          <label key={i} className="block text-sm text-gray-700 mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.brand.includes(brand)}
              onChange={() => onFilterChange('brand', brand)}
            />
            {brand}
          </label>
        ))}
        <button className="text-xs text-blue-700 mt-1">More</button>
      </div>
      {/* Color */}
      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color, i) => (
            <div
              key={i}
              className={`w-5 h-5 rounded-full border cursor-pointer ${filters.color.includes(color) ? 'ring-2 ring-blue-500' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onFilterChange('color', color)}
            ></div>
          ))}
        </div>
      </div>
      {/* Size & Fit */}
      <div>
        <h3 className="font-bold text-sm mb-2">Size & Fit</h3>
        {sizes.map((size, i) => (
          <label key={i} className="block text-sm text-gray-700 mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.size.includes(size)}
              onChange={() => onFilterChange('size', size)}
            />
            {size}
          </label>
        ))}
        <button className="text-xs text-blue-700 mt-1">More</button>
      </div>
    </div>
  );
};

export default SideFilterBar;
