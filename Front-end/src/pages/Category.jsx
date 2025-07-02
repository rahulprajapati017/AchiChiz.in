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
    <div className="flex flex-col md:flex-row min-h-screen pt-[110px]">
      {/* Sidebar */}
      <aside className="md:w-64 border-r border-gray-200 ">
        <SideFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <TopBar totalItems={filteredProducts.length} sort={sort} onSortChange={handleSortChange} />
        <AllProducts products={filteredProducts} />
      </main>
    </div>
  );
}

export default Category;

