import { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [deliverToUser, setDeliverToUser] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🛒 Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get('/cart', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCartItems(data.items || []);
      } catch (err) {
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchCart();
  }, [user]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // ✅ Place order
  const handleOrder = async () => {
    if (!deliverToUser || !shippingAddress.address) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      const orderData = {
        deliverToUser,
        orderItems: cartItems.map((item) => ({
          productId: item.product?._id || item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          qty: item.qty,
        })),
        shippingAddress,
        paymentMethod,
        totalPrice,
      };

      await axios.post('/orders', orderData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      alert('✅ Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      console.error('Order creation failed:', err.response?.data?.message);
      alert('❌ Failed to create order');
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-600 text-lg font-semibold">
        Loading checkout...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 min-h-screen rounded-xl">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
        🧾 Checkout
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Section: Address + Payment */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <h3 className="text-2xl font-semibold text-blue-700 mb-6">
            Shipping & Payment
          </h3>

          {/* Deliver To */}
          <div className="mb-4">
            <label className="block text-blue-700 font-semibold mb-2">
              Deliver To:
            </label>
            <input
              type="text"
              value={deliverToUser}
              onChange={(e) => setDeliverToUser(e.target.value)}
              placeholder="Enter receiver's name"
              className="w-full border border-yellow-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Shipping Fields */}
          <h4 className="text-lg font-semibold text-blue-700 mb-2">
            Shipping Address
          </h4>
          <div className="grid grid-cols-1 gap-3 mb-4">
            {['address', 'city', 'postalCode', 'country'].map((field) => (
              <input
                key={field}
                type="text"
                value={shippingAddress[field]}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    [field]: e.target.value,
                  })
                }
                placeholder={`Enter ${field}`}
                className="border border-yellow-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
              />
            ))}
          </div>

          {/* Payment Method */}
          <h4 className="text-lg font-semibold text-blue-700 mb-2">
            Payment Method
          </h4>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border border-yellow-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300 outline-none"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Card">Credit/Debit Card</option>
          </select>
        </div>

        {/* Right Section: Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            Order Summary
          </h3>

          <div className="max-h-80 overflow-y-auto divide-y divide-yellow-200">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center py-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border border-blue-200"
                  />
                  <div>
                    <p className="font-semibold text-blue-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.product?.category || 'General'}
                    </p>
                  </div>
                </div>
                <span className="text-gray-700">
                  ₹{item.price} × {item.qty}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-blue-800">Total:</span>
              <span className="text-yellow-600">₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleOrder}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
