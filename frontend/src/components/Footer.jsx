import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-10">

      {/* Footer Top */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
            🛍 MiniStore
          </h2>

          <p className="text-sm mb-4">
            Discover amazing products across electronics, fashion, books,
            toys, sports and home appliances.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-white transition">
              <FaFacebookF />
            </a>

            <a href="#" className="hover:text-white transition">
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-white transition">
              <FaTwitter />
            </a>
          </div>
        </div>


        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">

            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products" className="hover:text-white transition">
                Products
              </Link>
            </li>

            <li>
              <Link to="/cart" className="hover:text-white transition">
                Cart
              </Link>
            </li>

            <li>
              <Link to="/orders" className="hover:text-white transition">
                Orders
              </Link>
            </li>

          </ul>
        </div>


        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Service
          </h3>

          <ul className="space-y-2 text-sm">

            <li>
              <Link to="#" className="hover:text-white transition">
                Help Center
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-white transition">
                Returns
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-white transition">
                Shipping Info
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-white transition">
                FAQs
              </Link>
            </li>

          </ul>
        </div>


        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>

          <p className="text-sm mb-2">
            Email: support@ministore.com
          </p>

          <p className="text-sm mb-2">
            Phone: +91 9999999999
          </p>

          <p className="text-sm">
            Location: India
          </p>
        </div>

      </div>


      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-3">

          <p>
            © {new Date().getFullYear()} MiniStore. All rights reserved.
          </p>

          <div className="flex gap-4">
            <Link to="#" className="hover:text-white transition">
              Privacy Policy
            </Link>

            <Link to="#" className="hover:text-white transition">
              Terms
            </Link>

            <Link to="#" className="hover:text-white transition">
              Refund Policy
            </Link>
          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;