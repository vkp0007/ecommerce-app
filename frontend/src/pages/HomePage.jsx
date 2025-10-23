import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/products');
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (!query) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-blue-500 text-lg animate-pulse font-medium">
          Loading products...
        </p>
      </div>
    );

  if (error)
    return (
      <p className="text-red-500 text-center text-lg mt-10 font-medium">
        {error}
      </p>
    );

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <h2 className="text-3xl font-extrabold text-blue-700 text-center sm:text-left drop-shadow-sm">
          🛍️ Available Products
        </h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          className="px-4 py-2 rounded-lg border border-yellow-400 w-full sm:w-80 text-black 
          focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
        />
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border-2 border-blue-300 rounded-2xl shadow-lg p-5 flex flex-col items-center text-center 
              hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
            >
              {/* Product Image */}
              <div className="w-full h-56 overflow-hidden rounded-xl mb-4 bg-blue-100 flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <h3 className="font-semibold text-lg text-blue-800 mb-1">
                {product.name}
              </h3>
              <p className="text-yellow-600 font-medium mb-3 text-lg">
                ₹{product.price}
              </p>

              {/* View Product Button */}
              <Link
                to={`/product/${product._id}`}
                className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg 
                transition-colors duration-200 shadow-md"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-16">
          No products found matching your search.
        </p>
      )}
    </div>
  );
};

export default HomePage;
