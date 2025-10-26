import { Link, useNavigate } from "react-router-dom";
import sports from "../assets/sports.jpg";
import toys from "../assets/toys.jpeg";
import electronics from "../assets/electronics.webp";
import fashion from "../assets/fashion.jpg";
import home from "../assets/home appliances.webp";
import books from "../assets/books.webp";

const categories = [
  { name: "Electronics", image: electronics },
  { name: "Fashion", image: fashion },
  { name: "Home Appliances", image: home },
  { name: "Books", image: books },
  { name: "Toys", image: toys },
  { name: "Sports", image: sports },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className=" min-h-screen flex flex-col">
      
      {/* 🌟 Hero Section */}
      <section className="bg-blue-500 text-white py-6 text-center shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Discover the Best Deals Every Day!
        </h1>
        <p className="text-lg sm:text-xl mb-8 opacity-90">
          Shop your favorite categories and save more with Mini E-Commerce.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-lg text-lg transition-transform hover:scale-105 shadow-md"
        >
          🛒 Shop Now
        </button>
      </section>

      {/* 🏷️ Categories Section */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-blue-700 text-center mb-12">
          Explore Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(`/products?category=${cat.name}`)}
              className="bg-yellow-50 shadow-md hover:shadow-xl hover:scale-105 transition-all rounded-2xl p-5 text-center cursor-pointer border-2 border-blue-200 hover:border-yellow-400"
            >
              <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden flex items-center justify-center shadow-inner">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold text-blue-800 text-lg">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ✨ Call to Action */}
      <section className="bg-yellow-100 py-8 text-center mt-10 shadow-inner">
        <h2 className="text-2xl font-bold text-blue-800 mb-3">
          Start Shopping Today!
        </h2>
        <p className="text-gray-700 mb-6">
          Discover new arrivals and best deals handpicked just for you.
        </p>
        <Link
          to="/products"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md"
        >
          Browse Products
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center py-5">
        <p className="text-sm">
          © {new Date().getFullYear()} Mini E-Commerce. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
