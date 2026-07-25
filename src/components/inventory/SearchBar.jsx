function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="inventory-search">
      <input
        type="text"
        placeholder="Search by product name, SKU or category..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <button type="button" onClick={() => onSearchChange("")}>
        Clear
      </button>
    </div>
  );
}

export default SearchBar;