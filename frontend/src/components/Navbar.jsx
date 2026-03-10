import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { TiThMenu, TiDelete } from "react-icons/ti";
import axios from "../utils/axiosInstance";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setCartCount } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

 useEffect(() => {

  const fetchCart = async () => {

    try {

      if (!user) {
        setCartCount(0);
        return;
      }

      const res = await axios.get("/cart");

      const count =
        res.data?.items?.reduce((acc, item) => acc + item.qty, 0) || 0;

      setCartCount(count);

    } catch (error) {

      console.error("Cart fetch error:", error);

    }

  };

  fetchCart();

}, [user]);

  return (
    <nav className="bg-gray-800 text-gray-200 sticky top-0 z-50 shadow">

      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold hover:text-yellow-400"
        >
          🛍 MiniStore
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6">

          <Link to="/products" className="hover:text-yellow-400">
            Products
          </Link>

          <Link to="/cart" className="relative hover:text-yellow-400">
            🛒 Cart

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {user && (
            <Link to="/orders" className="hover:text-yellow-400">
              Orders
            </Link>
          )}

          {user?.isAdmin && (
            <Link to="/admin" className="hover:text-yellow-400">
              Admin
            </Link>
          )}

          {user ? (
            <div className="relative">

              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              >
                {user.name.split(" ")[0]}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow w-36">

                  <button
                    onClick={() => logout()}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          ) : (
            <div className="flex gap-3">

              <button
                onClick={() => navigate("/login")}
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
              >
                Register
              </button>

            </div>
          )}

        </div>

        {/* Mobile Button */}
        <button
          className="sm:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <TiDelete /> : <TiThMenu />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-900 px-6 py-4 flex flex-col gap-4">

          <Link to="/products">Products</Link>
          <Link to="/cart">Cart ({cartCount})</Link>

          {user && <Link to="/orders">Orders</Link>}

          {user?.isAdmin && <Link to="/admin">Admin</Link>}

          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/register")}>Register</button>
            </>
          )}

        </div>
      )}

    </nav>
  );
};

export default Navbar;