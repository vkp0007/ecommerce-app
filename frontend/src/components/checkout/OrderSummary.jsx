const OrderSummary = ({ cartItems, totalPrice, placeOrder }) => {

  return (

    <div className="bg-white p-6 border rounded-lg h-fit">

      <h2 className="text-xl font-semibold mb-4">
        Order Summary
      </h2>

      <div className="space-y-3 mb-4">

        {cartItems.map(item => (

          <div key={item.productId} className="flex gap-3">

            <img
              src={item.image}
              className="w-14 h-14 object-contain border rounded"
            />

            <div className="text-sm">
              <p>{item.name}</p>
              <p className="text-gray-500">
                ₹{item.price} × {item.qty}
              </p>
            </div>

          </div>

        ))}

      </div>

      <div className="flex justify-between font-semibold mb-4">
        <span>Total</span>
        <span>₹{totalPrice}</span>
      </div>

      <button
        onClick={placeOrder}
        className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded font-semibold"
      >
        Place Order
      </button>

    </div>

  );

};

export default OrderSummary;