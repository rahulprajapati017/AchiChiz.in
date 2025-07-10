// src/pages/AddProduct.jsx
import { useEffect, useState } from "react";
import { demoProducts } from "../data/demo";
import Layout from "../components/Layout";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState(demoProducts);
  const [editMode, setEditMode] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    subcategory: "",
    stock: "",
    artisan: "",
    material: "",
    description: "",
    handmade: false,
    images: [],
    video: "",
    features: [{ icon: "", text: "" }],
    specifications: [""],
  });

  useEffect(() => {
    if (id) {
      const existing = demoProducts.find((p) => p.id === id);
      if (existing) {
        setProduct(existing);
        setEditMode(true);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImageURLs = files.map((file) => URL.createObjectURL(file));
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...newImageURLs],
    }));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, video: URL.createObjectURL(file) });
    }
  };

  const handleFeatureChange = (index, key, value) => {
    const newFeatures = [...product.features];
    newFeatures[index][key] = value;
    setProduct({ ...product, features: newFeatures });
  };

  const addFeature = () => {
    setProduct({
      ...product,
      features: [...product.features, { icon: "", text: "" }],
    });
  };

  const removeFeature = (index) => {
    const newFeatures = [...product.features];
    newFeatures.splice(index, 1);
    setProduct({ ...product, features: newFeatures });
  };

  const handleSpecChange = (index, value) => {
    const newSpecs = [...product.specifications];
    newSpecs[index] = value;
    setProduct({ ...product, specifications: newSpecs });
  };

  const addSpec = () => {
    setProduct({
      ...product,
      specifications: [...product.specifications, ""],
    });
  };

  const removeSpec = (index) => {
    const newSpecs = [...product.specifications];
    newSpecs.splice(index, 1);
    setProduct({ ...product, specifications: newSpecs });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: editMode ? id : Date.now().toString(),
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
    };

    if (editMode) {
      const updatedList = products.map((p) => (p.id === id ? updatedProduct : p));
      setProducts(updatedList);
      alert("✅ Product updated successfully");
    } else {
      setProducts([...products, updatedProduct]);
      alert("✅ Product added successfully");
    }

    navigate("/products");
  };

  return (
    <Layout>
      <div className="space-y-6 ml-20">
        <h2 className="text-4xl font-bold text-[#0f2c5c]">
          {editMode ? "Edit Product" : "Add New Product"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl bg-white p-6 rounded shadow"
        >
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            placeholder="Product Title"
            className="border rounded px-4 py-2"
          />
          <input
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            placeholder="Price"
            type="number"
            className="border rounded px-4 py-2"
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2"
          >
            <option value="">Select Category</option>
            <option value="Wooden">Wooden</option>
            <option value="Bamboo">Bamboo</option>
            <option value="Metal">Metal</option>
          </select>

          <select
            name="subcategory"
            value={product.subcategory}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2"
          >
            <option value="">Select Sub-Category</option>
            <option value="Decor">Decor</option>
            <option value="Utility">Utility</option>
          </select>

          <input
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
            placeholder="Stock"
            type="number"
            className="border rounded px-4 py-2"
          />
          <input
            name="artisan"
            value={product.artisan}
            onChange={handleChange}
            placeholder="Artisan Name"
            className="border rounded px-4 py-2"
          />
          <input
            name="material"
            value={product.material}
            onChange={handleChange}
            placeholder="Material Used"
            className="border rounded px-4 py-2"
          />

          {/* Upload Video Section */}
          <div className="col-span-2">
            <label className="block font-medium mb-1">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="border rounded px-4 py-2 w-full"
            />
            {product.video && (
              <div className="mt-2">
                <p className="font-medium text-gray-700">Uploaded Video:</p>
                <video
                  src={product.video}
                  controls
                  className="w-full max-w-md mt-2 rounded"
                />
              </div>
            )}
          </div>

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={3}
            placeholder="Product Description"
            className="border rounded px-4 py-2 col-span-2"
          ></textarea>

          <label className="col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              name="handmade"
              checked={product.handmade}
              onChange={handleChange}
            /> Handmade Product
          </label>

          {/* Upload Images Section */}
          <div className="col-span-2 space-y-2">
            <label className="block font-medium mb-1">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            {product.images.length > 0 && (
              <div>
                <p className="font-medium text-gray-700">
                  Uploaded Images ({product.images.length}):
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`preview-${idx}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="col-span-2">
            <h4 className="text-lg font-semibold mb-2">Features</h4>
            {product.features.map((f, i) => (
              <div key={i} className="flex gap-2 items-center mb-2">
                <input
                  placeholder="Icon (e.g., FaLeaf)"
                  value={f.icon}
                  onChange={(e) => handleFeatureChange(i, "icon", e.target.value)}
                  className="border px-2 py-1 rounded w-1/3"
                />
                <input
                  placeholder="Feature text"
                  value={f.text}
                  onChange={(e) => handleFeatureChange(i, "text", e.target.value)}
                  className="border px-2 py-1 rounded w-2/3"
                />
                <button type="button" onClick={() => removeFeature(i)}>
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="text-blue-600 flex items-center gap-1 mt-2"
            >
              <FaPlus /> Add Feature
            </button>
          </div>

          {/* Specifications */}
          <div className="col-span-2">
            <h4 className="text-lg font-semibold mb-2">Specifications</h4>
            {product.specifications.map((spec, i) => (
              <div key={i} className="flex gap-2 items-center mb-2">
                <input
                  placeholder="Specification detail"
                  value={spec}
                  onChange={(e) => handleSpecChange(i, e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
                <button type="button" onClick={() => removeSpec(i)}>
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpec}
              className="text-blue-600 flex items-center gap-1 mt-2"
            >
              <FaPlus /> Add Specification
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 col-span-2"
          >
            {editMode ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddProduct;