import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 💬 Custom (Static) Reviews
  const customReviews = [
    {
      name: "Aarav Sharma",
      rating: 5,
      comment: "Fantastic product! Quality is top-notch and delivery was quick.",
    },
    {
      name: "Priya Patel",
      rating: 4,
      comment: "Good value for money. Would definitely recommend to friends!",
    },

    {
      name: "Sneha Iyer",
      rating: 3,
      comment: "Product is decent but packaging could be improved.",
    },
  ];

  // 🔹 Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // 🛒 Add to Cart or Checkout
  const addToCart = async (redirectToCheckout = false) => {
    if (!user) {
      alert("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "/cart",
        { productId: id, qty: 1 },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (redirectToCheckout) {
        navigate("/checkout");
      } else {
        alert("✅ Product added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.response?.data?.message || "Failed to add product to cart.");
    }
  };

  // ⏳ Loading state
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-600 text-lg font-semibold">
        Loading product details...
      </div>
    );

  // ❌ Product not found
  if (!product)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        Product not found or failed to load.
      </div>
    );

  // ✅ Main Product UI
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-10">
      {/* 🛍 Product Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl w-full flex flex-col md:flex-row gap-10 border border-yellow-300 hover:shadow-2xl transition-shadow duration-300">
        {/* 🖼 Product Image */}
        <div className="flex justify-center items-center bg-yellow-50 rounded-xl border border-yellow-200 p-5 shadow-inner w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-72 h-72 object-contain rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 📝 Product Info */}
        <div className="flex flex-col justify-between gap-4 w-full md:w-1/2">
          <div>
            <h2 className="text-3xl font-extrabold text-blue-700 mb-2 drop-shadow-sm">
              {product.name}
            </h2>

            <p className="text-yellow-600 text-2xl font-bold mb-1">
              ₹{product.price}
            </p>

            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              {product.category}
            </span>

            <p className="text-gray-700 mt-5 leading-relaxed">
              {product.description}
            </p>

            <p className="mt-4 text-sm font-semibold">
              Stock:{" "}
              <span
                className={`${
                  product.countInStock > 0 ? "text-green-600" : "text-red-600"
                } font-semibold`}
              >
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
          </div>

          {/* 🛍 Action Buttons */}
          <div className="flex gap-4 mt-5">
            <button
              onClick={() => addToCart(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.countInStock === 0}
            >
              🛒 Add to Cart
            </button>

            <button
              onClick={() => addToCart(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.countInStock === 0}
            >
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* 💬 Custom Reviews Section */}
      <div className="max-w-5xl w-full bg-white mt-10 p-6 rounded-2xl shadow-md border border-blue-200">
        <h3 className="text-2xl font-bold text-blue-700 mb-4">
          🗣 Customer Reviews
        </h3>

        {customReviews.length > 0 ? (
          <div className="space-y-4">
            {customReviews.map((review, index) => (
              <div
                key={index}
                className="border border-yellow-200 rounded-xl p-4 bg-yellow-50 shadow-sm"
              >
                <p className="font-semibold text-gray-800">
                  ⭐ {review.rating}/5 — {review.name}
                </p>
                <p className="text-gray-700 mt-1">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
