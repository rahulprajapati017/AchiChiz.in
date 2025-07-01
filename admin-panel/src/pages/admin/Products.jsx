import React, { useState } from 'react';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

const dummyAdminProducts = [
  {
    id: 1,
    title: "Handcrafted Vase",
    price: 1499,
    stock: 20,
    category: "Home Decor",
    status: "Active",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    title: "Woolen Wall Hanging",
    price: 899,
    stock: 0,
    category: "Textiles",
    status: "Out of Stock",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    title: "Wooden Sculpture",
    price: 1899,
    stock: 10,
    category: "Sculptures",
    status: "Active",
    image: "https://via.placeholder.com/100",
  },
];

const AdminProducts = () => {
  const [search, setSearch] = useState("");

  const filtered = dummyAdminProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700">
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center border px-3 py-2 rounded-md w-full md:w-1/3">
          <Search className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        <select className="border px-4 py-2 rounded-md">
          <option value="">All Categories</option>
          <option value="Home Decor">Home Decor</option>
          <option value="Textiles">Textiles</option>
          <option value="Sculptures">Sculptures</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-auto border rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product, i) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">
                  <img src={product.image} alt="" className="h-12 w-12 rounded object-cover" />
                </td>
                <td className="px-4 py-3 font-medium">{product.title}</td>
                <td className="px-4 py-3">₹{product.price}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded ${product.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
