import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  // 🧩 Fetch cart items
  const fetchCart = async () => {
    try {
      const { data } = await axios.get("/cart", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCartItems(data.items || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [user]);

  // 🧩 Update quantity
  const updateQty = async (productId, qty) => {
    setUpdating(true);
    try {
      await axios.put(
        `/cart/${productId}`,
        { qty: Math.max(1, qty) },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to update cart");
    } finally {
      setUpdating(false);
    }
  };

  // 🧩 Remove item
  const removeItem = async (productId) => {
    setUpdating(true);
    try {
      await axios.delete(`/cart/${productId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchCart();
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to remove item");
    } finally {
      setUpdating(false);
    }
  };

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0)
    : 0;

  if (loading)
    return (
      <p className="text-center text-blue-600 mt-10 font-semibold text-lg">
        Loading your cart...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-10 font-semibold text-lg">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen flex justify-center items-start  px-4">
      <div className="w-full max-w-5xl p-6 rounded-xl shadow-lg bg-white">
        <h2 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">
          🛒 My Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <img
              src="/images/empty-cart.svg"
              alt="Empty Cart"
              className="w-40 mx-auto mb-4 opacity-80"
            />
            <p className="text-gray-700 text-lg mb-4">
              Your cart is empty. Start shopping now!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              🛍 Shop Now
            </button>
          </div>
        ) : (
          <>
            {/* 🧩 Cart Items List */}
            <div className="divide-y divide-blue-200">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5"
                >
                  {/* Product Image */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl border border-blue-200 shadow-sm"
                    />
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold text-blue-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">
                        Category:{" "}
                        <span className="font-medium text-blue-600">
                          {item.category || "General"}
                        </span>
                      </p>
                      <p className="text-yellow-600 font-semibold text-lg">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={`qty-${item.productId}`}
                        className="text-gray-700 font-medium"
                      >
                        Qty:
                      </label>
                      <input
                        id={`qty-${item.productId}`}
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) =>
                          updateQty(item.productId, Number(e.target.value))
                        }
                        disabled={updating}
                        className="w-16 border border-blue-300 rounded-lg px-2 py-1 text-center font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      disabled={updating}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 🧾 Total & Checkout Section */}
            <div className="mt-8 border-t border-blue-200 pt-6 flex flex-col sm:flex-row justify-between items-center">
              <h3 className="text-xl font-bold text-blue-800 mb-4 sm:mb-0">
                Total:{" "}
                <span className="text-yellow-600">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </h3>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/products")}
                  className="text-blue-700 font-semibold hover:underline"
                >
                  ← Continue Shopping
                </button>
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
