import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import ProductCard from "../product/ProductCard";
import ProductSkeleton from "../product/ProductSkeleton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const NewArrivals = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { setCartCount } = useCart();

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await axios.get("/products?sort=newest");

        const productList = Array.isArray(res.data)
          ? res.data.slice(0, 8)
          : [];

        setProducts(productList);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);

  const addToCart = async (productId) => {

    if (!user) {
      navigate("/login");
      return;
    }

    try {

      await axios.post(
        "/cart",
        { productId, qty: 1 },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setCartCount(prev => prev + 1);

      alert("Product added to cart");

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <section id="new-arrivals" className="max-w-7xl mx-auto px-4 py-5 rounded-xl shadow-md">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold text-gray-800">
          New Arrivals
        </h2>

        <button
          onClick={() => navigate("/products")}
          className="text-blue-600 hover:underline font-medium"
        >
          View All
        </button>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
          />
        ))}

        {loading &&
          Array(8)
            .fill(null)
            .map((_, i) => <ProductSkeleton key={i} />)}

      </div>

    </section>

  );

};

export default NewArrivals;