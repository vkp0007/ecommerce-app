import { Link } from "react-router-dom";

const OrderItem = ({ item }) => {

  return (

    <div className="flex items-center gap-4 border rounded-lg p-4">

      <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded">

        <img
          src={item.image}
          alt={item.name}
          className="max-h-full max-w-full object-contain"
        />

      </div>

      <div className="flex-1">

        <Link
          to={`/product/${item.productId}`}
          className="font-semibold text-blue-600 hover:underline"
        >
          {item.name}
        </Link>

        <p className="text-sm text-gray-500">
          Qty: {item.qty}
        </p>

        <p className="text-sm font-medium text-gray-800">
          ₹{item.price}
        </p>

      </div>

      <Link
        to={`/product/${item.productId}`}
        className="bg-yellow-400 hover:bg-yellow-500 px-3 py-2 rounded text-sm"
      >
        Buy again
      </Link>

    </div>

  );

};

export default OrderItem;