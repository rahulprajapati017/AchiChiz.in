import { useState } from "react";
import { demoProducts } from "../data/demo";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState(demoProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const navigate = useNavigate();

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = products.filter((p) => {
    return (
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())) &&
      (categoryFilter ? p.category === categoryFilter : true) &&
      (subcategoryFilter ? p.subcategory === subcategoryFilter : true)
    );
  });

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#0f2c5c]">All Products</h2>

        {/* Search and Filter */}
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded w-full md:w-1/3"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border px-4 py-2 rounded w-full md:w-1/4"
          >
            <option value="">All Categories</option>
            <option value="Wooden">Wooden</option>
            <option value="Bamboo">Bamboo</option>
            <option value="Metal">Metal</option>
          </select>

          <select
            value={subcategoryFilter}
            onChange={(e) => setSubcategoryFilter(e.target.value)}
            className="border px-4 py-2 rounded w-full md:w-1/4"
          >
            <option value="">All Subcategories</option>
            <option value="Decor">Decor</option>
            <option value="Utility">Utility</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white rounded-lg shadow-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">SubCategory</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{p.name}</td>
                  <td className="py-3 px-4">₹{p.price}</td>
                  <td
                    className={`py-3 px-4 ${
                      p.stock < 5 ? "text-red-500 font-semibold" : ""
                    }`}
                  >
                    {p.stock}
                  </td>
                  <td className="py-3 px-4 capitalize">{p.category}</td>
                  <td className="py-3 px-4 capitalize">{p.subcategory}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => navigate(`/add-product/${p.id}`)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-400">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
