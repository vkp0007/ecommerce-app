const SearchBar = ({ search, setSearch }) => {

  return (

    <input
      type="text"
      placeholder="🔍 Search products..."
      className="w-full md:max-w-lg border border-gray-300 rounded-full px-5 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

  );

};

export default SearchBar;