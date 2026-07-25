// const categories = [
//   "All",
//   "Home Decor",
//   "Macrame",
//   "Candles",
//   "Crochet",
//   "Resin Art",
// ];

function CategoryFilter({ products = [], activeCategory, onCategoryChange }) {
  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  return (
    <div className="category-filter">
      {categories.map((item) => (
        <button
          key={item}
          className={activeCategory === item ? "active-category" : ""}
          onClick={() => onCategoryChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;