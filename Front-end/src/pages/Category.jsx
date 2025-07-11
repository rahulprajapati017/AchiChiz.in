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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(product.GET_ALL_PRODUCT);
        const data = await res.json();
console.log(data)
        if (!Array.isArray(data.data)) throw new Error("Invalid response");

        const normalized = data.data.map((p, idx) => ({
          _id: p._id,
          id: p.id || idx,
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
      } catch (err) {
        console.error("Failed to fetch:", err);
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
        return result.slice().sort((a, b) => a.price - b.price);
      case 'highToLow':
        return result.slice().sort((a, b) => b.price - a.price);
      case 'nameAZ':
        return result.slice().sort((a, b) => a.title.localeCompare(b.title));
      case 'nameZA':
        return result.slice().sort((a, b) => b.title.localeCompare(a.title));
      case 'newest':
        return result.slice().sort((a, b) => b.id - a.id);
      default:
        return result;
    }
  }, [apiProducts, filters, sort]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      {/* Sidebar */}
      <aside className="hidden md:block md:w-64 border-r border-gray-200">
        <div className="sticky top-4">
          <SideFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <TopBar
          totalItems={filteredProducts.length}
          sort={sort}
          onSortChange={handleSortChange}
          onFilterToggle={() => {}}
        />
        <AllProducts products={filteredProducts} />
      </main>
    </div>
  );
}

export default Category;