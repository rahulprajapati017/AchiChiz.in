import React, { useEffect, useState } from 'react';
import SideFilterBar from './SideFilterBar';
import { product } from '../../data/allapi'; // adjust path as needed

const ProductPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    size: [],
    color: [],
    priceMax: 5000,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(product.GET_ALL_PRODUCT);
        const data = await res.json();
        const products = data.data || [];
        setAllProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...allProducts];

      // Category filter
      if (filters.category.length > 0) {
        filtered = filtered.filter((item) =>
          filters.category.includes(item.category?.name)
        );
      }

      // Size filter
      if (filters.size.length > 0) {
        filtered = filtered.filter((item) =>
          item.size?.some((s) => filters.size.includes(s))
        );
      }

      // Color filter
      if (filters.color.length > 0) {
        filtered = filtered.filter((item) =>
          item.color?.some((c) => filters.color.includes(c))
        );
      }

      // Price filter
      filtered = filtered.filter((item) => item.price <= filters.priceMax);

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [filters, allProducts]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === 'category' || type === 'size' || type === 'color') {
        const values = prev[type] || [];
        const updatedValues = values.includes(value)
          ? values.filter((v) => v !== value)
          : [...values, value];
        return { ...prev, [type]: updatedValues };
      }

      // For single values like priceMax
      return { ...prev, [type]: value };
    });
  };

  const handleResetFilters = () => {
    setFilters({
      category: [],
      size: [],
      color: [],
      priceMax: 5000,
    });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Product List */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>

        {filteredProducts.length === 0 ? (
          <p>No products match the selected filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.category?.name}</p>
                <p className="font-bold text-orange-600 mt-2">₹{item.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
