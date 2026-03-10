const SortDropdown = ({ sort, setSort }) => {

  return (

    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm hover:border-blue-400"
    >
      <option value="default">Sort By</option>
      <option value="priceLow">Price: Low → High</option>
      <option value="priceHigh">Price: High → Low</option>
      <option value="name">Name: A → Z</option>
    </select>

  );

};

export default SortDropdown;