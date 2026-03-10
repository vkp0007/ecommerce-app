const OrdersFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-end mb-6">

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border px-3 py-2 rounded-lg"
      >
        <option value="All">All Orders</option>
        <option value="ordered">Ordered</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>

    </div>
  );
};

export default OrdersFilter;