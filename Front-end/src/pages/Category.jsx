import React, { useState, useEffect, useMemo } from 'react';
import AllProducts from "../components/category/AllProducts";
import SideFilterBar from "../components/category/SideFilterBar";
import TopBar from "../components/category/TopBar";
import { product } from "../data/allapi";

function Category() {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(product.APPROVED_PRODUCTS_FOR_HOME);
        const data = await res.json();
// console.log(data.data)
        // Check if API response contains array of products
        if (!Array.isArray(data.data)) {
          throw new Error("Invalid API response format. Expected 'data' to be an array.");
        }
        // console.log(data)

        // Normalize data
    const normalized = data.data.map((p, idx) => ({
  _id: p._id, // include original MongoDB _id
  id: p.id || idx, // optional fallback
  image: Array.isArray(p.images) ? p.images[0] : p.image,
  title: p.title,
  price: p.price,
  category: p.category?.name || 'Other',
  brand: p.brand || 'Other',
  color: p.specs?.Color || '#cccccc',
  size: p.size || 'M',
}));


        setApiProducts(normalized);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    let result = apiProducts.filter(product => {
      if (filters.category.length && !filters.category.includes(product.category)) return false;
      if (filters.brand.length && !filters.brand.includes(product.brand)) return false;
      if (filters.color.length && !filters.color.includes(product.color)) return false;
      if (filters.size.length && !filters.size.includes(product.size)) return false;
      if (filters.priceMin && product.price < Number(filters.priceMin)) return false;
      if (filters.priceMax && product.price > Number(filters.priceMax)) return false;
      return true;
    });

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
        result = result.slice().sort((a, b) => b.id - a.id);
        break;
      default:
        result = result.slice().sort((a, b) => b.price - a.price);
    }

    return result;
  }, [apiProducts, filters, sort]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-[110px]">
      {/* Sidebar */}
      <aside className="md:w-64 border-r border-gray-200">
        <SideFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <TopBar totalItems={filteredProducts.length} sort={sort} onSortChange={handleSortChange} />
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading products...</div>
        ) : filteredProducts.length > 0 ? (
          <AllProducts products={filteredProducts} />
        ) : (
          <div className="p-8 text-center text-gray-400">No products found with selected filters.</div>
        )}
      </main>
    </div>
  );
}

export default Category;
