import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

import ShippingForm from "../components/checkout/ShippingForm";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/checkout/OrderSummary";
import CheckoutSkeleton from "../components/checkout/CheckoutSkeleton";

const CheckoutPage = () => {

  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);

  const [deliverToUser, setDeliverToUser] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCart = async () => {

      try {

        const { data } = await axios.get("/cart", {
          headers: { Authorization: `Bearer ${user.token}` }
        });

        setCartItems(data.items || []);

      } catch (err) {
        console.error(err);
      }

      setLoading(false);

    };

    if (user) fetchCart();

  }, [user]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const placeOrder = async () => {

    try {

      const orderData = {
        deliverToUser,
        orderItems: cartItems.map(item => ({
          productId: item.product?._id || item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          qty: item.qty,
        })),
        shippingAddress,
        paymentMethod,
        totalPrice,
      };

      await axios.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      alert("Order placed successfully");

    } catch (err) {
      console.error(err);
    }

  };

  if (loading)
    return <CheckoutSkeleton />;

  return (

    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-semibold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Left Side */}
        <div className="md:col-span-2 space-y-6">

          <ShippingForm
            deliverToUser={deliverToUser}
            setDeliverToUser={setDeliverToUser}
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
          />

          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

        </div>

        {/* Right Side */}
        <OrderSummary
          cartItems={cartItems}
          totalPrice={totalPrice}
          placeOrder={placeOrder}
        />

      </div>

    </div>

  );

};

export default CheckoutPage;