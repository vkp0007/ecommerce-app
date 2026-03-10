import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

import SortDropdown from "../components/product/SortDropdown";
import SearchBar from "../components/product/SearchBar";
import CategoryFilter from "../components/product/CategoryFilter";
import ProductGrid from "../components/product/ProductGrid";
import { useCart } from "../context/CartContext";

const ProductsPage = () => {

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");
  const { setCartCount } = useCart();

  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const selectedCategory = params.get("category");

    if (selectedCategory) setCategory(selectedCategory);

  }, [location.search]);

  useEffect(() => {

    const fetchProducts = async () => {

      setLoading(true);

      const res = await axios.get("/products");

      const productList = Array.isArray(res.data) ? res.data : [];

      setProducts(productList);
      setFiltered(productList);

      const uniqueCategories = [
        "All",
        ...new Set(productList.map((p) => p.category)),
      ];

      setCategories(uniqueCategories);

      setLoading(false);

    };

    fetchProducts();

  }, []);

  useEffect(() => {

    let result = products;

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "priceLow") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "priceHigh") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    setFiltered(result);

  }, [category, search, sort, products]);

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
    alert("Failed to add product");

  }

};

  return (

    <div className="bg-gray-50 min-h-screen py-10 px-4">

      <div className="max-w-7xl mx-auto">

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">

          <div className="flex flex-col md:flex-row justify-between gap-4">

            <SearchBar search={search} setSearch={setSearch} />

            <SortDropdown sort={sort} setSort={setSort} />

          </div>

          <CategoryFilter
            categories={categories}
            category={category}
            setCategory={setCategory}
          />

        </div>

        {/* Products */}
        <ProductGrid
          loading={loading}
          products={filtered}
          addToCart={addToCart}
        />

      </div>

    </div>

  );

};

export default ProductsPage;