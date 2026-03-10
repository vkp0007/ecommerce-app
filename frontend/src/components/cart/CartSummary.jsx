import { useNavigate } from "react-router-dom";

const CartSummary = ({ totalPrice, itemsCount }) => {

  const navigate = useNavigate();

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <h3 className="text-lg mb-4">

        Subtotal ({itemsCount} items)

        <span className="font-bold ml-2">
          ₹{totalPrice.toFixed(2)}
        </span>

      </h3>

      <button
        onClick={() => navigate("/checkout")}
        className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded font-semibold shadow"
      >
        Proceed to Checkout
      </button>

    </div>

  );

};

export default CartSummary;