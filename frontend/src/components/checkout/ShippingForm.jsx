const ShippingForm = ({
  deliverToUser,
  setDeliverToUser,
  shippingAddress,
  setShippingAddress,
}) => {

  return (

    <div className="bg-white p-6 border rounded-lg">

      <h2 className="text-xl font-semibold mb-4">
        Shipping Address
      </h2>

      <input
        type="text"
        placeholder="Full Name"
        value={deliverToUser}
        onChange={(e) => setDeliverToUser(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      {["address", "city", "postalCode", "country"].map((field) => (

        <input
          key={field}
          type="text"
          placeholder={field}
          value={shippingAddress[field]}
          onChange={(e) =>
            setShippingAddress({
              ...shippingAddress,
              [field]: e.target.value,
            })
          }
          className="border p-2 w-full mb-3 rounded"
        />

      ))}

    </div>

  );

};

export default ShippingForm;