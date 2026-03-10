import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import CartItemList from "../components/cart/CartItemList";
import CartSummary from "../components/cart/CartSummary";
import CartSkeleton from "../components/cart/CartSkeleton";
import { useCart } from "../context/CartContext";
const CartPage = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
const { setCartCount } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchCart = async () => {

    try {

      const { data } = await axios.get("/cart");
      setCartItems(data.items || []);

    } catch (err) {

      console.error(err);

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

 const updateQty = async (productId, qty) => {

  setUpdating(true);

  const item = cartItems.find(i => i.productId === productId);

  const diff = qty - item.qty;

  await axios.put(`/cart/${productId}`, {
    qty: Math.max(1, qty),
  });

  setCartCount(prev => prev + diff);

  fetchCart();

  setUpdating(false);
};

const removeItem = async (productId) => {

  if (!window.confirm("Remove this item from cart?")) return;

  setUpdating(true);

  try {

    const removedItem = cartItems.find(
      (item) => item.productId === productId
    );

    await axios.delete(`/cart/${productId}`);

    setCartItems((prev) =>
      prev.filter((item) => item.productId !== productId)
    );

    // update cart count instantly
    setCartCount((prev) => prev - removedItem.qty);

    alert("Item removed from cart");

  } catch (error) {

    console.error(error);

  }

  setUpdating(false);

};

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        {[1, 2, 3].map((i) => (
          <CartSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-semibold mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        <div className="lg:col-span-2">

          <CartItemList
            items={cartItems}
            updateQty={updateQty}
            removeItem={removeItem}
            updating={updating}
          />

        </div>

        {cartItems.length > 0 && (

          <div className="sticky top-24 h-fit">

            <CartSummary
              totalPrice={totalPrice}
              itemsCount={cartItems.length}
            />

          </div>

        )}

      </div>

    </div>

  );

};

export default CartPage;