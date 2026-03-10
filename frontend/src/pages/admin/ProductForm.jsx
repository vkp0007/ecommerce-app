import { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const ProductForm = ({ editProduct, setEditProduct, setShowForm }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: editProduct?.name || "",
    description: editProduct?.description
      ? editProduct.description.split("*").join("\n")
      : "",
    category: editProduct?.category || "",
    price: editProduct?.price || "",
    countInStock: editProduct?.countInStock || "",
    image: null,
  });

  const categories = [
    "Electronics",
    "Fashion",
    "Home Appliances",
    "Books",
    "Toys",
    "Sports",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) return;

      if (key === "description") {
        const formatted = formData.description
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .join(" * ");

        fd.append("description", formatted);
      } else {
        fd.append(key, formData[key]);
      }
    });

    try {
      if (editProduct) {
        await axios.put(`/products/${editProduct._id}`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        });

        alert("Product updated successfully");
      } else {
        await axios.post("/products", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        });

        alert("Product added successfully");
      }

      setShowForm(false);
      setEditProduct(null);
    } catch {
      alert("Failed to save product");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-lg mx-auto border my-8">
      <h3 className="text-xl font-bold mb-6 text-center">
        {editProduct ? "Edit Product" : "Add Product"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          placeholder="Enter features (one per line)"
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        <p className="text-xs text-gray-500">
          Each line will appear as bullet points on product page.
        </p>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-3">

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border px-3 py-2 rounded-lg"
            required
          />

          <input
            type="number"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleChange}
            placeholder="Stock"
            className="border px-3 py-2 rounded-lg"
            required
          />

        </div>

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          accept="image/*"
        />

        <div className="flex justify-between pt-4">

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="bg-gray-400 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  );
};

export default ProductForm;