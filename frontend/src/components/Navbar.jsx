import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { TiThMenu, TiDelete } from 'react-icons/ti';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-500 text-white flex items-center justify-between px-4 py-4 shadow-md relative z-50">
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

      {/* Right: Desktop Links */}
      <div className="hidden sm:flex items-center gap-6 text-lg">
        <Link to="/cart" className="hover:text-yellow-300 transition">
          🛒 Cart
        </Link>

        {user ? (
          <>
            <Link to="/orders" className="hover:text-yellow-300 transition">
              📦 Orders
            </Link>

            {user.isAdmin && (
              <Link
                to="/admin"
                className="hover:text-yellow-300 font-semibold transition"
              >
                ⚙️ Admin
              </Link>
            )}

            <span className="text-yellow-200 font-medium">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-300 transition px-2 py-1 rounded-lg">
              Login
            </Link>
            <Link to="/register" className="hover:text-yellow-300 transition px-2 py-1 rounded-lg">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger Icon */}
      <button
        className="sm:hidden text-4xl text-yellow-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <TiDelete /> : <TiThMenu />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-20 right-4 bg-blue-600 rounded-xl shadow-lg w-60 p-5 flex flex-col gap-4 sm:hidden animate-slideDown text-lg">
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="hover:text-yellow-300 transition"
          >
            🛒 Cart
          </Link>

          {user ? (
            <>
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-300 transition"
              >
                📦 Orders
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
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-300 transition px-2 py-1 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-300 transition px-2 py-1 rounded-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
