const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {

  return (

    <div className="bg-white p-6 border rounded-lg">

      <h2 className="text-xl font-semibold mb-4">
        Payment Method
      </h2>

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="border p-2 w-full rounded"
      >
        <option value="COD">Cash on Delivery</option>
        <option value="UPI">UPI</option>
        <option value="Card">Credit/Debit Card</option>
      </select>

    </div>

  );

};

export default PaymentMethod;