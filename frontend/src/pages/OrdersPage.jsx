import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

import OrdersFilter from "../components/order/OrdersFilter";
import OrdersList from "../components/order/OrdersList";
import OrdersSkeleton from "../components/order/OrderSkeleton";

const OrdersPage = () => {

  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {

    try {

      const { data } = await axios.get("/orders", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setOrders(data);
      setFilteredOrders(data);

    } catch (err) {

      setError(err.response?.data?.message || "Failed to fetch orders");

    }

    setLoading(false);

  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  useEffect(() => {

    if (filter === "All") {

      setFilteredOrders(orders);

    } else {

      setFilteredOrders(
        orders.filter((o) => o.orderStatus === filter)
      );

    }

  }, [filter, orders]);

  if (loading)
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <OrdersSkeleton />
      </div>
    );

  if (error)
    return (
      <p className="text-center py-20 text-red-500">
        {error}
      </p>
    );

  return (

    <div className="max-w-6xl mx-auto px-4 py-10">

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">

        <h1 className="text-3xl font-semibold">
          Your Orders
        </h1>

        <OrdersFilter
          filter={filter}
          setFilter={setFilter}
        />

      </div>

      <OrdersList orders={filteredOrders} />

    </div>

  );

};

export default OrdersPage;