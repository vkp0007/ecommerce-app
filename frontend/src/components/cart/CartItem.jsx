import { Link } from "react-router-dom";

const CartItem = ({ item, updateQty, removeItem, updating }) => {

  const subtotal = item.price * item.qty;

  return (

    <div className="flex justify-between items-center border-b py-6 gap-6">

      <div className="flex gap-6 flex-1">

        {/* Product Image */}
        <div className="w-28 h-28 flex items-center justify-center bg-gray-100 rounded-lg p-2">

          <img
            src={item.image}
            alt={item.name}
            className="max-w-full max-h-full object-contain"
          />

        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">

          <Link
            to={`/product/${item.productId}`}
            className="text-lg font-medium hover:text-blue-600 line-clamp-2"
          >
            {item.name}
          </Link>

          <p className="text-green-600 text-sm font-medium">
            In Stock
          </p>

          <p className="text-sm text-gray-500">
            FREE delivery
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 mt-2">

            <button
              onClick={() => updateQty(item.productId, item.qty - 1)}
              disabled={updating || item.qty <= 1}
              className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
            >
              −
            </button>

            <span className="font-medium w-6 text-center">
              {item.qty}
            </span>

            <button
              onClick={() => updateQty(item.productId, item.qty + 1)}
              disabled={updating}
              className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
            >
              +
            </button>

            <button
              onClick={() => removeItem(item.productId)}
              className="text-blue-600 text-sm ml-4 hover:underline"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

      {/* Price */}
      <div className="text-lg font-semibold whitespace-nowrap">
        ₹{subtotal.toFixed(2)}
      </div>

    </div>

  );

};

export default CartItem;