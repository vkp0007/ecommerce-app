import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  return (

    <div className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition flex flex-col overflow-hidden group">

      {/* Image */}
      <div className="h-48 bg-gray-100 flex items-center justify-center p-4 relative">

     <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full object-contain group-hover:scale-105 transition"
        />

      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">

        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 text-center">
          {product.name}
        </h3>

        <div className="flex justify-center items-center gap-2 mt-2">

          <span className="text-lg font-bold text-blue-700">
            ₹{product.price}
          </span>

          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}

        </div>

        <div className="flex justify-center mt-2">

          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {product.category}
          </span>

        </div>

        <div className="flex gap-2 mt-auto pt-4">

          <button
            onClick={() => addToCart(product._id)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm shadow-sm transition"
          >
            Add to Cart
          </button>

          <Link
            to={`/product/${product._id}`}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-center py-2 rounded-lg text-sm font-medium"
          >
            View
          </Link>

        </div>

      </div>

    </div>

  );

};

export default ProductCard;