import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-gradient-to-b from-yellow-100 to-white border border-blue-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col items-center">
      {/* 🖼 Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-40 h-40 object-contain mb-4 rounded-lg"
      />

      {/* 🏷 Product Name */}
      <h3 className="text-lg font-semibold text-blue-800 text-center">
        {product.name}
      </h3>

      {/* 💰 Price */}
      <p className="text-yellow-600 font-bold text-sm mt-1">
        ₹{product.price?.toString().replace("₹", "").trim()}
      </p>

      {/* 🗂 Category */}
      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full mt-2">
        {product.category}
      </span>

      {/* 🛒 Buttons */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={() => addToCart(product._id)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Add to Cart
        </button>

        <Link
          to={`/product/${product._id}`}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm transition"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
