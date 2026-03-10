import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const CartItemList = ({ items, updateQty, removeItem, updating }) => {

  const navigate = useNavigate();

  if (items.length === 0) {

    return (

      <div className="bg-white rounded-xl border text-center py-16">

        <p className="text-xl text-gray-600 mb-6">
          Your cart is empty
        </p>

        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </button>

      </div>

    );

  }

  return (

    <div className="bg-white border rounded-xl px-6">

      {items.map((item) => (

        <CartItem
          key={item.productId}
          item={item}
          updateQty={updateQty}
          removeItem={removeItem}
          updating={updating}
        />

      ))}

    </div>

  );

};

export default CartItemList;