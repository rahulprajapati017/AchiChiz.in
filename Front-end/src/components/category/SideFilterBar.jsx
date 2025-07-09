import React, { useEffect, useState } from 'react';
import { product } from '../../data/allapi';
import { useNavigate } from 'react-router-dom';

const PRICE_LIMIT = [0, 5000]; // default fallback

const SideFilterBar = ({ filters, onFilterChange, onReset }) => {
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    brands: [],
    colors: [],
    sizes: [],
    artisans: [],
    priceRange: PRICE_LIMIT,
  });
  const navigate=useNavigate()

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const res = await fetch(product.GET_ALL_PRODUCT);
        const data = await res.json();
        const products = data.data || [];

        const categories = [...new Set(products.map(p => p.category?.name).filter(Boolean))];
        const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
        const allColors = products.flatMap(p => p.color || []);
        const colors = [...new Set(allColors)];
        const allSizes = products.flatMap(p => p.size || []);
        const sizes = [...new Set(allSizes)];
        const artisans = [...new Set(products.map(p => p.artisan?.name).filter(Boolean))];
        const prices = products.map(p => p.price || 0);
        const priceRange = [
          Math.min(...prices, PRICE_LIMIT[0]),
          Math.max(...prices, PRICE_LIMIT[1]),
        ];

        setFilterOptions({
          categories,
          brands,
          colors,
          sizes,
          artisans,
          priceRange,
        });
      } catch (err) {
        console.error('Failed to load filter data:', err);
        navigate("/notfound")
        
      }
    };

    fetchFilterData();
  }, []);

  return (
    <div className="md:w-64 p-5 border-r border-gray-200 min-h-screen bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Filter By</h2>
        <button onClick={onReset} className="text-sm text-blue-700 hover:underline">Reset</button>
      </div>

      {/* Category */}
      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2">Category</h3>
        {filterOptions.categories.map((item, i) => (
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
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>₹{filterOptions.priceRange[0]}</span>
            <span>to</span>
            <span>₹{filters.priceMax || filterOptions.priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={filterOptions.priceRange[0]}
            max={filterOptions.priceRange[1]}
            value={filters.priceMax || filterOptions.priceRange[1]}
            onChange={e => onFilterChange('priceMax', parseInt(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>
      </div>

      {/* Brand */}
      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2">Brand</h3>
        {/* {filterOptions.brands.map((brand, i) => (
          <label key={i} className="block text-sm text-gray-700 mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.brand?.includes(brand)}
              onChange={() => onFilterChange('brand', brand)}
            />
            {brand}
          </label>
        ))} */}
        <button className="text-xs text-blue-700 mt-1">More</button>
      </div>

      {/* Color */}
      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          {filterOptions.colors.map((color, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div
                title={color}
                className={`w-6 h-6 rounded-full border-2 cursor-pointer transition 
                  ${filters.color.includes(color) ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-300'}`}
                style={{ backgroundColor: color }}
                onClick={() => onFilterChange('color', color)}
              ></div>
              <span className="text-xs text-gray-500 group-hover:underline">{color}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2">Size & Fit</h3>
        {filterOptions.sizes.map((size, i) => (
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

      {/* Artisan */}
    
    </div>
  );
};

export default SideFilterBar;
