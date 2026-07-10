function SearchSortBar({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy
}) {
  return (
    <div className="search-sort-bar">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search bags, resin, decor, jewelry..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="sort-box">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>
    </div>
  );
}

export default SearchSortBar;