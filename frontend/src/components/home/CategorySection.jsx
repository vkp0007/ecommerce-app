import { useNavigate } from "react-router-dom";
import sports from "../../assets/sports.jpg";
import toys from "../../assets/toys.jpeg";
import electronics from "../../assets/electronics.webp";
import fashion from "../../assets/fashion.jpg";
import home from "../../assets/home appliances.webp";
import books from "../../assets/books.webp";

const categories = [
  { name: "Electronics", image: electronics },
  { name: "Fashion", image: fashion },
  { name: "Home Appliances", image: home },
  { name: "Books", image: books },
  { name: "Toys", image: toys },
  { name: "Sports", image: sports },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 rounded-xl shadow-md ">

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Explore Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(`/products?category=${cat.name}`)}
            className="relative cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 group"
          >

            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-44 object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">

              <h3 className="text-white font-semibold text-lg">
                {cat.name}
              </h3>

            </div>

          </div>
        ))}

      </div>

      <div className="text-center mt-10">

        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow transition"
        >
          View All Products
        </button>

      </div>

    </section>
  );
};

export default CategorySection;