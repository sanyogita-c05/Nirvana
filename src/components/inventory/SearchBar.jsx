function SearchBar() {
  return (
    <div className="inventory-search">
      <input
        type="text"
        placeholder="Search by product name, SKU or category..."
      />

      <button>Search</button>
    </div>
  );
}

export default SearchBar;