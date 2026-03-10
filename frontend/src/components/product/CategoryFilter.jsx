const CategoryFilter = ({ categories, category, setCategory }) => {

  return (

    <div className="flex flex-wrap gap-3 mt-4">

      {categories.map((cat) => (

        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-2 rounded-full border text-sm transition shadow-sm
          ${
            category === cat
              ? "bg-blue-600 text-white shadow-md scale-[1.02]"
              : "bg-white hover:bg-blue-50 hover:shadow"
          }`}
        >
          {cat}
        </button>

      ))}

    </div>

  );

};

export default CategoryFilter;