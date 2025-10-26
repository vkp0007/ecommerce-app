import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // 🌐 Get category from query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedCategory = params.get("category");
    if (selectedCategory) setCategory(selectedCategory);
  }, [location.search]);

  // 🧩 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/products");
        setProducts(data);
        setFiltered(data);
        const uniqueCategories = ["All", ...new Set(data.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // 🔍 Filter logic
  useEffect(() => {
    let filteredProducts = products;

    if (category !== "All") {
      filteredProducts = filteredProducts.filter((p) => p.category === category);
    }

    if (search.trim() !== "") {
      filteredProducts = filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(filteredProducts);
  }, [category, search, products]);

  // 🛒 Add to Cart
  const addToCart = async (productId) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "/cart",
        { productId, qty: 1 },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("✅ Added to cart successfully!");
    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add to cart. Please try again.");
    }
  };

  return (
    <div className="min-h-screen px-6 py-7 bg-gradient-to-b from-blue-50 via-yellow-50 to-blue-100">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 drop-shadow-md">
        {category === "All" ? "All Products" : `${category} Products`}
      </h1>

      {/* 🔍 Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-yellow-50 p-4 rounded-2xl shadow-lg border border-yellow-300">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-blue-300 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-blue-300 rounded-lg px-4 py-2 text-gray-700 bg-white focus:ring-2 focus:ring-yellow-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* 🛍 Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product._id} product={product} addToCart={addToCart} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600 text-lg">
            No products found for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
