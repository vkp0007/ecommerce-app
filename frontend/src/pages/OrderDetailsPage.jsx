import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const OrderDetailsPage = () => {

  const { id } = useParams();
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOrder = async () => {

      try {

        const { data } = await axios.get(`/orders/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });

        setOrder(data);

      } catch (err) {
        console.error(err);
      }

      setLoading(false);

    };

    fetchOrder();

  }, [id, user]);

  if (loading) return <p className="text-center py-20">Loading order...</p>;

  if (!order) return <p className="text-center py-20">Order not found</p>;

  return (

    <div className="max-w-6xl mx-auto p-6">

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-6">
        Order Details
      </h1>

      {/* Top Info */}
      <div className="grid md:grid-cols-3 gap-6 bg-gray-100 p-6 rounded-lg border mb-8">

        {/* Ship To */}
        <div>
          <p className="text-gray-500 font-semibold mb-1">SHIP TO</p>

          <p className="font-medium">{order.deliverToUser}</p>

          <p className="text-sm text-gray-600">
            {order.shippingAddress.address}
          </p>

          <p className="text-sm text-gray-600">
            {order.shippingAddress.city}
          </p>

          <p className="text-sm text-gray-600">
            {order.shippingAddress.postalCode}
          </p>

          <p className="text-sm text-gray-600">
            {order.shippingAddress.country}
          </p>
        </div>

        {/* Payment */}
        <div>
          <p className="text-gray-500 font-semibold mb-1">PAYMENT METHOD</p>

          <p className="font-medium">
            {order.paymentMethod}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Order placed:
          </p>

          <p>
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Order Summary */}
        <div>
          <p className="text-gray-500 font-semibold mb-1">ORDER SUMMARY</p>

          <div className="text-sm space-y-1">

            <div className="flex justify-between">
              <span>Items</span>
              <span>{order.orderItems.length}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{order.totalPrice}</span>
            </div>

          </div>

          <p className="text-xs text-gray-500 mt-3">
            Order ID: {order._id}
          </p>

        </div>

      </div>

      {/* Items Ordered */}
      <h2 className="text-xl font-semibold mb-4">
        Items Ordered
      </h2>

      <div className="space-y-4">

        {order.orderItems.map(item => (

          <div
            key={item.productId}
            className="flex gap-6 border rounded-lg p-4 bg-white"
          >

            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-contain border rounded"
            />

            <div className="flex-1">

              <p className="text-blue-600 font-semibold">
                {item.name}
              </p>

              <p className="text-sm text-gray-500">
                Category: {item.category}
              </p>

              <p className="text-sm">
                Qty: {item.qty}
              </p>

              <p className="font-semibold mt-1">
                ₹{item.price}
              </p>

            </div>

            <div className="flex flex-col gap-2">

              <button disabled
            className="border rounded-full py-2 px-4 bg-gray-100 text-gray-400 cursor-not-allowed">
                Track package
              </button>

              <button disabled
            className="border rounded-full py-2 px-4 bg-gray-100 text-gray-400 cursor-not-allowed">
                Write a review
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default OrderDetailsPage;