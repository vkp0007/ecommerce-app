const ProductDetails = ({ product, addToCart }) => {

  const descriptionPoints =
    product.description?.split(/\s*\*\s*/) || [];

  const sellerNames = [
    "TechWorld",
    "ElectroHub",
    "DigitalMart",
    "SmartDeals",
    "PrimeSeller"
  ];

  const randomSeller =
    sellerNames[Math.floor(Math.random() * sellerNames.length)];

  return (

    <div className="grid md:grid-cols-3 gap-10 bg-white p-8 rounded-xl shadow">

      {/* IMAGE */}
      <div className="flex justify-center items-center">

        <img
          src={product.image}
          alt={product.name}
          className="w-80 h-80 object-contain"
        />

      </div>

      {/* PRODUCT INFO */}
      <div className="space-y-4">

        <h1 className="text-2xl font-semibold">
          {product.name}
        </h1>

        <p className="text-2xl font-bold text-yellow-600">
          ₹{product.price}
        </p>

        {/* ABOUT */}
        <div>

          <h3 className="font-semibold text-lg mb-2">
            About this item :
          </h3>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">

            {descriptionPoints.map((point, index) => (
              <li key={index}>{point.trim()}</li>
            ))}

          </ul>

        </div>

   </div>

    {/* BUY BOX */}
<div className="border rounded-lg p-6 h-fit shadow-sm space-y-5">

  {/* Price */}
  <p className="text-2xl font-bold text-yellow-600">
    ₹{product.price}
  </p>

  {/* Stock */}
  <p className="text-green-600 font-semibold">
    {product.countInStock > 0
      ? "In Stock"
      : "Out of Stock"}
  </p>

  {/* Seller */}
  <p className="text-sm">
    Sold by{" "}
    <span className="text-blue-600 font-medium hover:underline cursor-pointer">
      {randomSeller}
    </span>
  </p>

  {/* Divider */}
  <hr />

  {/* Offers */}
  <div className="space-y-2 text-sm text-gray-700">

    <p className="flex items-center gap-2">
      💳 <span>Cashback offer available</span>
    </p>

    <p className="flex items-center gap-2">
      🔁 <span>10 days replacement</span>
    </p>

    <p className="flex items-center gap-2">
      🚚 <span>Free delivery</span>
    </p>

    <p className="flex items-center gap-2">
      🛡 <span>1 year warranty</span>
    </p>

  </div>

  {/* Divider */}
  <hr />

  {/* Buttons */}
  <button
    onClick={() => addToCart(false)}
    disabled={product.countInStock === 0}
    className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded font-semibold transition"
  >
    Add to Cart
  </button>

  <button
    onClick={() => addToCart(true)}
    disabled={product.countInStock === 0}
    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold transition"
  >
    Buy Now
  </button>

</div>

    </div>

  );

};

export default ProductDetails;