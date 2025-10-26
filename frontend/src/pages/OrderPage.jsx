import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/orders', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(data);
      setFilteredOrders(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  useEffect(() => {
    if (filter === 'All') setFilteredOrders(orders);
    else setFilteredOrders(orders.filter((o) => o.orderStatus === filter));
  }, [filter, orders]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-blue-600 text-lg font-semibold">
        <div className="animate-pulse mb-3 text-4xl">🛍️</div>
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
      <div className="flex flex-col justify-center items-center h-screen text-gray-700 font-semibold">
        You have no orders yet.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen rounded-lg">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        My Orders
      </h2>

      {/* Filter Dropdown */}
      <div className="flex justify-end mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-yellow-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none px-3 py-2 rounded-lg bg-white"
        >
          <option value="All">All</option>
          <option value="ordered">Ordered</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition border border-blue-100 p-5"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-blue-700 text-lg">
                Order #{order._id.slice(-6).toUpperCase()}
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  order.orderStatus === 'delivered'
                    ? 'bg-green-100 text-green-700'
                    : order.orderStatus === 'shipped'
                    ? 'bg-blue-100 text-blue-700'
                    : order.orderStatus === 'ordered'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
              </span>
            </div>

            {/* Shipping Info */}
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold text-blue-700">Deliver To:</span>{' '}
              {order.deliverToUser}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              <span className="font-semibold text-blue-700">Address:</span>{' '}
              {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>

            {/* Ordered Items */}
            <div className="space-y-2 mb-4">
              {order.orderItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-3 bg-blue-50 p-2 rounded-lg shadow-sm border border-yellow-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    {item.category && (
                      <p className="text-sm text-gray-600">
                        Category: {item.category}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-bold text-blue-800">
                Total: ₹{order.totalPrice.toFixed(2)}
              </h4>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
