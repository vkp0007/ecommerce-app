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

  // Fetch user's cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get('/cart', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCartItems(data.items || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setLoading(false);
      }
    };
    if (user) fetchCart();
  }, [user]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Create order
  const handleOrder = async () => {
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
    <div className="max-w-4xl mx-auto bg-blue-50 min-h-screen py-8 px-6 rounded-lg shadow-inner">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Checkout
      </h2>

      <div className="bg-white shadow-lg rounded-xl p-6 border-l-8 border-yellow-400">
        {/* Deliver To */}
        <div className="mb-6">
          <label className="block text-blue-700 font-semibold mb-2">
            Deliver To:
          </label>
          <input
            type="text"
            value={deliverToUser}
            onChange={(e) => setDeliverToUser(e.target.value)}
            className="w-full border border-yellow-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none px-3 py-2 rounded-lg"
            placeholder="Person collecting order"
          />
        </div>

        {/* Shipping Address */}
        <h3 className="text-xl font-semibold text-blue-700 mb-3">
          Shipping Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {['address', 'city', 'postalCode', 'country'].map((field) => (
            <input
              key={field}
              type="text"
              value={shippingAddress[field]}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, [field]: e.target.value })
              }
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="border border-yellow-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none px-3 py-2 rounded-lg"
            />
          ))}
        </div>

        {/* Payment Method */}
        <h3 className="text-xl font-semibold text-blue-700 mb-3">
          Payment Method
        </h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border border-yellow-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none px-3 py-2 rounded-lg mb-6 w-full md:w-1/2"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Card">Credit/Debit Card</option>
        </select>

        {/* Order Summary */}
        <h3 className="text-2xl font-semibold text-blue-700 mt-4 mb-3">
          Order Summary
        </h3>
        <div className="bg-yellow-50 rounded-lg p-4 shadow-inner">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center border-b border-yellow-200 py-2 last:border-none"
            >
              <span className="font-medium text-gray-800">{item.name}</span>
              <span className="text-gray-700">
                ₹{item.price} × {item.qty}
              </span>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <h3 className="text-lg font-bold text-blue-800">Total:</h3>
            <h3 className="text-lg font-bold text-yellow-600">
              ₹{totalPrice.toFixed(2)}
            </h3>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleOrder}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
