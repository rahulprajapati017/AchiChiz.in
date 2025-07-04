// src/pages/Products.jsx
import React, { useState } from "react";
import { Download, FileText, Pencil, Trash, Eye, Upload } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Papa from "papaparse";

const initialProducts = [
  {
    id: "PRD001",
    name: "Handmade Clay Vase",
    category: "Home Decor",
    price: "₹799",
    stock: 24,
    status: "Active",
    image: "https://via.placeholder.com/60",
    description: "A beautifully handcrafted clay vase for your living room."
  },
  {
    id: "PRD002",
    name: "Jute Wall Hanging",
    category: "Wall Art",
    price: "₹1250",
    stock: 10,
    status: "Active",
    image: "https://via.placeholder.com/60",
    description: "Eco-friendly jute wall hanging crafted by rural artisans."
  },
  {
    id: "PRD003",
    name: "Bamboo Jewelry Box",
    category: "Accessories",
    price: "₹450",
    stock: 0,
    status: "Out of Stock",
    image: "https://via.placeholder.com/60",
    description: "Sustainable and elegant bamboo jewelry storage box."
  }
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditForm({ ...products[index] });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, image: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleSave = () => {
    const updated = [...products];
    updated[editingIndex] = editForm;
    setProducts(updated);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  const exportPDF = () => {
    const input = document.getElementById("products-table");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.text("Product Report", 10, 10);
      pdf.addImage(imgData, "PNG", 10, 20, pdfWidth - 20, imgHeight * 0.75);
      pdf.save("products-report.pdf");
    });
  };

  const exportCSV = () => {
    const csv = Papa.unparse(products);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Product Inventory</h2>
        <div className="flex gap-2">
          <button onClick={exportPDF} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            <FileText size={16} /> Export PDF
          </button>
          <button onClick={exportCSV} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto" id="products-table">
        <table className="min-w-full text-left text-sm border rounded">
          <thead>
            <tr className="bg-gray-100 border-b text-gray-600">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded" />
                  {editingIndex === index && (
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleChange}
                      className="mt-1"
                    />
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingIndex === index ? (
                    <input type="text" name="name" value={editForm.name} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
                  ) : (product.name)}
                </td>
                <td className="px-4 py-2">
                  {editingIndex === index ? (
                    <input type="text" name="category" value={editForm.category} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
                  ) : (product.category)}
                </td>
                <td className="px-4 py-2">
                  {editingIndex === index ? (
                    <input type="text" name="price" value={editForm.price} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
                  ) : (product.price)}
                </td>
                <td className="px-4 py-2">
                  {editingIndex === index ? (
                    <input type="number" name="stock" value={editForm.stock} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
                  ) : (product.stock)}
                </td>
                <td className="px-4 py-2">
                  {editingIndex === index ? (
                    <select name="status" value={editForm.status} onChange={handleChange} className="border px-2 py-1 rounded w-full">
                      <option>Active</option>
                      <option>Low Stock</option>
                      <option>Out of Stock</option>
                    </select>
                  ) : (product.status)}
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <button onClick={() => setSelectedProduct(product)} className="text-indigo-600 hover:text-indigo-800">
                    <Eye size={16} />
                  </button>
                  {editingIndex === index ? (
                    <button onClick={handleSave} className="text-blue-600 font-medium">Save</button>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(index)} className="text-gray-600 hover:text-blue-600">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700">
                        <Trash size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl relative">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-3 right-3 text-gray-600">✕</button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-24 h-24 rounded mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-center">{selectedProduct.name}</h3>
            <p className="text-sm text-gray-600 text-center mb-2">{selectedProduct.category}</p>
            <p className="text-sm text-gray-700 text-center">{selectedProduct.description}</p>
            <div className="mt-4 text-center">
              <span className="font-bold">Price:</span> {selectedProduct.price} <br />
              <span className="font-bold">Stock:</span> {selectedProduct.stock} <br />
              <span className="font-bold">Status:</span> {selectedProduct.status}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
