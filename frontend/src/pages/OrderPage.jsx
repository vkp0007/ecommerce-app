import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/orders', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-600 text-lg font-semibold">
        Loading your orders...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        {error}
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 font-semibold">
        You have no orders yet.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-blue-50 min-h-screen rounded-lg">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        My Orders
      </h2>

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border-l-8 border-yellow-400 shadow-md hover:shadow-lg transition rounded-xl p-6"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg text-blue-700">
                Order ID: <span className="text-gray-700">{order._id}</span>
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  order.orderStatus === 'Delivered'
                    ? 'bg-green-100 text-green-700'
                    : order.orderStatus === 'Processing'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {order.orderStatus}
              </span>
            </div>

            <div className="text-gray-700 space-y-1">
              <p>
                <span className="font-semibold text-blue-700">Deliver To:</span>{' '}
                {order.deliverToUser}
              </p>
              <p>
                <span className="font-semibold text-blue-700">Address:</span>{' '}
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              <p>
                <span className="font-semibold text-blue-700">
                  Payment Method:
                </span>{' '}
                {order.paymentMethod}
              </p>
            </div>

            <div className="mt-4 border-t border-yellow-200 pt-3">
              <h4 className="font-semibold text-blue-700 mb-2">Items:</h4>
              {order.orderItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 py-2 border-b last:border-none border-gray-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border border-yellow-300"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                    <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <h4 className="text-xl font-bold text-blue-800 bg-yellow-100 px-4 py-2 rounded-lg">
                Total: ₹{order.totalPrice.toFixed(2)}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
