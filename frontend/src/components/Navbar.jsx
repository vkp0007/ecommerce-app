import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { TiThMenu, TiDelete } from 'react-icons/ti';
import axios from '../utils/axiosInstance';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch cart count dynamically
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user) {
          const res = await axios.get('/cart');
          const count = res.data?.items?.reduce((acc, item) => acc + item.qty, 0) || 0;
          setCartCount(count);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, [user]);

  return (
    <nav className="bg-blue-600 text-white flex items-center justify-between px-4 py-3 shadow-md relative z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="text-3xl font-bold hover:scale-110 transition-transform duration-200"
        >
          🛍️
        </Link>
        <h1 className="text-2xl font-semibold hidden sm:block">
          Mini E-Commerce
        </h1>
      </div>

      {/* Right: Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-6 text-lg relative">
        {/* Cart with Count */}
        <div className="relative">
          <Link to="/cart" className="hover:text-yellow-300 transition">
            🛒 Cart
          </Link>
          {cartCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-yellow-400 text-black rounded-full text-xs font-bold px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </div>

        {/* If user logged in */}
        {user ? (
          <>
            {user.isAdmin && (
              <Link
                to="/admin"
                className="hover:text-yellow-300 font-semibold transition"
              >
                ⚙️ Admin
              </Link>
            )}

            {/* Dropdown for user */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg font-semibold transition"
              >
                Hi, {user.name.split(' ')[0]} ⬇️
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40">
                  <Link
                    to="/orders"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-blue-100"
                  >
                    📦 My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-100"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold transition"
            >
              Register
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="sm:hidden text-4xl text-yellow-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <TiDelete /> : <TiThMenu />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-20 right-4 bg-blue-700 rounded-xl shadow-lg w-64 p-5 flex flex-col gap-4 sm:hidden text-lg">
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="hover:text-yellow-300 transition"
          >
            🛒 Cart ({cartCount})
          </Link>

          {user ? (
            <>
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-300 transition"
              >
                📦 My Orders
              </Link>

              {user.isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-yellow-300 transition"
                >
                  ⚙️ Admin
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-black font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate('/login');
                  setMenuOpen(false);
                }}
                className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-black font-medium transition"
              >
                Login
              </button>

              <button
                onClick={() => {
                  navigate('/register');
                  setMenuOpen(false);
                }}
                className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-black font-medium transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
