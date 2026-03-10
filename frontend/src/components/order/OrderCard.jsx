import { Link } from "react-router-dom";
import OrderItem from "./OrderItem";

const OrderCard = ({ order }) => {

  const getStatusStyle = () => {

    switch (order.orderStatus) {

      case "delivered":
        return "bg-green-100 text-green-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "ordered":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";

    }

  };

  return (

    <div className="border rounded-xl bg-white shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="bg-gray-50 px-6 py-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">

        <div>
          <p className="text-gray-500">Order placed</p>
          <p className="font-medium">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Total</p>
          <p className="font-medium">₹{order.totalPrice}</p>
        </div>

        <div>
          <p className="text-gray-500">Ship to</p>
          <p className="font-medium">{order.deliverToUser}</p>
        </div>

        <div>
          <p className="text-gray-500">Order #</p>
          <p className="font-medium">{order._id.slice(-8)}</p>
        </div>

        <div className="flex items-center justify-end">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle()}`}
          >
            {order.orderStatus}
          </span>
        </div>

      </div>

      {/* BODY */}
      <div className="p-6 flex flex-col md:flex-row gap-6">

        <div className="flex-1 space-y-4">

          {order.orderItems.map((item) => (
            <OrderItem key={item.productId} item={item} />
          ))}

        </div>

        <div className="flex flex-col gap-3 min-w-[180px]">

          <Link
            to={`/orders/${order._id}`}
            className="border rounded-full py-2 text-center hover:bg-gray-100"
          >
            View order
          </Link>

          <button
            disabled
            className="border rounded-full py-2 bg-gray-100 text-gray-400 cursor-not-allowed"
          >
            Track package
          </button>

        </div>

      </div>

    </div>

  );

};

export default OrderCard;