import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const { data } = await axios.get('/cart', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCartItems(data.items || []);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cart');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user]);

  const updateQty = async (productId, qty) => {
    setUpdating(true);
    try {
      await axios.put(
        `/cart/${productId}`,
        { qty: Math.max(1, qty) },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error(err.response?.data?.message || 'Failed to update cart');
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (productId) => {
    setUpdating(true);
    try {
      await axios.delete(`/cart/${productId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchCart();
    } catch (err) {
      console.error(err.response?.data?.message || 'Failed to remove item');
    } finally {
      setUpdating(false);
    }
  };

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0)
    : 0;

  if (loading) return <p className="text-center text-blue-600 mt-10">Loading your cart...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-blue-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">🛒 My Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-700">Your cart is empty.</p>
      ) : (
        <>
          <div className="divide-y divide-blue-200">
            {cartItems.map((item) => {
              const productId = item.product?._id || item.productId;
              const name = item.product?.name || item.name;
              const price = item.product?.price || item.price;
              const image = item.product?.image || item.image;

              return (
                <div
                  key={productId}
                  className="flex flex-col sm:flex-row items-center gap-4 py-4"
                >
                  <img
                    src={image}
                    alt={name}
                    className="w-24 h-24 object-cover rounded-lg border border-blue-200"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-blue-800">{name}</h3>
                    <p className="text-yellow-600 font-medium">₹{price}</p>
                    <div className="flex justify-center sm:justify-start items-center gap-2 mt-2">
                      <label htmlFor="qty" className="text-gray-700">
                        Qty:
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) =>
                          updateQty(productId, Number(e.target.value))
                        }
                        disabled={updating}
                        className="w-16 border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(productId)}
                    disabled={updating}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-right border-t pt-4">
            <h3 className="text-xl font-bold text-blue-800">
              Total: <span className="text-yellow-600">₹{totalPrice.toFixed(2)}</span>
            </h3>
            <button
              onClick={() => navigate('/checkout')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
 