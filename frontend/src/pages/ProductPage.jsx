import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        '/cart',
        { productId: id, qty },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      navigate('/cart');
    } catch (err) {
      console.error(err.response?.data?.message || 'Error adding to cart');
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-blue-500 animate-pulse text-lg">Loading product...</p>
      </div>
    );

  if (error)
    return <p className="text-red-500 text-center mt-8 text-lg font-medium">{error}</p>;

  if (!product) return null;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6 bg-blue-50 rounded-xl shadow-md">
      {/* Product Image */}
      <div className="w-full md:w-1/2 flex justify-center bg-white p-4 rounded-lg border border-blue-200">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-[400px] object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-700 mb-3">{product.name}</h2>
        <p className="text-2xl font-semibold text-yellow-500 mb-2">₹{product.price}</p>
        <p className="text-gray-700 mb-6">{product.description}</p>

        <div className="flex items-center gap-3 mb-6">
          <label htmlFor="qty" className="font-medium text-gray-800">
            Quantity:
          </label>
          <input
            type="number"
            id="qty"
            min="1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-20 border border-blue-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={addToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold transition-transform hover:scale-105"
          >
            🛒 Add to Cart
          </button>

          <button
            onClick={() => navigate('/checkout')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold transition-transform hover:scale-105"
          >
            ⚡ Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
