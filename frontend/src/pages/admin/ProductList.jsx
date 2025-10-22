import { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';

const ProductList = ({ setEditProduct, setShowForm }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/products');
      setProducts(data);
    } catch {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch {
      alert('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return <p className="text-blue-500 text-center font-medium">Loading products...</p>;
  if (error)
    return <p className="text-red-500 text-center font-medium">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-blue-200 rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            <th className="border px-4 py-2 text-blue-800">Image</th>
            <th className="border px-4 py-2 text-blue-800">Name</th>
            <th className="border px-4 py-2 text-blue-800">Price</th>
            <th className="border px-4 py-2 text-blue-800">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="hover:bg-blue-50 transition-all duration-200">
              <td className="border px-3 py-2 text-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded-lg mx-auto"
                />
              </td>
              <td className="border px-4 py-2 text-gray-800 font-medium text-center">
                {p.name}
              </td>
              <td className="border px-4 py-2 text-yellow-600 font-semibold text-center">
                ₹{p.price}
              </td>
              <td className="border px-4 py-2 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setEditProduct(p);
                    setShowForm(true);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg shadow-sm transition-all"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm transition-all"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
