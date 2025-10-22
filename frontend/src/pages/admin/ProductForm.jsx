import { useState } from 'react';
import axios from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';

const ProductForm = ({ editProduct, setEditProduct, setShowForm }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: editProduct?.name || '',
    description: editProduct?.description || '',
    price: editProduct?.price || '',
    countInStock: editProduct?.countInStock || '',
    image: null,
  });

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
      if (formData[key]) fd.append(key, formData[key]);
    });

    try {
      if (editProduct) {
        await axios.put(`/products/${editProduct._id}`, fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          },
        });
        alert('✅ Product updated successfully');
      } else {
        await axios.post('/products', fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          },
        });
        alert('✅ Product added successfully');
      }
      setShowForm(false);
      setEditProduct(null);
    } catch {
      alert('❌ Failed to save product');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto border border-blue-200">
      <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        {editProduct ? '✏️ Edit Product' : '➕ Add New Product'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border border-blue-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border border-blue-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border border-blue-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="countInStock"
          type="number"
          value={formData.countInStock}
          onChange={handleChange}
          placeholder="Count In Stock"
          className="w-full border border-blue-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full border border-blue-200 px-3 py-2 rounded-lg bg-blue-50"
        />

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
          >
            💾 Save
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
