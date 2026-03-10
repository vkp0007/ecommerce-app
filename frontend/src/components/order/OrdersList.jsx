import { useNavigate } from "react-router-dom";
import OrderCard from "./OrderCard";

const OrdersList = ({ orders }) => {

  const navigate = useNavigate();

  if (!orders.length)

    return (

      <div className="text-center py-24">

        <p className="text-xl text-gray-700 mb-3">
          You haven't placed any orders yet
        </p>

        <p className="text-gray-500 mb-6">
          Start shopping to see your orders here.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded font-medium"
        >
          Browse Products
        </button>

      </div>

    );

  return (

    <div className="space-y-6">

      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}

    </div>

  );

};

export default OrdersList;