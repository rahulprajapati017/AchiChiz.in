import AllProducts  from "../components/category/AllProducts";
import  SideFilterBar  from "../components/category/SideFilterBar";
import  TopBar  from "../components/category/TopBar";
import React, { useState, useMemo } from 'react';
import { products as rawProducts } from '../data/products';

// Map products to expected structure for filtering and display
const allProducts = rawProducts.map((p, idx) => ({
  id: p.id || idx,
  image: Array.isArray(p.images) ? p.images[0] : p.image,
  title: p.title,
  price: p.price,
  category: p.category || 'Other',
  brand: p.brand || 'Other',
  color: p.specs?.Color || '#cccccc',
  size: p.size || 'M',
}));

function Category() {
  const [filters, setFilters] = useState({
    category: [],
    price: [],
    priceMin: '',
    priceMax: '',
    brand: [],
    color: [],
    size: [],
  });
  const [sort, setSort] = useState('highToLow');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      if (type === 'priceMin' || type === 'priceMax') {
        return { ...prev, [type]: value };
      }
      if (prev[type].includes(value)) {
        return { ...prev, [type]: prev[type].filter(v => v !== value) };
      } else {
        return { ...prev, [type]: [...prev[type], value] };
      }
    });
  };

  const handleReset = () => {
    setFilters({
      category: [],
      price: [],
      priceMin: '',
      priceMax: '',
      brand: [],
      color: [],
      size: [],
    });
  };

  const handleSortChange = (value) => {
    setSort(value);
  };

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter(product => {
      // Category
      if (filters.category.length && !filters.category.includes(product.category)) return false;
      // Brand
      if (filters.brand.length && !filters.brand.includes(product.brand)) return false;
      // Color
      if (filters.color.length && !filters.color.includes(product.color)) return false;
      // Size
      if (filters.size.length && !filters.size.includes(product.size)) return false;
      // Price range
      if (filters.priceMin && product.price < Number(filters.priceMin)) return false;
      if (filters.priceMax && product.price > Number(filters.priceMax)) return false;
      return true;
    });

    // Sort logic
    switch (sort) {
      case 'lowToHigh':
        result = result.slice().sort((a, b) => a.price - b.price);
        break;
      case 'highToLow':
        result = result.slice().sort((a, b) => b.price - a.price);
        break;
      case 'nameAZ':
        result = result.slice().sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameZA':
        result = result.slice().sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
        // For newest, we can sort by ID (assuming higher ID = newer)
        result = result.slice().sort((a, b) => b.id - a.id);
        break;
      default:
        // Default to high to low price
        result = result.slice().sort((a, b) => b.price - a.price);
    }
    
    return result;
  }, [filters, sort]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-[110px] relative">
      {/* Sidebar for desktop */}
      <aside className="hidden md:block md:w-64 border-r border-gray-200 ">
        <SideFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </aside>
      {/* Sidebar overlay for mobile */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            onClick={() => setIsFilterOpen(false)}
          />
          {/* Sidebar */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-lg animate-slideInLeft z-50">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close filters"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-4 pt-10">
              <SideFilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
              />
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <TopBar totalItems={filteredProducts.length} sort={sort} onSortChange={handleSortChange} onFilterToggle={() => setIsFilterOpen(true)} />
        <AllProducts products={filteredProducts} />
      </main>
      {/* Add slide-in animation */}
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
}

export default Category;

