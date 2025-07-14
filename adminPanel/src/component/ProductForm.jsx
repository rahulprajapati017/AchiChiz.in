import React, { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const defaultProduct = {
  title: "",
  price: "",
  discount: "",
  category: "",
  images: [],
  features: [],
  specs: {},
  faqs: [],
};

const ProductForm = ({ isOpen, onClose, onSave, product = null }) => {
  const [formData, setFormData] = useState(defaultProduct);
  const [newFeature, setNewFeature] = useState({ icon: "", title: "" });
  const [newSpec, setNewSpec] = useState({ key: "", value: "" });
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData(defaultProduct);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...urls],
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.icon && newFeature.title) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature],
      }));
      setNewFeature({ icon: "", title: "" });
    }
  };

  const handleAddSpec = () => {
    if (newSpec.key && newSpec.value) {
      setFormData((prev) => ({
        ...prev,
        specs: { ...prev.specs, [newSpec.key]: newSpec.value },
      }));
      setNewSpec({ key: "", value: "" });
    }
  };

  const handleAddFaq = () => {
    if (newFaq.question && newFaq.answer) {
      setFormData((prev) => ({
        ...prev,
        faqs: [...prev.faqs, newFaq],
      }));
      setNewFaq({ question: "", answer: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded shadow-xl p-6 overflow-y-auto max-h-[90vh] relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">{product ? "Edit Product" : "Add New Product"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
           
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product Title"
              className="border p-2 rounded w-full"
              required
            />
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              placeholder="Price"
              className="border p-2 rounded w-full"
              required
            />
            <input
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              type="number"
              placeholder="Discount (%)"
              className="border p-2 rounded w-full"
            />
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="border p-2 rounded w-full"
              required
            />
          </div>

          
          <div>
            <label className="font-medium text-sm">Product Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="block mt-2"
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {formData.images.map((img, i) => (
                <img key={i} src={img} alt={`img-${i}`} className="w-16 h-16 object-cover rounded border" />
              ))}
            </div>
          </div>

          
          <div>
            <label className="font-medium text-sm">Features</label>
            <div className="flex gap-2 mt-2">
              <input
                value={newFeature.icon}
                onChange={(e) => setNewFeature({ ...newFeature, icon: e.target.value })}
                placeholder="Icon name (e.g. Star)"
                className="border p-2 rounded w-1/2"
              />
              <input
                value={newFeature.title}
                onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
                placeholder="Feature title"
                className="border p-2 rounded w-1/2"
              />
              <button type="button" onClick={handleAddFeature} className="text-green-600 hover:text-green-800">
                <Plus />
              </button>
            </div>
          </div>

         
          <div>
            <label className="font-medium text-sm">Specifications</label>
            <div className="flex gap-2 mt-2">
              <input
                value={newSpec.key}
                onChange={(e) => setNewSpec({ ...newSpec, key: e.target.value })}
                placeholder="Spec name"
                className="border p-2 rounded w-1/2"
              />
              <input
                value={newSpec.value}
                onChange={(e) => setNewSpec({ ...newSpec, value: e.target.value })}
                placeholder="Spec value"
                className="border p-2 rounded w-1/2"
              />
              <button type="button" onClick={handleAddSpec} className="text-green-600 hover:text-green-800">
                <Plus />
              </button>
            </div>
          </div>

          
          <div>
            <label className="font-medium text-sm">FAQs</label>
            <div className="flex gap-2 mt-2 flex-col sm:flex-row">
              <input
                value={newFaq.question}
                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                placeholder="Question"
                className="border p-2 rounded w-full"
              />
              <input
                value={newFaq.answer}
                onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                placeholder="Answer"
                className="border p-2 rounded w-full"
              />
              <button type="button" onClick={handleAddFaq} className="text-green-600 hover:text-green-800">
                <Plus />
              </button>
            </div>
          </div>

          
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              {product ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
