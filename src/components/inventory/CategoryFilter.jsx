const categories = [
  "All",
  "Home Decor",
  "Macrame",
  "Candles",
  "Crochet",
  "Resin Art",
];

function CategoryFilter() {
  return (
    <div className="category-filter">
      {categories.map((item) => (
        <button key={item}>
          {item}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;